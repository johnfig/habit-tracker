import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams?.get('error')

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-destructive">
          Authentication Error
        </h2>
        <p className="text-muted-foreground">
          {error === 'Configuration' 
            ? 'There is a problem with the server configuration.'
            : 'An error occurred while trying to authenticate.'}
        </p>
      </div>
    </div>
  )
} 