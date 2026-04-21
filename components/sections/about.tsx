"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { TextReveal } from "./text-reveal"

const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "GraphQL",
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

const skillVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.05,
    },
  }),
}

export function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const imageInView = useInView(imageRef, { once: true, margin: "-50px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="about" className="relative px-6 py-24 overflow-hidden">
      {/* Parallax background element */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute right-0 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
      />

      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-4xl"
      >
        {/* Section heading with line animation */}
        <motion.h2 
          variants={itemVariants}
          className="mb-12 flex items-center gap-4 text-2xl font-bold text-foreground sm:text-3xl"
        >
          <span className="font-mono text-xl text-primary">01.</span>
          <TextReveal>About Me</TextReveal>
          <motion.span 
            className="h-px flex-1 bg-border origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Content */}
          <motion.div 
            variants={containerVariants}
            className="space-y-4 lg:col-span-2"
          >
            <motion.p 
              variants={itemVariants}
              className="leading-relaxed text-muted-foreground"
            >
              Hello! My name is <span className="text-primary font-medium">Your Name</span> and I enjoy 
              creating things that live on the internet. My interest in web development started 
              back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking 
              together a custom reblog button taught me a lot about HTML &amp; CSS!
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="leading-relaxed text-muted-foreground"
            >
              Fast-forward to today, and I&apos;ve had the privilege of working at{" "}
              <a href="#" className="text-primary hover:underline">a start-up</a>,{" "}
              <a href="#" className="text-primary hover:underline">a large corporation</a>, and{" "}
              <a href="#" className="text-primary hover:underline">a design agency</a>. My main 
              focus these days is building accessible, inclusive products and digital experiences.
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="leading-relaxed text-muted-foreground"
            >
              Here are a few technologies I&apos;ve been working with recently:
            </motion.p>

            {/* Skills with staggered animation */}
            <motion.ul 
              className="mt-4 grid grid-cols-2 gap-2"
              variants={containerVariants}
            >
              {skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  custom={index}
                  variants={skillVariants}
                  className="flex items-center gap-2 font-mono text-sm text-muted-foreground group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.span 
                    className="text-primary"
                    whileHover={{ scale: 1.2 }}
                  >
                    ▹
                  </motion.span>
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Profile image with reveal animation */}
          <motion.div 
            ref={imageRef}
            className="relative mx-auto w-64 lg:w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="group relative">
              {/* Image container with clip-path reveal */}
              <motion.div 
                className="relative z-10 overflow-hidden rounded-lg"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={imageInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <div className="aspect-square bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/30">YN</div>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-primary/20"
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Animated border */}
              <motion.div 
                className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg border-2 border-primary"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={imageInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ x: -4, y: -4 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
