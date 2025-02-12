import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { title, frequency, description } = await req.json()
    const habit = await prisma.habit.update({
      where: {
        id: params.id,
        userId: session.user.id as string,
      },
      data: {
        title,
        frequency,
        description,
      },
    })

    return NextResponse.json(habit)
  } catch (error) {
    console.error('Error updating habit:', error)
    return new NextResponse('Error updating habit', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Verify the habit belongs to the user
    const habit = await prisma.habit.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!habit) {
      return new NextResponse('Habit not found', { status: 404 })
    }

    // Delete the habit and all associated logs
    await prisma.habit.delete({
      where: { id: params.id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting habit:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 