import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    include: {
      logs: {
        orderBy: { date: 'desc' },
        take: 7,
      },
    },
    orderBy: [
      { displayOrder: 'asc' },
      { createdAt: 'desc' },
    ],
  })

  return NextResponse.json(habits)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { title, frequency } = await req.json()
    
    const highestOrder = await prisma.habit.findFirst({
      where: { userId: session.user.id },
      orderBy: { displayOrder: 'desc' },
      select: { displayOrder: true },
    })

    const habit = await prisma.habit.create({
      data: {
        title,
        frequency,
        userId: session.user.id,
        displayOrder: (highestOrder?.displayOrder ?? -1) + 1,
      },
    })

    return NextResponse.json(habit)
  } catch (error) {
    console.error('Error creating habit:', error)
    return new NextResponse('Error creating habit', { status: 500 })
  }
} 