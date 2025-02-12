'use client'

import { motion } from 'framer-motion'

export function FeaturesHeader() {
  return (
    <div className="text-center mb-16">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-primary/10 shadow-sm backdrop-blur-sm mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-sm font-medium text-primary">Powerful Features</span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto mb-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-foreground">Everything </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500">
            You Need to Build Better Habits
          </span>
        </h2>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-base text-muted-foreground max-w-lg mx-auto"
      >
        Our comprehensive suite of features helps you build and maintain healthy habits with ease.
      </motion.p>

      {/* Decorative line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent -z-10" />
    </div>
  )
} 