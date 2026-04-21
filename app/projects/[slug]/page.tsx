import { notFound } from "next/navigation"
import { Metadata } from "next"
import { projects, getProjectBySlug } from "@/lib/data/projects"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TechBadge } from "@/components/sections/tech-badge"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <div className="mb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </Link>
        </div>

        {/* Hero */}
        <section className="mb-20">
          <p className="font-mono text-primary mb-4 text-sm uppercase tracking-wider">Case Study</p>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-7xl mb-6 tracking-tight">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            {project.liveUrl && (
              <Button asChild size="lg" className="rounded-full">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Site
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 text-primary hover:bg-primary/5">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Source
                </a>
              </Button>
            )}
          </div>

          <div className="aspect-video relative rounded-2xl overflow-hidden border border-border bg-muted mb-16">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Content */}
        <section className="grid gap-16">
          <div>
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">About the project</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-mono text-primary mb-6 uppercase tracking-widest">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-32 pt-16 border-t border-border text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-muted-foreground mb-8">
            I&apos;m always open to discussing new projects and opportunities.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </section>
      </div>
    </main>
  )
}
