"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TextReveal } from "./text-reveal"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Shekinah delivered a polished, production-ready site that exceeded our expectations.",
    author: "Client",
    company: "Reborn Interactive"
  },
  {
    quote: "The admissions portal handled our entire intake season without a single issue.",
    author: "Admin",
    company: "Bishop Heber College"
  }
]

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="px-6 py-24">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-16 space-y-4">
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            <TextReveal>Testimonials</TextReveal>
          </motion.h2>
          <motion.div 
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            className="h-1 w-20 bg-primary rounded-full origin-left"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="p-8 rounded-2xl bg-secondary/20 border border-border relative group hover:border-primary/20 transition-colors"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-foreground italic">
                  "{t.quote}"
                </p>
                
                <div>
                  <h4 className="font-bold text-foreground">{t.author}</h4>
                  <p className="text-sm text-primary font-mono">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
