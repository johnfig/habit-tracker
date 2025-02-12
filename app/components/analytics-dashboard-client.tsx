'use client'

import { useEffect, useState } from 'react'
import { AnalyticsDashboard } from './analytics-dashboard'
import type { Habit, Log } from '@prisma/client'

type HabitWithLogs = Habit & {
  logs: Log[]
}

export function AnalyticsDashboardClient({ initialHabits }: { initialHabits: HabitWithLogs[] }) {
  const [habits, setHabits] = useState<HabitWithLogs[]>(initialHabits)

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('/api/habits')
        if (!response.ok) throw new Error('Failed to fetch habits')
        const data = await response.json()
        setHabits(data)
      } catch (error) {
        console.error('Error fetching habits:', error)
      }
    }

    // Listen for habit updates
    const handleHabitUpdate = () => {
      fetchHabits()
    }

    window.addEventListener('habitUpdated', handleHabitUpdate)
    return () => window.removeEventListener('habitUpdated', handleHabitUpdate)
  }, [])

  return <AnalyticsDashboard habits={habits} />
} 