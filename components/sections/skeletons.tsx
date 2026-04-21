"use client"

import { useEffect, useState } from "react"

interface SkeletonWrapperProps {
  children: React.ReactNode
  skeleton: React.ReactNode
  delay?: number
}

export function SkeletonWrapper({ children, skeleton, delay = 600 }: SkeletonWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (isLoading) {
    return <>{skeleton}</>
  }

  return <>{children}</>
}

export function HeroSkeleton() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-4xl w-full space-y-6">
        {/* Greeting skeleton */}
        <div className="h-5 w-32 bg-muted/50 rounded animate-pulse" />

        {/* Name skeleton */}
        <div className="h-16 w-80 bg-muted/50 rounded animate-pulse sm:h-20 lg:h-24" />

        {/* Tagline skeleton */}
        <div className="h-12 w-full max-w-lg bg-muted/50 rounded animate-pulse sm:h-16" />

        {/* Description skeleton */}
        <div className="space-y-3 max-w-xl">
          <div className="h-5 w-full bg-muted/50 rounded animate-pulse" />
          <div className="h-5 w-4/5 bg-muted/50 rounded animate-pulse" />
          <div className="h-5 w-3/5 bg-muted/50 rounded animate-pulse" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-4 pt-8">
          <div className="h-14 w-48 bg-muted/50 rounded animate-pulse" />
          <div className="h-14 w-36 bg-muted/50 rounded animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="h-full bg-card border border-border rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 bg-muted/50 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-5 w-5 bg-muted/50 rounded animate-pulse" />
          <div className="h-5 w-5 bg-muted/50 rounded animate-pulse" />
        </div>
      </div>

      {/* Title */}
      <div className="h-6 w-3/4 bg-muted/50 rounded animate-pulse" />

      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse" />
      </div>

      {/* Tech badges */}
      <div className="flex gap-2 flex-wrap pt-2">
        <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse" />
        <div className="h-6 w-20 bg-muted/50 rounded-full animate-pulse" />
        <div className="h-6 w-14 bg-muted/50 rounded-full animate-pulse" />
      </div>
    </div>
  )
}

export function FeaturedProjectSkeleton({ isEven }: { isEven: boolean }) {
  return (
    <div className={`relative grid gap-4 md:grid-cols-12 md:gap-0 ${!isEven ? "md:text-right" : ""}`}>
      {/* Image skeleton */}
      <div className={`relative md:col-span-7 ${isEven ? "md:col-start-1" : "md:col-start-6"}`}>
        <div className="aspect-video bg-muted/50 rounded-lg animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className={`relative z-10 flex flex-col justify-center md:col-span-7 ${
        isEven ? "md:col-start-6 md:items-end" : "md:col-start-1 md:row-start-1 md:items-start"
      }`}>
        <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
        <div className="mt-2 h-8 w-48 bg-muted/50 rounded animate-pulse" />
        <div className="mt-4 p-6 bg-card rounded-lg w-full max-w-md">
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-muted/50 rounded animate-pulse" />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-16 bg-muted/50 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
