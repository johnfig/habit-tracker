import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'
import { startOfDay } from 'date-fns'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const habit = await prisma.habit.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!habit) {
      return new NextResponse('Habit not found', { status: 404 })
    }

    // Use startOfDay to normalize the date
    const today = startOfDay(new Date())

    const log = await prisma.log.upsert({
      where: {
        habitId_date: {
          habitId: params.id,
          date: today,
        },
      },
      create: {
        habitId: params.id,
        date: today,
        completed: true,
      },
      update: {
        completed: true,
      },
    })

    return NextResponse.json(log)
  } catch (error) {
    console.error('Error logging habit:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 