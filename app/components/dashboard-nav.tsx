'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

export function DashboardNav({ user }: { user: User }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Habit Streaks
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => signOut()}>
              Sign Out
            </Button>
            <div className="flex items-center space-x-2">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary">
                    {user?.name?.[0] || user?.email?.[0] || 'U'}
                  </span>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
} 