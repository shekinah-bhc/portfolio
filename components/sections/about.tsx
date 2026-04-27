"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { siteConfig } from "@/lib/constants"
import { TechBadge } from "./tech-badge"
import { TextReveal } from "./text-reveal"

const skillGroups = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "PHP", "MySQL", "MongoDB"]
  },
  {
    name: "Tools",
    skills: ["Redux Toolkit", "Zod", "AWS S3", "Git", "Vercel", "CCAvenue"]
  },
  {
    name: "Design",
    skills: ["shadcn/ui", "Figma basics", "Dark/Light theming", "Responsive UI"]
  }
]

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
      ease: [0.22, 1, 0.36, 1] as const
    },
  },
}

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section id="about" className="relative px-6 py-24">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl"
      >
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Bio Content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.h2 
              variants={itemVariants}
              className="flex items-center gap-4 text-3xl font-bold text-foreground sm:text-4xl"
            >
              <TextReveal>About Me</TextReveal>
              <div className="h-px flex-1 bg-border" />
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a <span className="text-primary font-medium">Full Stack Web Developer</span> based in Tamil Nadu, India, with a passion for building high-performance, visually stunning web applications. My journey in tech led me to complete my MCA at Bishop Heber College, where I honed my skills in both frontend and backend development.
              </p>
              <p>
                I specialize in creating <span className="text-foreground">production-ready sites</span> that balance aesthetic design with technical excellence. Whether it's a creative agency website or a complex institutional portal, I focus on delivering polished results that exceed expectations.
              </p>
              <p>
                My approach combines <span className="text-foreground">modern frameworks</span> like Next.js 15 with powerful animation tools like GSAP and Framer Motion. I am committed to clean code, scalable architecture (like Feature-Sliced Design), and performance optimization.
              </p>
            </motion.div>
          </div>

          {/* Skills Groups */}
          <div className="lg:col-span-2 space-y-8">
            <motion.h3 
              variants={itemVariants}
              className="text-xl font-bold text-foreground"
            >
              Skills & Technologies
            </motion.h3>

            <div className="grid gap-6">
              {skillGroups.map((group) => (
                <motion.div key={group.name} variants={itemVariants} className="space-y-3">
                  <h4 className="text-sm font-mono text-primary font-semibold uppercase tracking-wider">
                    {group.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <TechBadge key={skill} tech={skill} showIcon={false} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

