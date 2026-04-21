"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Github, Folder } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TextReveal } from "./text-reveal"
import { getFeaturedProjects, getAllProjects, Project } from "@/lib/data/projects"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isEven = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <motion.div
      ref={ref}
      className={`relative grid gap-4 md:grid-cols-12 md:gap-0 ${!isEven ? "md:text-right" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Project Image with parallax */}
      <motion.div
        className={`relative md:col-span-7 ${isEven ? "md:col-start-1" : "md:col-start-6"}`}
        style={{ y }}
      >
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <motion.div 
            className="relative overflow-hidden rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="aspect-video bg-linear-to-br from-primary/30 via-primary/10 to-secondary flex items-center justify-center"
              initial={{ scale: 1.2 }}
              animate={isInView ? { scale: 1 } : { scale: 1.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span 
                className="text-4xl font-bold text-primary/40"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.title.charAt(0)}
              </motion.span>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-primary/20"
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </a>
      </motion.div>

      {/* Project Content */}
      <motion.div
        className={`relative z-10 flex flex-col justify-center md:col-span-7 ${
          isEven ? "md:col-start-6 md:items-end" : "md:col-start-1 md:row-start-1 md:items-start"
        }`}
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p 
          className="font-mono text-sm text-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.3 }}
        >
          Featured Project
        </motion.p>
        <motion.h3 
          className="mt-2 text-2xl font-bold text-foreground"
          whileHover={{ color: "var(--primary)" }}
        >
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </motion.h3>
        <motion.div 
          className="mt-4 rounded-lg bg-card p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          <p className="text-muted-foreground">{project.description}</p>
        </motion.div>
        <motion.ul
          className={`mt-4 flex flex-wrap gap-3 font-mono text-sm text-muted-foreground ${!isEven ? "" : "md:justify-end"}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          {project.techStack.map((tech, i) => (
            <motion.li 
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              {tech}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div 
          className={`mt-4 flex gap-4 ${!isEven ? "" : "md:justify-end"}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub Repository"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-5 w-5" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Live Demo"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="h-5 w-5" />
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" })

  const featured = getFeaturedProjects()
  const all = getAllProjects()
  const other = all.filter(p => !p.featured)

  return (
    <section id="projects" className="px-6 py-24">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl"
      >
        {/* Section heading */}
        <motion.h2 
          variants={itemVariants}
          className="mb-12 flex items-center gap-4 text-2xl font-bold text-foreground sm:text-3xl"
        >
          <span className="font-mono text-xl text-primary">03.</span>
          <TextReveal>Some Things I&apos;ve Built</TextReveal>
          <motion.span 
            className="h-px flex-1 bg-border origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.h2>

        {/* Featured Projects */}
        <div className="space-y-24">
          {featured.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        {other.length > 0 && (
          <motion.div 
            ref={gridRef}
            className="mt-32"
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-center text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            >
              Other Noteworthy Projects
            </motion.h3>
            <motion.p 
              className="mt-2 text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a href="https://github.com" className="text-primary hover:underline">
                view the archive
              </a>
            </motion.p>

            <motion.div 
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
            >
              {other.map((project, index) => (
                <motion.div
                  key={project.slug}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card className="group h-full bg-card border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                    <CardHeader>
                      <motion.div 
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <motion.div
                          whileHover={{ rotate: -10, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Folder className="h-10 w-10 text-primary" />
                        </motion.div>
                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground transition-colors hover:text-primary"
                              aria-label="GitHub Repository"
                              whileHover={{ scale: 1.2, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Github className="h-5 w-5" />
                            </motion.a>
                          )}
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground transition-colors hover:text-primary"
                              aria-label="Live Demo"
                              whileHover={{ scale: 1.2, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink className="h-5 w-5" />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                      <CardTitle className="mt-4 text-foreground group-hover:text-primary transition-colors">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                        {project.techStack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

