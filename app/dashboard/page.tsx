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
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 pointer-events-none" />
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      
      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-primary/10 shadow-2xl shadow-primary/5">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500">
              Dashboard
            </h1>
            <p className="text-muted-foreground/80 text-base sm:text-lg">
              Track and manage your daily habits
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-300" />
            <div className="relative">
              <CreateHabitButton className="text-xl h-16 px-10 font-semibold" />
            </div>
          </div>
        </div>

        {/* Habits Grid Section */}
        <div className="bg-background/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-primary/10 shadow-2xl shadow-primary/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Your Habits
            </h2>
            <div className="hidden sm:block h-px flex-1 mx-6 bg-gradient-to-r from-primary/20 via-purple-500/20 to-transparent" />
          </div>
          <HabitList />
        </div>
        
        {/* Analytics Section */}
        <div className="bg-background/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-primary/10 shadow-2xl shadow-primary/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Habit Analytics
            </h2>
            <div className="hidden sm:block h-px flex-1 mx-6 bg-gradient-to-r from-primary/20 via-purple-500/20 to-transparent" />
          </div>
          <AnalyticsDashboard habits={habits} />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  )
} 