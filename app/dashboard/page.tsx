import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../lib/auth'
import { HabitList } from '../components/habit-list'
import { CreateHabitButton } from '../components/create-habit-button'
import { AnalyticsDashboard } from '../components/analytics-dashboard'
import { prisma } from '../lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    include: {
      logs: {
        orderBy: { date: 'desc' },
        take: 7,
      },
    },
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your daily habits
          </p>
        </div>
        <CreateHabitButton />
      </div>
      
      <AnalyticsDashboard habits={habits} />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Habits</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <HabitList />
        </div>
      </div>
    </div>
  )
} 