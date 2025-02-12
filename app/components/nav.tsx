'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils'

export function Nav() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
          >
            Habit Streaks
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {[
              ['Dashboard', '/dashboard'],
              ['Settings', '/settings'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative -mx-3 -my-2 px-3 py-2 text-foreground/70 transition-colors hover:text-foreground',
                  pathname === href && 'text-foreground'
                )}
              >
                {label}
                {pathname === href && (
                  <motion.div
                    className="absolute inset-x-0 -bottom-[9px] h-px bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                    layoutId="navbar-active"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>
          <Link
            href="/auth/signout"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Sign Out
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-lg"
        >
          <nav className="flex flex-col p-4 space-y-3">
            {[
              ['Dashboard', '/dashboard'],
              ['Settings', '/settings'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-md transition-colors',
                  pathname === href && 'bg-primary/10 text-foreground'
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/auth/signout"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-md transition-colors"
            >
              Sign Out
            </Link>
          </nav>
        </motion.div>
      )}
    </div>
  )
} 