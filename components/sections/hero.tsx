// components/hero.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/constants"

const ROLES = [
  "scalable web apps.",
  "reactive UIs.",
  "full-stack systems.",
  "animated experiences.",
  "API-driven products.",
]

const SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js",
  "MongoDB", "AWS S3", "Redux Toolkit", "Tailwind",
  "GSAP", "Framer Motion", "Three.js",
]

const STATS: { num: string; suffix: string; label: string }[] = [
  { num: "3", suffix: "+", label: "years exp" },
  { num: "15", suffix: "+", label: "projects shipped" },
  { num: "∞", suffix: "", label: "coffee consumed" },
]

function useTypewriter(words: string[]): string {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const word = words[wordIndex]
    const speed = deleting ? 38 : 62

    if (!deleting && charIndex >= word.length) {
      const timer = setTimeout(() => setDeleting(true), 1600)
      return () => clearTimeout(timer)
    }

    if (deleting && charIndex <= 0) {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
      setCharIndex(0)
      setText("")
      return
    }

    const timer = setTimeout(() => {
      const next = charIndex + (deleting ? -1 : 1)
      setCharIndex(next)
      setText(word.slice(0, next))
    }, speed)

    return () => clearTimeout(timer)
  }, [wordIndex, deleting, charIndex, words])

  return text
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

export function Hero() {
  const role = useTypewriter(ROLES)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950 text-zinc-50">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 10%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 10%, transparent 100%)",
        }}
      />

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 -right-20 w-[420px] h-[420px] rounded-full pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)" }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.07, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-16 w-[340px] h-[340px] rounded-full pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.07, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-32 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-24 items-center">
        <div className="flex flex-col items-start">

          {/* Availability badge */}
          <motion.div {...fadeUp(0)} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm text-xs font-mono text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for freelance &amp; contracts
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-[clamp(32px,4.5vw,58px)] font-bold leading-[1.08] tracking-[-0.03em] mb-4 text-zinc-100"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-br from-violet-300 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </motion.h1>

          {/* Accent divider */}
          <motion.div
            {...fadeUp(0.15)}
            className="w-7 h-[2px] rounded-full mb-5"
            style={{ background: "linear-gradient(90deg, #a78bfa, transparent)" }}
          />

          {/* Typewriter */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex items-center gap-2 h-8 mb-5"
          >
            <span className="text-sm sm:text-base text-zinc-500 font-light">I build</span>
            <span className="text-sm sm:text-base font-medium text-violet-400 font-mono tracking-tight">
              {role}
            </span>
            <span className="inline-block w-[2px] h-[18px] bg-violet-400 animate-pulse" />
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeUp(0.3)}
            className="max-w-[480px] text-[14px] leading-[1.75] text-zinc-500 font-normal mb-8 text-pretty"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-7">
            <a
              href="#projects"
              className="px-6 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 text-[13px] font-medium transition-all hover:bg-white hover:-translate-y-px active:translate-y-0 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-[13px] font-medium transition-all hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-zinc-200 hover:-translate-y-px active:translate-y-0"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Skill pills */}
          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-1.5 max-w-[500px]">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md border border-zinc-900 bg-zinc-900/40 text-[10.5px] font-mono text-zinc-500 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-300 cursor-default select-none"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 lg:flex lg:flex-col gap-3 w-full lg:w-auto"
        >
          {STATS.map(({ num, suffix, label }) => (
            <div
              key={label}
              className="border border-zinc-900 bg-zinc-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:min-w-[148px] flex flex-col justify-center items-center lg:items-start transition-colors hover:border-zinc-800 cursor-default"
            >
              <div className="text-2xl sm:text-[26px] font-bold text-zinc-100 tracking-[-0.04em] leading-none flex items-baseline gap-0.5">
                <span>{num}</span>
                {suffix && (
                  <span className="text-[15px] text-violet-400 ml-0.5">{suffix}</span>
                )}
              </div>
              <div className="text-[9.5px] font-mono text-zinc-500 mt-1.5 uppercase tracking-[0.18em] text-center lg:text-left">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] font-mono text-zinc-700 tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-2/5 bg-violet-400"
            animate={{ y: ["-100%", "260%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}