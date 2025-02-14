import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export interface ReorderRequestBody {
  habitId: string
  newOrder: number
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { habitId, newOrder }: ReorderRequestBody = await request.json()

    // Validate input
    if (typeof newOrder !== 'number' || !habitId) {
      return new NextResponse('Invalid input', { status: 400 })
    }

    // Get current habit
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
        userId: session.user.id,
      },
    })

    if (!habit) {
      return new NextResponse('Habit not found', { status: 404 })
    }

    // Update the habit's display order
    await prisma.habit.update({
      where: {
        id: habitId,
      },
      data: {
        displayOrder: newOrder,
      },
    })

    return new NextResponse('Success', { status: 200 })
  } catch (error) {
    console.error('Error reordering habit:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 