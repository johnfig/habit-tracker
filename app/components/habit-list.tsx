'use client'

import { useQuery } from '@tanstack/react-query'
import { HabitCard } from './habit-card'
import { Skeleton } from './ui/skeleton'

export function HabitList() {
  const { data: habits, isLoading } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const res = await fetch('/api/habits')
      return res.json()
    },
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[200px]" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {habits?.map((habit: any) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
} 