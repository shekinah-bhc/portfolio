
"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { getProjectBySlug } from "@/lib/data/projects"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Globe, Code2, Database, Layout, Zap, ArrowRight, Mail } from "lucide-react"
import { TechBadge } from "@/components/sections/tech-badge"
import { motion } from "framer-motion"
import { ProjectVideoShowcase } from "@/components/sections/project-video-showcase"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

const easeCustom: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.06, ease: easeCustom },
  }),
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params)
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const hasLive = !!project.liveUrl

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0ece3] relative overflow-x-hidden selection:bg-[#b8ff35] selection:text-[#0a0a0a]">
      
      {/* ── BACKGROUND EFFECTS ─────────────────────────────────── */}
      {/* Global Noise Overlap */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#b8ff35]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ── NAVIGATION ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeCustom }}
        className="fixed top-6 left-6 z-50 md:left-12"
      >
        <Link
          href="/#projects"
          className="group flex items-center gap-3 px-5 py-2.5 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#f0ece3]/10 text-[#f0ece3]/80 hover:bg-[#b8ff35] hover:text-[#0a0a0a] hover:border-[#b8ff35] transition-all duration-400 font-mono text-[11px] uppercase tracking-widest shadow-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Canvas
        </Link>
      </motion.div>

      {/* ── HERO SECTION ──────────────────────────────────────── */}
      <section className="relative z-10 pt-36 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        
        {/* Meta Row */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center gap-4 mb-8 border-t border-[#f0ece3]/10 pt-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#b8ff35] font-semibold">
            // {project.year ?? "2024"}
          </span>
          <span className="font-mono text-[10px] text-[#f0ece3]/20">•</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f0ece3]/60">{project.type}</span>
          {project.category && (
            <>
              <span className="font-mono text-[10px] text-[#f0ece3]/20">•</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f0ece3]/60">{project.category}</span>
            </>
          )}
          {project.status === "Live" && (
            <span className="ml-auto flex items-center gap-2 border border-[#b8ff35]/30 bg-[#b8ff35]/5 text-[#b8ff35] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8ff35] animate-ping" />
              Live Deploy
            </span>
          )}
        </motion.div>

        {/* Title Block with Reveal Effect */}
        <div className="overflow-hidden mb-10">
          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(2.75rem,7.5vw,7.5rem)] font-black uppercase leading-[0.9] tracking-tighter"
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Description & Dynamic CTAs */}
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="lg:col-span-7 text-xl md:text-2xl text-[#f0ece3]/70 font-light leading-relaxed tracking-wide balance"
          >
            {project.description}
          </motion.p>

          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end"
          >
            {hasLive ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#b8ff35] text-[#0a0a0a] px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#caff5c] transition-all duration-300 shadow-[0_0_30px_rgba(184,255,53,0.15)] hover:shadow-[0_0_35px_rgba(184,255,53,0.3)] hover:-translate-y-0.5"
              >
                <Globe className="w-4 h-4" />
                Launch Production
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            ) : (
              <a
                href="/#contact"
                className="group flex items-center gap-3 bg-[#b8ff35] text-[#0a0a0a] px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#caff5c] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Request Technical Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            )}
            <Link
              href="/#projects"
              className="flex items-center gap-3 bg-transparent border border-[#f0ece3]/20 text-[#f0ece3]/80 px-8 py-4 font-mono text-xs uppercase tracking-widest hover:border-[#f0ece3] hover:text-[#f0ece3] transition-all duration-300"
            >
              Archived Index
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SHOWCASE VIDEO SECTION ───────────────────────────── */}
      {(project.videoUrl || (project.videoUrls && project.videoUrls.length > 0)) && (
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="relative z-10 w-full border-y border-[#f0ece3]/10 overflow-hidden bg-[#0e0e0e]"
        >
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10 pointer-events-none opacity-60 h-12" />
          <ProjectVideoShowcase
            videoUrl={project.videoUrl}
            videoUrls={project.videoUrls}
            title={project.title}
            subtitle={project.type}
          />
        </motion.div>
      )}

      {/* ── TECHNICAL MATRIX & BREAKDOWN ─────────────────────── */}
      <section className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto py-28">
        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">

          {/* Core Content Column */}
          <div className="lg:col-span-8 space-y-24">

            {/* Engineering Scope Grid */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-[#b8ff35] font-mono text-xs uppercase tracking-[0.3em] font-semibold">// Architectural Scope</span>
                <div className="flex-1 h-px bg-linear-to-r from-[#f0ece3]/10 to-transparent" />
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Layout, label: "Interface & UX", text: project.whatIDid.design },
                  { icon: Code2, label: "Frontend Layer", text: project.whatIDid.frontend },
                  { icon: Database, label: "Systems & State", text: project.whatIDid.backend },
                ].map(({ icon: Icon, label, text }) => (
                  <div 
                    key={label} 
                    className="bg-[#0e0e0e]/60 backdrop-blur-sm border border-[#f0ece3]/10 p-8 space-y-4 group hover:bg-[#111111] hover:border-[#b8ff35]/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f0ece3]/5 group-hover:bg-[#b8ff35]/10 group-hover:text-[#b8ff35] transition-colors duration-300">
                        <Icon className="w-4 h-4 text-[#b8ff35]/80 group-hover:text-[#b8ff35]" />
                      </div>
                      <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#f0ece3]/40 group-hover:text-[#f0ece3]/90 transition-colors duration-300">{label}</h3>
                    </div>
                    <p className="text-[#f0ece3]/60 group-hover:text-[#f0ece3]/80 transition-colors duration-300 text-[13px] font-light leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Highlights */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-[#b8ff35] font-mono text-xs uppercase tracking-[0.3em] font-semibold">// Key Engineering Breakthroughs</span>
                <div className="flex-1 h-px bg-linear-to-r from-[#f0ece3]/10 to-transparent" />
              </div>
              
              <div className="grid gap-4">
                {project.highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-6 border border-[#f0ece3]/10 bg-[#0e0e0e]/30 p-6 group hover:border-[#b8ff35]/20 hover:bg-[#b8ff35]/1 transition-all duration-300"
                  >
                    <span className="font-mono text-[10px] text-[#b8ff35] tracking-widest shrink-0 border border-[#b8ff35]/20 bg-[#b8ff35]/5 px-2.5 py-1 mt-0.5">
                      SYSTEM_{String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1">
                      <Zap className="w-4 h-4 text-[#f0ece3]/20 group-hover:text-[#b8ff35] group-hover:scale-110 transition-all duration-300 shrink-0" />
                    </div>
                    <p className="text-[#f0ece3]/70 group-hover:text-[#f0ece3]/90 transition-colors duration-300 font-light text-sm leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sticky Sidebar Meta Matrix */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-10">

              {/* Specs Table */}
              <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="bg-[#0e0e0e]/40 border border-[#f0ece3]/10 backdrop-blur-sm divide-y divide-[#f0ece3]/10">
                  {[
                    { label: "Role Assignment", value: project.role ?? "Full-Stack Engineer" },
                    { label: "Deployment Type", value: project.type },
                    { label: "Build Status", value: project.status },
                    ...(project.client ? [{ label: "Client Partner", value: project.client }] : []),
                    { label: "Timeline Reference", value: project.year ?? "2024" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-6 py-[18px] group hover:bg-[#f0ece3]/5 transition-colors duration-300">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#f0ece3]/40 group-hover:text-[#f0ece3]/60 transition-colors duration-300">{label}</span>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#f0ece3]/90 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Technologies Framework Infrastructure */}
              <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#b8ff35] mb-5 font-semibold">// Engine & Modules</p>
                <div className="flex flex-wrap gap-2.5">
                  {project.stack.map((tech) => (
                    <TechBadge key={tech} tech={tech} className="border border-[#f0ece3]/10 hover:border-[#b8ff35]/40 hover:bg-[#b8ff35]/5 transition-all duration-300" />
                  ))}
                </div>
              </motion.div>

      

            </div>
          </div>
        </div>
      </section>


    </main>
  )
}

