"use client"

import { useParams, notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Play } from "lucide-react"
import Link from "next/link"
import { getProjectBySlug, getAllProjectSlugs, type ProjectCaseStudy } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { TechBadge, MetricChip } from "@/components/portfolio/tech-badge"
import { VideoLightbox } from "@/components/portfolio/video-lightbox"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = getProjectBySlug(slug)
  const prefersReducedMotion = useReducedMotion()
  const [videoOpen, setVideoOpen] = useState(false)

  // Get animation props based on reduced motion preference
  const getMotionProps = (variants: typeof itemVariants) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
      }
    }
    return {
      variants,
      initial: "hidden",
      animate: "visible",
    }
  }

  if (!project) {
    notFound()
  }

  return (
    <>
      <main className="min-h-screen bg-background pt-24 pb-20">
        {/* Back button */}
        <motion.div
          className="px-6 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <motion.span
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.span>
            Back to projects
          </Link>
        </motion.div>

        {/* Hero section */}
        <motion.section
          className="px-6 mb-20"
          {...getMotionProps(containerVariants)}
        >
          <div className="mx-auto max-w-4xl">
            <motion.p
              className="font-mono text-primary mb-4"
              {...getMotionProps(itemVariants)}
            >
              Case Study
            </motion.p>

            <motion.h1
              className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-4"
              {...getMotionProps(itemVariants)}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-6"
              {...getMotionProps(itemVariants)}
            >
              {project.tagline}
            </motion.p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-3 mb-8"
                {...getMotionProps(itemVariants)}
              >
                {project.metrics.map((metric) => (
                  <MetricChip key={metric} metric={metric} />
                ))}
              </motion.div>
            )}

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              {...getMotionProps(itemVariants)}
            >
              <Button
                asChild
                className="bg-primary text-background hover:bg-primary/90"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Site
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Source
                </a>
              </Button>
              {project.videoUrl && (
                <Button
                  variant="outline"
                  className="border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => setVideoOpen(true)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Demo
                </Button>
              )}
            </motion.div>

            {/* Video preview */}
            {project.videoUrl && (
              <motion.div
                className="relative rounded-lg overflow-hidden mb-16 cursor-pointer group"
                {...getMotionProps(itemVariants)}
                onClick={() => setVideoOpen(true)}
                whileHover={{ scale: 1.01 }}
              >
                <video
                  src={project.videoUrl}
                  className="w-full aspect-video object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="h-8 w-8 text-background ml-1" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Problem / Solution / Outcome grid */}
        <motion.section
          className="px-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
            <motion.div
              className="p-6 bg-card rounded-lg border border-border"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            >
              <h2 className="text-sm font-mono text-primary mb-3">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </motion.div>

            <motion.div
              className="p-6 bg-card rounded-lg border border-border"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
            >
              <h2 className="text-sm font-mono text-primary mb-3">The Solution</h2>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </motion.div>

            <motion.div
              className="p-6 bg-primary/10 rounded-lg border border-primary/30 md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            >
              <h2 className="text-sm font-mono text-primary mb-3">The Outcome</h2>
              <p className="text-foreground leading-relaxed mb-4">{project.outcome.description}</p>
              <div className="flex flex-wrap gap-3">
                {project.outcome.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Detailed sections */}
        <section className="px-6 mb-20">
          <div className="mx-auto max-w-3xl space-y-16">
            {project.sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <motion.section
          className="px-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-sm font-mono text-primary mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: index * 0.05 }}
                >
                  <TechBadge tech={tech} size="md" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          className="px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground mb-8">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                asChild
                className="bg-primary text-background hover:bg-primary/90"
              >
                <Link href="/#contact">Get in Touch</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Link href="/#projects">View More Projects</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Video lightbox */}
      {project.videoUrl && (
        <VideoLightbox
          isOpen={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoUrl={project.videoUrl}
          title={project.title}
        />
      )}
    </>
  )
}
