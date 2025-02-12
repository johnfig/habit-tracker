'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface AnalyticsDashboardProps {
  habits: Array<{
    id: string
    title: string
    streak: number
    frequency: number
    logs: Array<{ date: string; completed: boolean }>
  }>
}

export function AnalyticsDashboard({ habits }: AnalyticsDashboardProps) {
  const totalHabits = habits.length
  const activeStreaks = habits.filter(habit => habit.streak > 0).length
  const completionRate = habits.reduce((acc, habit) => {
    const completed = habit.logs.filter(log => log.completed).length
    return acc + (completed / habit.logs.length) * 100
  }, 0) / habits.length

  const chartData = habits.map(habit => ({
    name: habit.title,
    streak: habit.streak,
    completionRate: (habit.logs.filter(log => log.completed).length / habit.logs.length) * 100
  }))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Total Habits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHabits}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Active Streaks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeStreaks}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Average Completion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completionRate.toFixed(1)}%
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Habit Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="completionRate" 
                stroke="#8884d8" 
                name="Completion Rate (%)"
              />
              <Line 
                type="monotone" 
                dataKey="streak" 
                stroke="#82ca9d" 
                name="Current Streak"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
} 