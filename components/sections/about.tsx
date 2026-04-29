"use client"

import { useEffect, useRef } from "react"
import { TechBadge } from "./tech-badge"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

const skillGroups = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "GSAP"],
    accent: "#60a5fa",
    glowColor: "rgba(96,165,250,0.15)",
    borderGlow: "rgba(96,165,250,0.4)",
    icon: "⟨/⟩",
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "MySQL", "PHP"],
    accent: "#34d399",
    glowColor: "rgba(52,211,153,0.15)",
    borderGlow: "rgba(52,211,153,0.4)",
    icon: "⬡",
  },
  {
    name: "Tools & DevOps",
    skills: ["Git", "Vercel", "AWS S3", "Redux", "Zod"],
    accent: "#fbbf24",
    glowColor: "rgba(251,191,36,0.15)",
    borderGlow: "rgba(251,191,36,0.4)",
    icon: "⚙",
  },
]

const stats = [
  { value: "3+", label: "Years" },
  { value: "15+", label: "Tools" },
  { value: "∞", label: "Coffee" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLSpanElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const chipRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)

  // ── Particle canvas ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let raf: number
    let w = 0, h = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; pulse: number }
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.012
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148,163,184,${a})`
        ctx.fill()
      })

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(148,163,184,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  // ── GSAP ScrollTrigger animations ────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Eyebrow
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" }
      )

      // Headline SplitText char reveal
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: "chars,words" })
        tl.fromTo(split.chars,
          { opacity: 0, y: 60, rotateX: -90, filter: "blur(8px)" },
          {
            opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
            duration: 0.7, stagger: 0.025, ease: "expo.out",
          },
          "-=0.3"
        )
      }

      // Subline glitch reveal
      if (sublineRef.current) {
        tl.fromTo(sublineRef.current,
          { opacity: 0, x: -20, skewX: 8 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.7, ease: "expo.out" },
          "-=0.4"
        )
        // glitch flicker
        tl.to(sublineRef.current, {
          keyframes: [
            { opacity: 0.4, skewX: 4, duration: 0.05 },
            { opacity: 1, skewX: 0, duration: 0.05 },
            { opacity: 0.6, skewX: -2, duration: 0.04 },
            { opacity: 1, skewX: 0, duration: 0.05 },
          ],
          delay: 0.1,
        })
      }

      // Scanline sweep
      if (scanlineRef.current) {
        tl.fromTo(scanlineRef.current,
          { top: "-4px", opacity: 0.8 },
          { top: "110%", opacity: 0, duration: 1.2, ease: "none" },
          "-=1.2"
        )
      }

      // Body text
      tl.fromTo(bodyRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: "expo.out" },
        "-=0.5"
      )

      // Stats
      tl.fromTo(statsRef.current!.children,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" },
        "-=0.4"
      )

      // Chip
      tl.fromTo(chipRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" },
        "-=0.3"
      )

      // Cards staggered from right
      tl.fromTo(cardsRef.current!.children,
        { opacity: 0, x: 48, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.7, stagger: 0.13, ease: "expo.out",
        },
        "-=0.9"
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Card magnetic hover ───────────────────────────────────────────
  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -6
    const rotY = ((x - cx) / cx) * 6
    gsap.to(card, {
      rotateX: rotX, rotateY: rotY,
      transformPerspective: 800,
      duration: 0.4, ease: "power2.out",
    })
    // move inner glow to cursor
    const glow = card.querySelector<HTMLElement>(".cursor-glow")
    if (glow) {
      gsap.to(glow, { x: x - 80, y: y - 80, duration: 0.3, ease: "power2.out" })
    }
  }

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1,0.75)",
    })
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 py-32 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full -z-10 opacity-60"
      />

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient center bloom */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(96,165,250,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ── LEFT ── */}
          <div className="lg:w-3/5 space-y-8">

            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 opacity-0">
              <div className="h-px w-8 bg-blue-400" />
              <span
                className="text-[10px] tracking-[.2em] uppercase font-medium"
                style={{ color: "#60a5fa" }}
              >
                Portfolio / About
              </span>
              <div className="h-px flex-1 max-w-[40px]" style={{ background: "rgba(96,165,250,0.3)" }} />
            </div>

            {/* Headline block — scanline sweep container */}
            <div className="relative">
              {/* Scanline */}
              <div
                ref={scanlineRef}
                className="pointer-events-none absolute left-0 right-0 h-[2px] -z-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.7), transparent)",
                  top: "-4px",
                }}
              />

              <h2
                ref={headlineRef}
                className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]"
                style={{ perspective: "600px", transformStyle: "preserve-3d" }}
              >
                Crafting Digital
              </h2>

              {/* Subline with glitch */}
              <div className="relative overflow-hidden mt-1">
                <span
                  ref={sublineRef}
                  className="text-5xl sm:text-6xl font-bold tracking-tight opacity-0"
                  style={{
                    background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  Experiences.
                </span>

                {/* Glitch duplicate layers */}
                <span
                  aria-hidden
                  className="absolute inset-0 text-5xl sm:text-6xl font-bold tracking-tight select-none"
                  style={{
                    background: "linear-gradient(135deg, #f472b6, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0,
                    animation: "glitch-r 4s infinite 2.5s",
                    clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
                  }}
                >
                  Experiences.
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 text-5xl sm:text-6xl font-bold tracking-tight select-none"
                  style={{
                    background: "linear-gradient(135deg, #34d399, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0,
                    animation: "glitch-l 4s infinite 2.7s",
                    clipPath: "polygon(0 60%, 100% 60%, 100% 75%, 0 75%)",
                  }}
                >
                  Experiences.
                </span>
              </div>

              {/* Animated underline */}
              <div className="mt-4 h-[1.5px] w-full max-w-xs relative overflow-hidden rounded-full" style={{ background: "rgba(96,165,250,0.15)" }}>
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: "40%",
                    background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                    animation: "shimmer-bar 2.5s ease-in-out infinite",
                  }}
                />
              </div>
            </div>

            {/* Body */}
            <div
              ref={bodyRef}
              className="opacity-0 space-y-4 text-[15px] leading-relaxed text-muted-foreground max-w-lg"
            >
              <p>
                Full Stack Developer based in Tamil Nadu — bridging complex backend logic with fluid, purposeful front-end motion.
              </p>
              <p>
                Performance shouldn&apos;t sacrifice personality. Interfaces built with Next.js 15 and GSAP that feel{" "}
                <em className="text-foreground not-italic font-medium">alive</em> while Lighthouse stays in the green.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="opacity-0 group relative p-4 rounded-xl cursor-default overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(148,163,184,0.1)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at 50% 50%, rgba(96,165,250,0.08), transparent 70%)" }}
                  />
                  <div
                    className="text-2xl font-bold transition-colors duration-300"
                    style={{ color: "#60a5fa" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 tracking-widest uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability chip */}
            <div ref={chipRef} className="opacity-0">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(52,211,153,0.07)",
                  border: "1px solid rgba(52,211,153,0.25)",
                  color: "#34d399",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "#34d399" }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#34d399" }} />
                </span>
                Available for projects
              </div>
            </div>
          </div>

          {/* ── RIGHT: Skill cards ── */}
          <div ref={cardsRef} className="lg:w-2/5 flex flex-col gap-4">

            {skillGroups.map((group) => (
              <div
                key={group.name}
                className="group relative rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(148,163,184,0.1)`,
                  backdropFilter: "blur(16px)",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  transition: "border-color 0.3s",
                }}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = group.borderGlow
                }}
              >
                {/* Cursor-tracking glow */}
                <div
                  className="cursor-glow pointer-events-none absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${group.glowColor}, transparent 70%)`,
                    transform: "translate(0px, 0px)",
                  }}
                />

                {/* Top edge accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${group.accent}, transparent)` }}
                />

                <div className="relative p-5 z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{
                          background: `${group.glowColor}`,
                          border: `1px solid ${group.borderGlow}`,
                          color: group.accent,
                        }}
                      >
                        {group.icon}
                      </div>
                      <span
                        className="text-[11px] font-semibold tracking-[.14em] uppercase"
                        style={{ color: group.accent }}
                      >
                        {group.name}
                      </span>
                    </div>
                    {/* Mini bar */}
                    <div className="flex gap-1 items-center">
                      {[1, 0.6, 0.3].map((op, i) => (
                        <div
                          key={i}
                          className="h-[3px] w-4 rounded-full"
                          style={{ background: group.accent, opacity: op }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="mb-4 h-px"
                    style={{ background: `linear-gradient(90deg, ${group.borderGlow}, transparent)` }}
                  />

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill}
                        className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                      >
                        <TechBadge tech={skill} showIcon={false} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Glitch + shimmer keyframes */}
      <style>{`
        @keyframes glitch-r {
          0%,92%,100% { opacity:0; transform:translateX(0); }
          93% { opacity:0.6; transform:translateX(4px); }
          95% { opacity:0; transform:translateX(-2px); }
          97% { opacity:0.4; transform:translateX(2px); }
        }
        @keyframes glitch-l {
          0%,92%,100% { opacity:0; transform:translateX(0); }
          93% { opacity:0.5; transform:translateX(-4px); }
          95% { opacity:0; transform:translateX(2px); }
          97% { opacity:0.3; transform:translateX(-2px); }
        }
        @keyframes shimmer-bar {
          0% { transform:translateX(-100%); opacity:0.6; }
          50% { opacity:1; }
          100% { transform:translateX(350%); opacity:0.6; }
        }
      `}</style>
    </section>
  )
}