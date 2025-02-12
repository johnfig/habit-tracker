import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'

export async function Nav() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Habit Streaks</span>
            </Link>
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/api/auth/signout">Sign Out</Link>
              </div>
            ) : (
              <Link href="/api/auth/signin">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 