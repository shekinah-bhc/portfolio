"use client"

import { useRef, useState, useCallback } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion"
import { Play, Pause, Maximize, ExternalLink, Lock, ArrowUpRight, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/lib/data/projects"

/* ─────────────────────────── Types ─────────────────────────── */
interface ProjectVideoShowcaseProps {
  /** Legacy single-project mode */
  videoUrl?: string
  videoUrls?: string[]
  title: string
  subtitle?: string
  /** New multi-project mode */
  projects?: Project[]
}

/* ─────────────────────── Video Player Card ──────────────────── */
function VideoCard({
  url,
  smoothProgress,
  spotlight,
}: {
  url: string
  smoothProgress: any
  spotlight: { x: number; y: number }
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsPlaying((p) => !p)
    }
  }

  const goFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    videoRef.current?.requestFullscreen?.()
  }

  const scale = useTransform(smoothProgress, [0, 0.4], [0.88, 1])
  const rotateX = useTransform(smoothProgress, [0, 0.4], [12, 0])
  const opacity = useTransform(smoothProgress, [0, 0.18, 0.88, 1], [0, 1, 1, 0])
  const borderRadius = useTransform(smoothProgress, [0, 0.4], ["3rem", "1.25rem"])

  return (
    <motion.div
      style={{ scale, rotateX, opacity, borderRadius }}
      className="relative w-full aspect-video overflow-hidden bg-black shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-white/6 group"
    >
      {/* Spotlight cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* Video */}
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ scale: useTransform(smoothProgress, [0, 1], [1.08, 1]) }}
      >
        <source src={url} type="video/mp4" />
      </motion.video>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-primary/10 mix-blend-screen blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      {/* Inner vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.7)] pointer-events-none" />

      {/* Scan line */}
      <motion.div
        animate={{ translateY: ["-100%", "200%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent pointer-events-none"
      />

      {/* Controls */}
      <div className="absolute bottom-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-200"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={goFullscreen}
          className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-200"
        >
          <Maximize className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}

/* ─────────────────────── Metadata Panel ─────────────────────── */
function MetaPanel({ project, index }: { project: Project; index: number }) {
  const isLive = project.status === "Live"
  const isPrivate = project.status === "Private"

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -28, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        {/* Index + Category */}
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60">
            {String(index + 1).padStart(2, "0")} / Project
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            {project.category ?? project.type}
          </p>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
            {project.title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
          {project.description}
        </p>

        {/* Status badges */}
        <div className="flex items-center gap-3 flex-wrap">
          {isLive && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          )}
          {isPrivate && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono uppercase tracking-widest">
              <Lock className="w-2.5 h-2.5" />
              Private
            </span>
          )}
          {project.year && (
            <span className="px-3 py-1 rounded-full border border-border text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
              {project.year}
            </span>
          )}
          {project.role && (
            <span className="px-3 py-1 rounded-full border border-border text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
              {project.role}
            </span>
          )}
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-secondary/40 border border-border/60 text-foreground/70 text-[11px] font-mono"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="px-2.5 py-1 rounded-md bg-secondary/40 border border-border/60 text-muted-foreground text-[11px] font-mono">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 pt-2">
          <Link
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            View Case Study
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border text-muted-foreground text-sm hover:border-foreground/40 hover:text-foreground transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
        </div>

        {/* Waveform bar */}
        <div className="flex items-center gap-3 text-muted-foreground/60 font-mono text-[10px] uppercase tracking-widest pt-2">
          <div className="flex gap-0.5 h-4 items-end">
            {[0.4, 0.9, 0.6, 1, 0.3, 0.7, 0.5].map((h, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [h, 1, h] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                style={{ transformOrigin: "bottom" }}
                className="w-0.5 bg-primary/50 origin-bottom"
                // height driven by h (relative)
              >
                <div style={{ height: `${h * 16}px` }} className="w-full bg-primary/50 rounded-full" />
              </motion.div>
            ))}
          </div>
          <span>Live Preview</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─────────────────────── Project Selector ───────────────────── */
function ProjectSelector({
  projects,
  activeIndex,
  onChange,
}: {
  projects: Project[]
  activeIndex: number
  onChange: (i: number) => void
}) {
  return (
    <div className="flex flex-row lg:flex-col gap-3">
      {projects.map((p, i) => {
        const active = i === activeIndex
        return (
          <button
            key={p.id}
            onClick={() => onChange(i)}
            className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-300 ${
              active
                ? "bg-foreground/5 border-foreground/20"
                : "border-transparent hover:border-border hover:bg-secondary/20"
            }`}
          >
            <span
              className={`font-mono text-[10px] tabular-nums shrink-0 transition-colors ${
                active ? "text-primary" : "text-muted-foreground/50"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-sm font-medium truncate transition-colors ${
                active ? "text-foreground" : "text-muted-foreground/70"
              }`}
            >
              {p.title}
            </span>
            {active && (
              <motion.div
                layoutId="selector-indicator"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ──────────────── Multi-video strip (single project) ────────── */
function VideoStrip({
  urls,
  smoothProgress,
  spotlight,
}: {
  urls: string[]
  smoothProgress: any
  spotlight: { x: number; y: number }
}) {
  return (
    <div className={`grid gap-6 ${urls.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
      {urls.map((url, i) => (
        <div key={i} className={i === 1 ? "sm:mt-14" : ""}>
          <VideoCard url={url} smoothProgress={smoothProgress} spotlight={spotlight} />
        </div>
      ))}
    </div>
  )
}

/* ─────────────────── Main Export Component ──────────────────── */
export function ProjectVideoShowcase({
  videoUrl,
  videoUrls,
  title,
  subtitle = "Cinematic Showcase",
  projects,
}: ProjectVideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  /* ── Multi-project mode ── */
  if (projects && projects.length > 0) {
    const active = projects[activeIndex]
    const urls =
      active.videoUrls ?? (active.videoUrl ? [active.videoUrl] : [])

    return (
      <section
        ref={containerRef}
        className="relative py-24 overflow-visible"
        onMouseMove={handleMouseMove}
        style={{ perspective: "1200px" }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-[1400px] px-6 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60">
              Selected Work
            </p>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
          </div>
        </motion.div>

        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">

            {/* Left: Project Selector (sidebar on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 lg:pt-4 order-3 lg:order-1"
            >
              <ProjectSelector
                projects={projects}
                activeIndex={activeIndex}
                onChange={setActiveIndex}
              />
            </motion.div>

            {/* Centre: Video */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 order-1 lg:order-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {urls.length > 0 ? (
                    <VideoStrip
                      urls={urls}
                      smoothProgress={smoothProgress}
                      spotlight={spotlight}
                    />
                  ) : (
                    <div className="aspect-video rounded-2xl bg-secondary/20 border border-border flex items-center justify-center">
                      <p className="text-muted-foreground font-mono text-sm">No preview available</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === activeIndex
                        ? "w-6 h-1.5 bg-foreground"
                        : "w-1.5 h-1.5 bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right: Meta */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 order-2 lg:order-3 lg:sticky lg:top-32"
            >
              <MetaPanel project={active} index={activeIndex} />
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  /* ── Legacy single-project mode ── */
  const urls = videoUrls ?? (videoUrl ? [videoUrl] : [])

  return (
    <section
      ref={containerRef}
      className="py-32 relative z-10 overflow-visible"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1200px" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 grid md:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left: Video */}
        <div className="md:col-span-9 order-2 md:order-1">
          <VideoStrip urls={urls} smoothProgress={smoothProgress} spotlight={spotlight} />
        </div>

        {/* Right: Text */}
        <div className="md:col-span-3 order-1 md:order-2 space-y-8">
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-mono text-xs uppercase tracking-[0.5em]"
            >
              {subtitle}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-foreground text-4xl md:text-5xl font-bold tracking-tight leading-tight"
            >
              {title}
            </motion.h3>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 text-muted-foreground font-mono text-[10px] uppercase tracking-widest"
          >
            <div className="flex gap-0.5 h-3 items-end">
              {[0.4, 0.7, 0.3, 0.9, 0.5].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [h, 1, h] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  style={{ height: `${h * 12}px`, transformOrigin: "bottom" }}
                  className="w-0.5 bg-primary/60 rounded-full"
                />
              ))}
            </div>
            <span>Live Experience Preview</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}