import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Back button skeleton */}
        <div className="mb-12">
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Hero skeleton */}
        <div className="mb-20">
          <Skeleton className="h-4 w-20 mb-4" />
          <Skeleton className="h-16 w-3/4 mb-6" />
          <Skeleton className="h-24 w-full mb-8" />
          
          <div className="flex gap-4 mb-12">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>

          <Skeleton className="aspect-video w-full rounded-2xl" />
        </div>

        {/* Content skeletons */}
        <div className="grid gap-16">
          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
