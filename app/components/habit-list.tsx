'use client'

import { useEffect, useState } from 'react'
import { HabitCard } from './habit-card'

type Habit = {
  id: string
  title: string
  frequency: number
  streak: number
  logs: {
    id: string
    date: string
    completed: boolean
  }[]
}

export function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchHabits() {
      try {
        const response = await fetch('/api/habits')
        if (!response.ok) throw new Error('Failed to fetch habits')
        const data = await response.json()
        setHabits(data)
      } catch (error) {
        console.error('Error fetching habits:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHabits()
  }, [])

  if (isLoading) {
    return <div>Loading habits...</div>
  }

  if (habits.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="mt-2 text-sm font-semibold">No habits yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by creating a new habit
        </p>
      </div>
    )
  }

  return habits.map((habit) => (
    <HabitCard key={habit.id} habit={habit} />
  ))
} 