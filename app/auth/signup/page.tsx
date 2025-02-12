import { SignUpForm } from '../../components/auth/sign-up-form'

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start tracking your habits today
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
} 