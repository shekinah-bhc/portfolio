"use client"

import { motion, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { TextReveal } from "./text-reveal"

const experiences = [
  {
    title: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "2024 — Present",
    description: [
      "Built production web applications for institutional and private clients using Next.js 15, TypeScript, and high-end animations.",
      "Developed high-performance agency websites and complex full-stack portals from scratch.",
      "Implemented GSAP-powered scroll sequences and Three.js visual elements for luxury aesthetics.",
    ],
    skills: ["Next.js 15", "TypeScript", "GSAP", "Three.js", "Resend", "AWS S3"],
  },
  {
    title: "MCA (Master of Computer Applications)",
    company: "Bishop Heber College",
    period: "2022 — 2024",
    description: [
      "Specialized in advanced web technologies and software engineering principles.",
      "Graduated with honors, focusing on building scalable full-stack applications.",
      "Participated in various technical symposiums and development workshops.",
    ],
    skills: ["Full Stack Development", "Database Management", "Software Architecture"],
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="px-6 py-24 relative overflow-hidden">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-16 flex flex-col items-center text-center space-y-4">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            <TextReveal>My Professional Journey</TextReveal>
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-primary rounded-full"
          />
        </div>

        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow-md md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:border-primary group-hover:bg-primary/5">
                <div className="w-3 h-3 rounded-full bg-border group-hover:bg-primary transition-colors" />
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-border bg-secondary/30 backdrop-blur-sm shadow-sm transition-all group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <p className="text-primary font-mono text-sm">{exp.company}</p>
                  </div>
                  <time className="text-xs font-mono text-muted-foreground bg-border/40 px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </time>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground/90 leading-relaxed">
                      <span className="text-primary mt-1 shrink-0 text-[10px]">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-primary/5 text-primary border border-primary/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

