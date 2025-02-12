'use client'

import { useEffect, useState } from 'react'
import { motion, Reorder } from 'framer-motion'
import { CheckCircle2, GripVertical, Flame, XCircle } from 'lucide-react'
import { format, isToday } from 'date-fns'

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
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
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

  const isCompletedToday = (habit: Habit) => {
    return habit.logs.some(log => 
      isToday(new Date(log.date)) && log.completed
    )
  }

  const handleComplete = async (habitId: string) => {
    try {
      const response = await fetch(`/api/habits/${habitId}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      })

      if (!response.ok) throw new Error('Failed to log habit')
      
      // Refresh habits after completion
      await fetchHabits()
    } catch (error) {
      console.error('Error logging habit:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-primary/20 bg-background/40 backdrop-blur-sm p-8 text-center">
        <h3 className="font-medium text-lg text-muted-foreground">No habits yet</h3>
        <p className="mt-1 text-sm text-muted-foreground/80">
          Get started by creating a new habit
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Reorder.Group as="div" axis="y" values={habits} onReorder={setHabits} className="space-y-2">
        {habits.map((habit) => {
          const completed = isCompletedToday(habit)
          
          return (
            <Reorder.Item key={habit.id} value={habit} as="div">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-4 p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 ${
                  completed 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-background/60 border-primary/10 hover:border-primary/20'
                }`}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-grab active:cursor-grabbing p-2 rounded-md hover:bg-primary/5"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </motion.button>

                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className={`font-medium ${completed ? 'text-primary' : ''}`}>
                      {habit.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Flame className="h-4 w-4 text-primary" />
                      <span>{habit.streak} day streak</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {format(new Date(), 'EEEE')}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => !completed && handleComplete(habit.id)}
                  disabled={completed}
                  className={`p-2 rounded-full transition-colors ${
                    completed
                      ? 'bg-primary/20 text-primary cursor-not-allowed'
                      : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'
                  }`}
                >
                  <motion.div
                    animate={completed ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    } : undefined}
                  >
                    {completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                  </motion.div>
                </motion.button>
              </motion.div>
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </div>
  )
} 