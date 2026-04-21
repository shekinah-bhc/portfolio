"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const words = children.split(" ")

  return (
    <motion.span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.04,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}

interface CharacterRevealProps {
  children: string
  className?: string
  delay?: number
}

export function CharacterReveal({ children, className = "", delay = 0 }: CharacterRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const characters = children.split("")

  return (
    <motion.span ref={ref} className={`inline-block ${className}`}>
      {characters.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.02,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
