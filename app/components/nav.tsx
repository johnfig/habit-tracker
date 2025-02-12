'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu } from 'lucide-react'

export function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Habit Streaks
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-x-6">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold leading-6 text-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-semibold leading-6 text-foreground hover:text-primary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-semibold leading-6 text-foreground hover:text-primary"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 