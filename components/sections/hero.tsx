// components/hero.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { siteConfig } from "@/lib/constants"

const marqueeText = "REACT · NEXT.JS · NODE.JS · TYPESCRIPT · GSAP · THREE.JS · FRAMER MOTION ✦ "

const textVariants = {
  hidden: { opacity: 0, y: 100, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.8 + i * 0.04,
      duration: 1.2,
      ease: [0.215, 0.61, 0.355, 1],
    } as const,
  }),
}

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 2
      const y = (clientY / innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Safely fallback to a default name if siteConfig isn't properly loaded or misses a name
  const rawName = siteConfig?.name || "Developer"
  const headline1Chars = "CREATIVE".split("")
  const headline2Chars = "DEVELOPER".split("")

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0a0a0a] text-[#f0ece3] overflow-hidden selection:bg-[#b8ff35] selection:text-[#0a0a0a] font-sans flex flex-col"
    >
      {/* Cinematic intro overlay */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute inset-0 z-50 bg-[#0a0a0a] pointer-events-none"
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 z-40 opacity-[0.04] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle Scanlines */}
      <div className="absolute inset-0 z-40 opacity-10 pointer-events-none mix-blend-overlay bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-size-[100%_4px]" />

      {/* Abstract Background fluid mesh (mouse reactive) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dark morphing base */}
        <motion.div 
          className="absolute top-[10%] left-[50%] w-[60vw] h-[60vw] rounded-full mix-blend-lighten blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(30,30,30,1) 0%, rgba(10,10,10,0) 70%)" }}
          animate={{ 
            x: mousePosition.x * -60, 
            y: mousePosition.y * -60,
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 90, 180, 0]
          }}
          transition={{ 
            x: { type: "spring", stiffness: 40, damping: 20 },
            y: { type: "spring", stiffness: 40, damping: 20 },
            scale: { duration: 15, repeat: Infinity, ease: "linear" },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
        />
        {/* Subtle acid green glow tracking cursor */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(184,255,53,0.08) 0%, rgba(10,10,10,0) 60%)" }}
          animate={{ 
            x: mousePosition.x * 120, 
            y: mousePosition.y * 120,
          }}
          transition={{ 
            type: "spring", stiffness: 30, damping: 25
          }}
        />
      </div>

      <div className="relative z-20 grow flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 w-full max-w-[1800px] mx-auto">
        
        {/* Center/Mid - Giant Name Bleeding off edges */}
        <div className="grow flex items-center w-full mt-10 md:mt-0">
            <motion.div style={{ y: y1 }} className="w-full flex flex-col justify-center">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-[#b8ff35] font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-4 md:mb-6 ml-1 md:ml-2"
              >
                Hi, I&apos;m {rawName} —
              </motion.div>

              <h1 
                className="font-black leading-[0.85] tracking-[-0.03em] uppercase w-full -ml-1 md:-ml-2 flex flex-col perspective-[1000px]"
                style={{ fontSize: "clamp(3.5rem, 11vw, 12rem)" }}
              >
                <div className="flex flex-wrap w-full">
                  {headline1Chars.map((char, i) => (
                    <motion.span
                      key={`h1-${i}`}
                      custom={i}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block transform-style-3d"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
                <div className="flex flex-wrap w-full text-[#f0ece3]/70">
                  {headline2Chars.map((char, i) => (
                    <motion.span
                      key={`h2-${i}`}
                      custom={i + headline1Chars.length}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block transform-style-3d"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
              </h1>
            </motion.div>
        </div>

        {/* Bottom elements anchors */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-12 mt-12 mb-6">
          
          {/* CTA & Tagline (Bottom Left) */}
          <div className="flex flex-col max-w-md gap-8">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.8, ease: "easeOut" }}
              className="text-lg md:text-xl leading-relaxed text-[#f0ece3]/80 font-light"
            >
              Creative full-stack developer engineering art-directed, interactive web experiences. 
              No templates. Just code and raw creative confidence.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
            >
              <a href="#contact" className="group relative inline-flex items-center gap-4 text-[#f0ece3] font-medium tracking-widest uppercase text-sm">
                <span className="relative overflow-hidden block">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">Let&apos;s Talk</span>
                  <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-[#b8ff35]">Let&apos;s Talk</span>
                </span>
                <span className="w-10 h-px bg-[#f0ece3] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-16 group-hover:bg-[#b8ff35]" />
              </a>
            </motion.div>
          </div>

          {/* Floating Metadata block (Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-2 text-left md:text-right md:items-end self-start md:self-end"
          >
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#f0ece3]/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b8ff35] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b8ff35]"></span>
              </span>
              Open to work ✦
            </div>
            <div className="text-xs tracking-widest uppercase text-[#f0ece3]/40">
              BASED IN INTERNET
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee Ticker & Border separator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="relative z-20 w-full border-t border-[#f0ece3]/10 py-3 overflow-hidden bg-[#0a0a0a]"
      >
        <motion.div 
          className="whitespace-nowrap flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          <div className="text-[11px] tracking-[0.25em] uppercase text-[#f0ece3]/30 font-light shrink-0 flex items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="mr-8">{marqueeText}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator - vertical line sliding dot */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-24 right-4 md:right-10 z-20 hidden md:flex flex-col items-center gap-6"
      >
        <div className="text-[9px] tracking-[0.3em] uppercase rotate-90 origin-bottom translate-y-[-20px] text-[#f0ece3]/40">
          Scroll
        </div>
        <div className="w-px h-16 bg-[#f0ece3]/10 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/3 bg-[#b8ff35] absolute top-0"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}