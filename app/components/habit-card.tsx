'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface HabitCardProps {
  habit: {
    id: string
    title: string
    streak: number
    frequency: number
    logs: { date: string; completed: boolean }[]
  }
}

export function HabitCard({ habit }: HabitCardProps) {
  const queryClient = useQueryClient()
  
  const { mutate: logHabit } = useMutation({
    mutationFn: async (completed: boolean) => {
      const res = await fetch(`/api/habits/${habit.id}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed, date: new Date().toISOString() }),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })

  const today = format(new Date(), 'yyyy-MM-dd')
  const todayLog = habit.logs.find(log => 
    format(new Date(log.date), 'yyyy-MM-dd') === today
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{habit.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Current streak</p>
            <p className="text-2xl font-bold">{habit.streak} days</p>
          </div>
          <div className="flex gap-2">
            {!todayLog ? (
              <>
                <button
                  onClick={() => logHabit(true)}
                  className="text-green-500 hover:text-green-600"
                >
                  <CheckCircle size={24} />
                </button>
                <button
                  onClick={() => logHabit(false)}
                  className="text-red-500 hover:text-red-600"
                >
                  <XCircle size={24} />
                </button>
              </>
            ) : (
              <span className={todayLog.completed ? "text-green-500" : "text-red-500"}>
                {todayLog.completed ? <CheckCircle size={24} /> : <XCircle size={24} />}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 