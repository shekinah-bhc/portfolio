import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background text-foreground p-6">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Project Not Found</h1>
        <p className="text-muted-foreground max-w-[500px]">
          We couldn&apos;t find the project you were looking for. It might have been removed or the URL is incorrect.
        </p>
        <div className="pt-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/#projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
