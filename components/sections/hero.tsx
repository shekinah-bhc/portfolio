"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { siteConfig } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { CharacterReveal } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"
import { ArrowDown, Mail, Briefcase } from "lucide-react"

const roles = ["Full Stack Developer", "React Developer", "Next.js Developer", "UI Engineer"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const ref = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="mx-auto max-w-5xl w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8"
        >
          {/* Availability Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for Freelance
          </motion.div>

          {/* Name */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl"
          >
            <CharacterReveal delay={0.8}>{siteConfig.name}</CharacterReveal>
          </motion.h1>

          {/* Typewriter Roles */}
          <motion.div 
            variants={itemVariants}
            className="h-12 sm:h-16 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-3xl font-semibold sm:text-5xl lg:text-6xl text-muted-foreground"
              >
                {roles[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Tagline/Description */}
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-muted-foreground/80 text-balance"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 pt-4"
          >
            <MagneticButton>
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-7 text-lg shadow-lg shadow-primary/20"
              >
                <a href="#projects">View My Work</a>
              </Button>
            </MagneticButton>
            
            <MagneticButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-10 py-7 text-lg group"
              >
                <a href="#contact" className="flex items-center gap-2">
                  Get In Touch
                  <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground opacity-50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

