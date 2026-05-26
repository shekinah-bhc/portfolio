"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

const skillGroups = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP", "Three.js"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "MySQL", "APIs"],
  },
  {
    name: "System",
    skills: ["Git", "AWS", "Vercel", "Docker", "Redux"],
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const manifestoRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Manifesto text color fill reveal
      if (manifestoRef.current) {
        const split = new SplitText(manifestoRef.current, { type: "words,chars" })
        gsap.fromTo(split.words,
          { color: "rgba(240, 236, 227, 0.15)" }, // Faded off-white
          {
            color: "rgba(240, 236, 227, 1)", // Solid off-white
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            }
          }
        )
      }

      // 1px Grid Bento items reveal
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#0a0a0a] text-[#f0ece3] overflow-hidden py-32 md:py-48 selection:bg-[#b8ff35] selection:text-[#0a0a0a]"
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12 flex flex-col gap-24 md:gap-40">
        
        {/* Top Header / The Manifesto */}
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-6 border-t border-[#f0ece3]/20 pt-6">
            <span className="text-[#b8ff35] font-mono text-sm tracking-widest">[ 01 ]</span>
            <span className="text-sm tracking-[0.3em] uppercase font-light text-[#f0ece3]/60">The Manifesto</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-2 hidden md:block" />
            <div className="md:col-span-10">
              <h2 
                ref={manifestoRef}
                className="text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.15] tracking-tight uppercase"
              >
                I engineer digital ecosystems. By bridging aggressive backend logic with fluid, intentional front-end motion, I create interfaces that don&apos;t just exist—they <span className="italic font-serif text-[#b8ff35] lowercase tracking-normal">perform</span>. Performance shouldn&apos;t sacrifice personality.
              </h2>
            </div>
          </div>
        </div>

        {/* 1px Grid Bento / The Arsenal */}
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-6 border-t border-[#f0ece3]/20 pt-6">
            <span className="text-[#b8ff35] font-mono text-sm tracking-widest">[ 02 ]</span>
            <span className="text-sm tracking-[0.3em] uppercase font-light text-[#f0ece3]/60">The Arsenal</span>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#f0ece3]/10 border border-[#f0ece3]/10">
            {skillGroups.map((group, i) => (
              <div 
                key={i} 
                className="group relative bg-[#0a0a0a] p-10 md:p-14 flex flex-col gap-24 overflow-hidden transition-colors duration-700 hover:bg-[#111]"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(184,255,53,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-[#f0ece3]/30 group-hover:text-[#b8ff35] transition-colors duration-500">
                  {group.name}
                </h3>
                
                <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                  {group.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-4 py-2 border border-[#f0ece3]/15 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#f0ece3]/60 group-hover:border-[#b8ff35]/40 group-hover:text-[#f0ece3] transition-colors duration-300 bg-[#0a0a0a]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}