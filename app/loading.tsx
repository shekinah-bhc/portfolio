'use client'

import { Spinner } from '@/components/ui/custom/spinner'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-primary" />
        <p className="text-sm font-mono text-muted-foreground animate-pulse">
          Initializing Portfolio...
        </p>
      </div>
    </div>
  )
}
