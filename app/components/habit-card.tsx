'use client'

import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { CheckCircle, XCircle } from 'lucide-react'

interface HabitCardProps {
  habit: {
    id: string
    title: string
    description?: string
    streak: number
    frequency: number
    logs: { id: string; date: string; completed: boolean }[]
  }
}

export function HabitCard({ habit }: HabitCardProps) {
  const today = format(new Date(), 'yyyy-MM-dd')
  const todayLog = habit.logs.find(log => 
    format(new Date(log.date), 'yyyy-MM-dd') === today
  )

  const handleLog = async (completed: boolean) => {
    try {
      const response = await fetch(`/api/habits/${habit.id}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed, date: new Date().toISOString() }),
      })

      if (!response.ok) {
        throw new Error('Failed to log habit')
      }

      window.location.reload()
    } catch (error) {
      console.error('Error logging habit:', error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">
            {habit.title}
          </CardTitle>
          {habit.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {habit.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">🔥</span>
          <span className="text-2xl font-bold">{habit.streak}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {habit.logs.map((log) => (
            <div
              key={log.id}
              className={`h-8 rounded-sm ${
                log.completed
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
              title={format(new Date(log.date), 'PP')}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Goal: {habit.frequency} times per week
          </div>
          {!todayLog ? (
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleLog(true)}
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                Complete
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleLog(false)}
              >
                <XCircle className="mr-1 h-4 w-4" />
                Skip
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {todayLog.completed ? (
                <span className="text-primary">Completed today</span>
              ) : (
                <span className="text-muted-foreground">Skipped today</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 