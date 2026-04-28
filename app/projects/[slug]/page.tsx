"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { projects, getProjectBySlug } from "@/lib/data/projects"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Globe, ShieldCheck, Zap, Layout, Code2, Database, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TechBadge } from "@/components/sections/tech-badge"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ProjectVideoShowcase } from "@/components/sections/project-video-showcase"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params)
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background pt-24 sm:pt-32 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Fixed Navigation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50"
        >
          <Link
            href="/#projects"
            className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-background/60 backdrop-blur-xl border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group shadow-2xl"
            title="Back to projects"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:h-6 transition-transform group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        {/* 1. Cinematic Video Hero */}
        {(project.videoUrl || (project.videoUrls && project.videoUrls.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-24"
          >
            <ProjectVideoShowcase
              videoUrl={project.videoUrl}
              videoUrls={project.videoUrls}
              title={project.title}
              subtitle={project.type}
            />
          </motion.div>
        )}

        {/* 2. Project Identity & Overview */}
        <div className="grid gap-12 lg:grid-cols-12 mb-32 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {project.status === "Live" && (
                  <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 flex items-center gap-1.5 rounded-full px-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Production Ready
                  </Badge>
                )}
                <Badge variant="outline" className="font-mono lowercase tracking-tighter opacity-60">
                  {project.slug}
                </Badge>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
              >
                {project.title}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl italic"
            >
              "{project.description}"
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              {project.liveUrl && (
                <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg shadow-xl shadow-primary/20">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-5 w-5 mr-3" />
                    Launch Live Site
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg border-primary/20">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <ShieldCheck className="h-5 w-5 mr-3" />
                    Private Repo
                  </a>
                </Button>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="rounded-4xl border border-border bg-secondary/10 p-8 space-y-8 backdrop-blur-sm">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-16">
            {/* My Role/Responsibilities */}
            <section className="bg-secondary/10 rounded-3xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Code2 className="w-6 h-6 text-primary" />
                Engineering Scope
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Layout className="w-4 h-4 text-primary" />
                    Frontend & DX
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.whatIDid.frontend}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    Back-end & Systems
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.whatIDid.backend}
                  </p>
                </div>
              </div>
            </section>

            {/* Key Highlights */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                Technical Highlights
              </h2>
              <div className="grid gap-6">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-background border border-border shadow-sm group hover:border-primary/20 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                      0{i + 1}
                    </div>
                    <p className="text-muted-foreground self-center">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Testimonial */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              {project.testimonial && (
                <div className="bg-primary p-8 rounded-3xl text-primary-foreground relative overflow-hidden group">
                  <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform" />
                  <p className="text-lg font-medium italic relative z-10 mb-6">
                    "{project.testimonial.quote}"
                  </p>
                  <div className="relative z-10">
                    <p className="font-bold">{project.testimonial.author}</p>
                    <p className="text-sm opacity-80">{project.testimonial.role}</p>
                  </div>
                </div>
              )}

              <div className="p-8 rounded-3xl border border-border bg-background space-y-6">
                <h3 className="font-bold">Next Project</h3>
                <Link
                  href="/#projects"
                  className="block p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Discover more work</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="mt-32 pt-20 border-t border-border">
          <div className="bg-secondary/30 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-center space-y-8">
            <h2 className="text-2xl font-bold sm:text-5xl">Like what you see?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I'm currently available for full-stack engineering roles and high-impact freelance projects. Let's build something together.
            </p>
            <Button asChild size="lg" className="rounded-full px-12 py-8 text-xl font-bold shadow-xl shadow-primary/20">
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}

