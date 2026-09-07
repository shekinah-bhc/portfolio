"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

const skillGroups = [
  {
    name: "MERN STACK",
    skills: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    name: "FRONTEND",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Redux", "Vite"],
  },
  {
    name: "BACKEND",
    skills: ["PHP", "REST APIs", "Python", "Django", "Flask"],
  },
  {
    name: "DATABASE",
    skills: ["MongoDB", "MySQL", "SQL"],
  },
  {
    name: "CLOUD & DEPLOYMENT",
    skills: ["AWS", "Vercel", "Git", "Deployment"],
  },
  {
    name: "INTEGRATIONS",
    skills: ["Payment Gateways", "API Integration", "AWS S3"],
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
              trigger: manifestoRef.current,
              start: "top 85%",
              end: "bottom 40%",
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
      className="relative w-full bg-[#0a0a0a] text-[#f0ece3] overflow-hidden py-20 md:py-48 selection:bg-[#b8ff35] selection:text-[#0a0a0a]"
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12 flex flex-col gap-16 md:gap-40">
        
        {/* Top Header / The Manifesto */}
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex items-center gap-6 border-t border-[#f0ece3]/20 pt-6">
            <span className="text-[#b8ff35] font-mono text-sm tracking-widest">[ 01 ]</span>
            <span className="text-sm tracking-[0.3em] uppercase font-light text-[#f0ece3]/60">About</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-2 hidden md:block" />
            <div className="md:col-span-10">
              <h2 
                ref={manifestoRef}
                className="text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.15] tracking-tight uppercase"
                
              >
              I’m a software developer focused on building modern web applications, dashboards, and backend systems. I work across the stack to turn complex requirements into reliable and maintainable software.

              </h2>
            </div>
          </div>
        </div>

        {/* 1px Grid Bento / The Arsenal */}
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex items-center gap-6 border-t border-[#f0ece3]/20 pt-6">
            <span className="text-[#b8ff35] font-mono text-sm tracking-widest">[ 02 ]</span>
            <span className="text-sm tracking-[0.3em] uppercase font-light text-[#f0ece3]/60">Technologies</span>
          </div>

          <div ref={gridRef} className="flex flex-col border-t border-[#f0ece3]/10">
            {skillGroups.map((group, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 border-b border-[#f0ece3]/10 bg-[#0a0a0a] hover:bg-[#111] transition-all duration-500 overflow-hidden"
              >
                {/* Left Accent Bar on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#b8ff35] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(184,255,53,0.05),transparent)] -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <div className="flex items-center gap-6 md:w-1/3 shrink-0 relative z-10 pl-2 md:pl-0">
                  <span className="text-[#f0ece3]/10 font-mono text-sm group-hover:text-[#b8ff35]/50 transition-colors duration-500 hidden sm:block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-[#f0ece3]/40 group-hover:text-[#f0ece3] transition-colors duration-500">
                    {group.name}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2 relative z-10 justify-start md:justify-end flex-1 pl-2 md:pl-0">
                  {group.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-4 py-2 border border-[#f0ece3]/10 text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#f0ece3]/50 group-hover:border-[#b8ff35]/40 group-hover:text-[#b8ff35] group-hover:bg-[#b8ff35]/5 transition-all duration-300 bg-[#0a0a0a] shadow-[0_0_0_0_rgba(184,255,53,0)] group-hover:shadow-[0_0_15px_0_rgba(184,255,53,0.1)]"
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