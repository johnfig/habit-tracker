'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, Calendar, Target, ArrowRight } from 'lucide-react'
import { Modal } from './ui/modal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CreateHabitButtonProps {
  className?: string
}

export function CreateHabitButton({ className }: CreateHabitButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [frequency, setFrequency] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, frequency }),
      })

      if (!response.ok) throw new Error('Failed to create habit')
      
      const newHabit = await response.json()
      
      // Dispatch custom event with the new habit data
      const event = new CustomEvent('habitCreated', { 
        detail: newHabit 
      })
      window.dispatchEvent(event)
      
      // Reset form and close modal
      setIsOpen(false)
      setTitle('')
      setFrequency(1)
    } catch (error) {
      console.error('Error creating habit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button
        size="lg"
        className={cn(
          "relative group transition-all duration-300 ease-out hover:scale-105",
          "bg-gradient-to-r from-primary via-purple-500 to-blue-500",
          "hover:from-primary/90 hover:via-purple-500/90 hover:to-blue-500/90",
          "text-white shadow-lg hover:shadow-xl",
          "flex items-center gap-3 min-h-[4rem]",
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-6 w-6" />
        <span>New Habit</span>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => !isSubmitting && setIsOpen(false)}
        title="Create New Habit"
        description="Start tracking a new daily habit"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Target className="h-4 w-4" />
              Habit Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Morning Exercise"
              className="w-full rounded-lg border bg-background/50 p-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Frequency Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Times per Day
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={frequency}
              onChange={(e) => setFrequency(parseInt(e.target.value))}
              className="w-full rounded-lg border bg-background/50 p-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-purple-600 p-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 ${
              isSubmitting 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:from-primary/90 hover:to-purple-600/90'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                Create Habit
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>
      </Modal>
    </>
  )
} 