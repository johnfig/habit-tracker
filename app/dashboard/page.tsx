import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../lib/auth'
import { HabitList } from '../components/habit-list'
import { CreateHabitButton } from '../components/create-habit-button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Habits</h1>
        <CreateHabitButton />
      </div>
      <HabitList />
    </div>
  )
} 