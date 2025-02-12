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
    <div className="relative min-h-screen overflow-hidden bg-background/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 animate-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      
      {/* Content */}
      <div className="relative px-4 py-10 md:px-6 md:py-16 max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-background/80 backdrop-blur-xl rounded-2xl p-8 border border-primary/20 shadow-2xl shadow-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10 animate-pulse-slow" />
          <div className="space-y-2 relative">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient pb-1">
              Dashboard
            </h1>
            <p className="text-muted-foreground/80 text-lg">
              Track and manage your daily habits
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition-all duration-300" />
            <div className="relative">
              <CreateHabitButton />
            </div>
          </div>
        </div>
        
        {/* Analytics Section */}
        <div className="bg-background/80 backdrop-blur-xl rounded-2xl p-8 border border-primary/20 shadow-2xl shadow-primary/10 transform hover:scale-[1.01] transition-all duration-300">
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-primary/5 to-purple-500/5 blur-3xl" />
            <div className="relative z-10">
              <AnalyticsDashboard habits={habits} />
            </div>
          </div>
        </div>
        
        {/* Habits Grid Section */}
        <div className="bg-background/80 backdrop-blur-xl rounded-2xl p-8 border border-primary/20 shadow-2xl shadow-primary/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Your Habits
            </h2>
            <div className="h-px flex-1 mx-6 bg-gradient-to-r from-primary/20 via-purple-500/20 to-transparent" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <HabitList />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  )
} 