"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "./magnetic-button"
import { CharacterReveal } from "./text-reveal"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])

  return (
    <section id="contact" className="relative px-6 py-24 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
      />

      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.p 
          variants={itemVariants}
          className="font-mono text-primary"
        >
          04. What&apos;s Next?
        </motion.p>

        <motion.h2 
          variants={itemVariants}
          className="mt-4 text-4xl font-bold text-foreground sm:text-5xl"
        >
          <CharacterReveal delay={0.3}>Get In Touch</CharacterReveal>
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="mt-6 text-lg leading-relaxed text-muted-foreground"
        >
          I&apos;m currently looking for new opportunities and my inbox is always open. 
          Whether you have a question, a project idea, or just want to say hi, 
          I&apos;ll try my best to get back to you!
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12"
        >
          <MagneticButton>
            <Button
              asChild
              size="lg"
              className="relative bg-transparent border-2 border-primary text-primary hover:bg-primary/10 px-10 py-6 text-base overflow-hidden group"
            >
              <motion.a 
                href="mailto:hello@example.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Say Hello
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Decorative animated dots */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + i,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
