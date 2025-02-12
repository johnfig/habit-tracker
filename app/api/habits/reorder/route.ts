import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { habits } = await request.json()

    // Update each habit's display order in a transaction
    await prisma.$transaction(
      habits.map(({ id, displayOrder }: { id: string; displayOrder: number }) =>
        prisma.habit.update({
          where: {
            id,
            userId: session.user.id, // Ensure user owns the habit
          },
          data: { displayOrder },
        })
      )
    )

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Error reordering habits:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 