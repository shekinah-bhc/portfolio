"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { CharacterReveal } from "./text-reveal"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="mx-auto max-w-4xl"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.p 
            variants={itemVariants}
            className="font-mono text-primary"
          >
            Hi, my name is
          </motion.p>

          {/* Name with character reveal */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-bold text-foreground sm:text-6xl lg:text-7xl"
          >
            <CharacterReveal delay={0.5}>Your Name.</CharacterReveal>
          </motion.h1>

          {/* Tagline with gradient text */}
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold sm:text-5xl lg:text-6xl"
          >
            <span className="text-balance bg-gradient-to-r from-muted-foreground via-muted-foreground/80 to-muted-foreground bg-clip-text text-transparent">
              I build things for the web.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m a web developer specializing in building exceptional digital experiences. 
            Currently, I&apos;m focused on building accessible, human-centered products that 
            make a real difference.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-8"
          >
            <MagneticButton>
              <Button
                asChild
                size="lg"
                className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 px-8 py-6 text-base group"
              >
                <a href="#projects" className="flex items-center gap-2">
                  Check out my work
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    →
                  </motion.span>
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary hover:bg-primary/10 px-8 py-6 text-base"
              >
                <a href="#contact">Get in touch</a>
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator with animation */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.a 
            href="#about" 
            aria-label="Scroll to about section"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <ArrowDown className="h-6 w-6 text-primary" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + i,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  )
}
