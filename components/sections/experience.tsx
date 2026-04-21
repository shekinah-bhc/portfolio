"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { TextReveal } from "./text-reveal"

const experiences = [
  {
    company: "Acme Corp",
    title: "Senior Frontend Engineer",
    period: "2022 — Present",
    url: "#",
    description: [
      "Build and maintain critical components used to construct frontend interfaces, with a focus on accessibility and performance",
      "Work closely with cross-functional teams, including designers, product managers, and other developers to implement new features",
      "Lead the migration of legacy codebase to modern React patterns, improving developer experience and reducing bundle size by 40%",
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    company: "Tech Startup",
    title: "Frontend Developer",
    period: "2020 — 2022",
    url: "#",
    description: [
      "Developed and shipped highly interactive web applications using React and Next.js",
      "Collaborated with UI/UX designers to implement responsive designs and smooth animations",
      "Optimized application performance resulting in a 50% improvement in load times",
    ],
    skills: ["JavaScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    company: "Digital Agency",
    title: "Web Developer",
    period: "2018 — 2020",
    url: "#",
    description: [
      "Built and maintained websites for various clients using modern web technologies",
      "Worked with a team of designers and developers in an agile environment",
      "Implemented custom WordPress themes and plugins for content management",
    ],
    skills: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
  {
    company: "Freelance",
    title: "Web Developer",
    period: "2016 — 2018",
    url: "#",
    description: [
      "Designed and developed websites for small businesses and individuals",
      "Managed client relationships and project timelines",
      "Created responsive, mobile-first websites using modern CSS techniques",
    ],
    skills: ["HTML", "CSS", "JavaScript", "PHP"],
  },
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
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const contentVariants = {
  hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
    },
  },
}

export function Experience() {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="px-6 py-24">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-4xl"
      >
        {/* Section heading */}
        <motion.h2 
          variants={itemVariants}
          className="mb-12 flex items-center gap-4 text-2xl font-bold text-foreground sm:text-3xl"
        >
          <span className="font-mono text-xl text-primary">02.</span>
          <TextReveal>Where I&apos;ve Worked</TextReveal>
          <motion.span 
            className="h-px flex-1 bg-border origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </motion.h2>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col gap-8 md:flex-row"
        >
          {/* Tab List */}
          <div className="relative flex overflow-x-auto md:flex-col md:overflow-visible">
            {experiences.map((exp, index) => (
              <motion.button
                key={exp.company}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "relative whitespace-nowrap px-5 py-3 text-left font-mono text-sm transition-all",
                  activeTab === index
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                )}
                whileHover={{ x: activeTab === index ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {exp.company}
                {activeTab === index && (
                  <motion.span 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary md:bottom-auto md:left-0 md:top-0 md:h-full md:w-0.5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[320px] flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.h3 
                  className="text-xl font-medium text-foreground"
                >
                  {experiences[activeTab].title}{" "}
                  <motion.a
                    href={experiences[activeTab].url}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ color: "var(--primary)" }}
                  >
                    @ {experiences[activeTab].company}
                  </motion.a>
                </motion.h3>
                <p className="mt-1 font-mono text-sm text-muted-foreground">
                  {experiences[activeTab].period}
                </p>
                <ul className="mt-6 space-y-4">
                  {experiences[activeTab].description.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex gap-3 text-muted-foreground"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <motion.span 
                        className="mt-1.5 text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.1, type: "spring" }}
                      >
                        ▹
                      </motion.span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div 
                  className="mt-6 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {experiences[activeTab].skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(100, 255, 218, 0.2)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
