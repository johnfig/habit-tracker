import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const json = await request.json()
  const { completed, date } = json

  // Verify habit belongs to user
  const habit = await prisma.habit.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  })

  if (!habit) {
    return new NextResponse('Not found', { status: 404 })
  }

  // Create or update log
  const log = await prisma.log.upsert({
    where: {
      habitId_date: {
        habitId: params.id,
        date: new Date(date),
      },
    },
    create: {
      habitId: params.id,
      date: new Date(date),
      completed,
    },
    update: {
      completed,
    },
  })

  // Update streak
  const logs = await prisma.log.findMany({
    where: {
      habitId: params.id,
      completed: true,
    },
    orderBy: {
      date: 'desc',
    },
  })

  let streak = 0
  for (const log of logs) {
    if (streak === 0) {
      streak = 1
    } else {
      const prevDate = logs[streak - 1].date
      const diffDays = Math.floor(
        (prevDate.getTime() - log.date.getTime()) / (1000 * 60 * 60 * 24)
      )
      if (diffDays === 1) {
        streak++
      } else {
        break
      }
    }
  }

  await prisma.habit.update({
    where: { id: params.id },
    data: { streak },
  })

  return NextResponse.json(log)
} 