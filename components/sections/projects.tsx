"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TextReveal } from "./text-reveal"
import { getAllProjects, Project } from "@/lib/data/projects"
import { TechBadge } from "./tech-badge"

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
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      className={`group relative flex flex-col gap-8 md:flex-row ${!isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Visual Side */}
      <div className="relative w-full md:w-1/2 overflow-hidden rounded-2xl bg-secondary/20 aspect-video flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="text-4xl font-bold text-primary/10 select-none group-hover:scale-110 transition-transform duration-700">
          {project.title}
        </div>
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              {project.type}
            </Badge>
            {project.status === "Live" && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Now
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="text-muted-foreground leading-relaxed italic">
          "{project.description}"
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary/60">Frontend</h4>
              <p className="text-sm text-balance">{project.whatIDid.frontend}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary/60">Architecture</h4>
              <p className="text-sm text-balance">{project.whatIDid.backend}</p>
            </div>
          </div>

          <ul className="space-y-2">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <TechBadge key={tech} tech={tech} showIcon={false} />
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button asChild className="rounded-full px-6 group/btn">
            <Link href={`/projects/${project.slug}`}>
              View Case Study
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
          {project.liveUrl && (
            <Button asChild variant="outline" className="rounded-full px-6 border-primary/20 hover:border-primary/50">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit Site
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const projects = getAllProjects()

  return (
    <section id="projects" className="px-6 py-24 relative overflow-hidden">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-20 space-y-4">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            <TextReveal>Selected Projects</TextReveal>
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-primary rounded-full"
          />
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Noteworthy Grid */}
        <div className="mt-32 border-t border-border pt-20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Other Noteworthy Work</h3>
            <p className="text-muted-foreground">More coming soon. I'm always building something new.</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 opacity-40 grayscale pointer-events-none">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-2xl border border-dashed border-border flex items-center justify-center">
                  <span className="font-mono text-sm uppercase tracking-widest">Project 0{i+3}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}


