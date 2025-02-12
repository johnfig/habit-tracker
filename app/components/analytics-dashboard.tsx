'use client'

import { motion } from 'framer-motion'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Activity, Award, Flame, Target } from 'lucide-react'
import { format } from 'date-fns'

type Habit = {
  id: string
  title: string
  streak: number
  logs: {
    date: string
    completed: boolean
  }[]
}

interface AnalyticsDashboardProps {
  habits: Habit[]
}

export function AnalyticsDashboard({ habits }: AnalyticsDashboardProps) {
  // Calculate completion rate for each habit
  const habitStats = habits.map(habit => ({
    name: habit.title,
    completionRate: Math.round(
      (habit.logs.filter(log => log.completed).length / Math.max(habit.logs.length, 1)) * 100
    ),
    streak: habit.streak,
  }))

  // Calculate overall stats
  const totalHabits = habits.length
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.logs.filter(log => log.completed).length,
    0
  )
  const averageStreak = Math.round(
    habits.reduce((sum, habit) => sum + habit.streak, 0) / Math.max(habits.length, 1)
  )
  const bestStreak = Math.max(...habits.map(habit => habit.streak), 0)

  const stats = [
    {
      title: 'Total Habits',
      value: totalHabits,
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Completions',
      value: totalCompletions,
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Average Streak',
      value: averageStreak,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Best Streak',
      value: bestStreak,
      icon: Award,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  // Calculate completion rates by day for the last 30 days
  const last30Days = [...Array(30)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date
  }).reverse()

  const completionData = last30Days.map(date => {
    const dayStats = habits.reduce(
      (acc, habit) => {
        const completed = habit.logs.some(
          log => 
            new Date(log.date).toDateString() === date.toDateString() && 
            log.completed
        )
        return {
          total: acc.total + 1,
          completed: acc.completed + (completed ? 1 : 0)
        }
      },
      { total: 0, completed: 0 }
    )

    return {
      date: format(date, 'MMM d'),
      value: habits.length > 0 
        ? Math.round((dayStats.completed / dayStats.total) * 100)
        : 0,
      completed: dayStats.completed,
      total: dayStats.total,
    }
  })

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h2 className="text-3xl font-bold">{stat.value}</h2>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Updated Completion Rates Chart */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Habit Completion Trend</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary/20" />
              <span>Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary/50" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>High</span>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-sm">
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between gap-8">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Date
                            </span>
                            <span className="font-medium">
                              {data.date}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Completion Rate
                            </span>
                            <span className="font-medium">
                              {data.value}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Completed
                            </span>
                            <span className="font-medium">
                              {data.completed} of {data.total}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
                fill="currentColor"
              >
                {completionData.map((entry, index) => (
                  <motion.rect
                    key={`cell-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.01 }}
                    className={
                      entry.value >= 80
                        ? "fill-primary"
                        : entry.value >= 50
                        ? "fill-primary/50"
                        : "fill-primary/20"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
} 