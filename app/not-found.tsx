import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="space-y-4 text-center">
        <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold sm:text-3xl">Page not found</h2>
          <p className="text-muted-foreground max-w-[500px]">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="pt-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
