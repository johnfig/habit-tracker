'use client'

import { useEffect, useState } from 'react'
import { motion, Reorder } from 'framer-motion'
import { CheckCircle2, GripVertical, Flame, XCircle, Circle, Trash2 } from 'lucide-react'
import { format, startOfWeek, addDays, isToday, isSameDay, parseISO, isFuture, isPast } from 'date-fns'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Log = {
  id: string
  date: string
  completed: boolean
}

type Habit = {
  id: string
  title: string
  frequency: number
  streak: number
  logs: Log[]
}

export function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Get current week's dates
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

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

  const getCompletionStatus = (habit: Habit, date: Date) => {
    const log = habit.logs.find(log => 
      isSameDay(parseISO(log.date), date)
    )
    return log?.completed
  }

  const handleComplete = async (habitId: string) => {
    try {
      const response = await fetch(`/api/habits/${habitId}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      })

      if (!response.ok) throw new Error('Failed to log habit')
      
      // Fetch updated habits
      await fetchHabits()
      
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('habitUpdated'))
    } catch (error) {
      console.error('Error logging habit:', error)
    }
  }

  const handleDelete = async (habitId: string) => {
    try {
      const response = await fetch(`/api/habits/${habitId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete habit')
      await fetchHabits()
    } catch (error) {
      console.error('Error deleting habit:', error)
    }
  }

  const getStatusStyles = (date: Date, completed: boolean | undefined) => {
    if (isFuture(date)) {
      return {
        bg: 'bg-muted/40',
        ring: '',
        text: 'text-muted-foreground/50',
        icon: null
      }
    }

    if (isToday(date)) {
      if (completed) {
        return {
          bg: 'bg-green-500/20',
          ring: 'ring-2 ring-green-500/20',
          text: 'text-green-500',
          icon: <CheckCircle2 className="h-5 w-5" />
        }
      }
      return {
        bg: 'bg-primary/10 hover:bg-primary/20',
        ring: 'ring-2 ring-primary/20',
        text: 'text-primary',
        icon: <Circle className="h-5 w-5" />
      }
    }

    if (isPast(date)) {
      if (completed) {
        return {
          bg: 'bg-green-500/20',
          ring: 'ring-2 ring-green-500/20',
          text: 'text-green-500',
          icon: <CheckCircle2 className="h-5 w-5" />
        }
      }
      return {
        bg: 'bg-red-500/20',
        ring: 'ring-2 ring-red-500/20',
        text: 'text-red-500',
        icon: <XCircle className="h-5 w-5" />
      }
    }

    return {
      bg: 'bg-muted/40',
      ring: '',
      text: 'text-muted-foreground/50',
      icon: null
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-full">
      <div className="p-6 space-y-6">
        {/* Week Header */}
        <div className="grid grid-cols-[250px_repeat(7,1fr)] gap-2">
          <div className="font-medium text-muted-foreground">Habits</div>
          {weekDates.map(date => (
            <div
              key={date.toISOString()}
              className={`text-center p-2 rounded-md ${
                isToday(date) ? 'bg-muted' : ''
              }`}
            >
              <div className={`text-sm font-medium ${
                isToday(date) ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {format(date, 'EEE')}
              </div>
              <div className="text-xs text-muted-foreground/60">
                {format(date, 'd')}
              </div>
            </div>
          ))}
        </div>

        {/* Habits Grid */}
        <Reorder.Group as="div" axis="y" values={habits} onReorder={setHabits} className="space-y-2">
          {habits.map((habit) => (
            <Reorder.Item key={habit.id} value={habit} as="div">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-[250px_repeat(7,1fr)] gap-2 items-center"
              >
                {/* Habit Info */}
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-md">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-grab active:cursor-grabbing p-1.5 rounded-md hover:bg-primary/5"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </motion.button>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{habit.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Flame className="h-3 w-3 text-primary" />
                      <span>{habit.streak} day streak</span>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Habit</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this habit? This action cannot be undone 
                          and all tracking history will be lost.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(habit.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Week Status */}
                {weekDates.map(date => {
                  const completed = getCompletionStatus(habit, date)
                  const isCurrentDay = isToday(date)
                  const status = getStatusStyles(date, completed)

                  return (
                    <div
                      key={date.toISOString()}
                      className={`flex items-center justify-center p-2 rounded-md ${
                        isCurrentDay ? 'bg-muted' : ''
                      }`}
                    >
                      <motion.div
                        whileHover={isCurrentDay && !completed ? { scale: 1.1 } : {}}
                        whileTap={isCurrentDay && !completed ? { scale: 0.95 } : {}}
                        onClick={() => isCurrentDay && !completed && handleComplete(habit.id)}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${status.bg} ${status.ring} ${status.text}
                          ${isCurrentDay && !completed ? 'cursor-pointer' : 'cursor-default'}
                          transition-all duration-200
                        `}
                      >
                        {status.icon}
                      </motion.div>
                    </div>
                  )
                })}
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  )
} 