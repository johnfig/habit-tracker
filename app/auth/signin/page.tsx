import { SignInForm } from '../../components/auth/sign-in-form'

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome to Habit Streaks
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to start tracking your habits
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
} 