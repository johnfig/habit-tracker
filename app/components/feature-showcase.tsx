'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, TrendingUp, Calendar, CheckCircle2, XCircle, Target, BarChart3, Flame } from 'lucide-react'

const features = [
  {
    title: "Daily Tracking",
    description: "Mark habits as complete each day and build streaks to stay motivated. Our intuitive interface makes it easy to stay on track.",
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    color: "from-primary/10 to-primary/5",
    preview: (isActive: boolean) => (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-4">
          <AnimatePresence>
            {isActive && [
              {
                title: "Morning Meditation",
                streak: 10,
                status: "active",
              },
              {
                title: "Exercise",
                streak: 5,
                status: "pending",
              },
              {
                title: "Read 30 mins",
                streak: 15,
                status: "completed",
              },
            ].map((habit, index) => (
              <motion.div
                key={habit.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <motion.div
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    habit.status === 'active' 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-card border-border'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-1">
                    <motion.h4 
                      className="font-medium"
                      layoutId={`title-${habit.title}`}
                    >
                      {habit.title}
                    </motion.h4>
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Flame className="h-4 w-4 text-primary" />
                      <span>{habit.streak} day streak</span>
                    </motion.div>
                  </div>
                  <div className="flex gap-2">
                    {habit.status === 'pending' && (
                      <>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        >
                          <XCircle className="h-5 w-5" />
                        </motion.button>
                      </>
                    )}
                    {habit.status === 'completed' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="p-2 rounded-full bg-primary/10 text-primary"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </motion.div>
                    )}
                    {habit.status === 'active' && (
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="p-2 rounded-full bg-primary/20 text-primary"
                      >
                        <Target className="h-5 w-5" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Progress Indicator */}
          <motion.div 
            className="mt-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">In Progress</span>
            </div>
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    title: "Progress Analytics",
    description: "Visualize your progress with detailed analytics and insights. Track your success rate and identify patterns.",
    icon: <TrendingUp className="h-10 w-10 text-purple-500" />,
    color: "from-purple-500/10 to-purple-500/5",
    preview: (isActive: boolean) => (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium text-center">Weekly Success Rate</h4>
            <div className="h-40 flex items-end justify-between gap-2">
              {[60, 80, 100, 90, 85, 95, 100].map((height, i) => (
                <motion.div
                  key={i}
                  className="w-full bg-primary/20 rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: isActive ? i * 0.1 : 0, duration: 0.5 }}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Streak', value: '15 days', icon: <Flame className="h-4 w-4" /> },
              { label: 'Success', value: '95%', icon: <Target className="h-4 w-4" /> },
              { label: 'Trends', value: '+12%', icon: <BarChart3 className="h-4 w-4" /> },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  {stat.icon}
                  <span className="text-xs">{stat.label}</span>
                </div>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Streak System",
    description: "Build and maintain streaks to reinforce your habit-building journey. Watch your consistency grow over time.",
    icon: <Calendar className="h-10 w-10 text-blue-500" />,
    color: "from-blue-500/10 to-blue-500/5",
    preview: (isActive: boolean) => (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.div
                key={i}
                className={`aspect-square rounded-lg ${
                  i < 15 ? 'bg-primary/80' : 'bg-muted'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { delay: isActive ? i * 0.02 : 0 }
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/80" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted" />
              <span className="text-sm text-muted-foreground">Upcoming</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Flame className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">15 Day Streak!</span>
          </div>
        </div>
      </div>
    ),
  },
]

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative grid lg:grid-cols-2 gap-12 items-center">
        {/* Feature List */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`cursor-pointer group ${
                activeFeature === index 
                  ? 'bg-gradient-to-r ' + feature.color 
                  : 'hover:bg-gradient-to-r hover:' + feature.color
              } rounded-2xl p-1 transition-all duration-300`}
              onClick={() => setActiveFeature(index)}
              initial={false}
              animate={{
                scale: activeFeature === index ? 1.02 : 1,
              }}
            >
              <div className={`
                space-y-4 p-6 rounded-xl bg-background/80 backdrop-blur-sm
                ${activeFeature === index ? 'border-2 border-primary/20' : 'border border-primary/10'}
              `}>
                <div className="flex items-start gap-4">
                  <div className={`
                    p-3 rounded-xl ${activeFeature === index ? 'bg-primary/10' : 'bg-primary/5'}
                    ring-1 ring-primary/20 transition-colors duration-300
                  `}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-1 text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Preview */}
        <div className="relative h-[400px] lg:h-[500px] w-full max-w-4xl mx-auto p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl border border-primary/10 h-full shadow-2xl shadow-primary/25 p-8">
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-lg"
              initial={false}
              animate={{
                opacity: [0, 1],
                y: [20, 0],
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              key={activeFeature}
            >
              {features[activeFeature].preview(true)}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 