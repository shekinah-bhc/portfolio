'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
        <div className="space-y-2">
          {process.env.NODE_ENV === 'development' ? (
            <p className="text-sm font-mono bg-muted p-4 rounded text-left overflow-auto max-w-lg mb-4">
              {error.message}
            </p>
          ) : (
            <p className="text-muted-foreground max-w-[500px]">
              We encountered an unexpected error. Our team has been notified.
            </p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button onClick={() => reset()} variant="default" size="lg" className="rounded-full">
            Try again
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
