"use client";

import { StickyScroll, type ContentItem } from "../ui/sticky-scroll-reveal";

const content: ContentItem[] = [
  {
    title: "Senior Full Stack Engineer",
    description:
      "Architected and scaled modern web applications using Next.js and Node.js. Led a team of developers to deliver high-performance, accessible, and deeply interactive digital experiences.",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center font-mono text-xl font-bold text-[#b8ff35] border border-[#b8ff35]/30">
        01
      </div>
    ),
    content: (
      <div className="flex h-full w-full flex-col justify-center p-12 bg-[#0a0a0a] border border-[#f0ece3]/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(184,255,53,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#b8ff35] mb-4">2022 — Present</div>
          <div className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight text-[#f0ece3]">Tech Lead</div>
          <div className="text-sm font-mono text-[#f0ece3]/50">Next.js / Node.js / AWS</div>
        </div>
      </div>
    ),
  },
  {
    title: "Frontend Developer",
    description:
      "Crafted award-winning user interfaces. Focused on micro-interactions, WebGL integrations, and maintaining strict performance budgets while pushing creative boundaries.",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center font-mono text-xl font-bold text-[#b8ff35] border border-[#b8ff35]/30">
        02
      </div>
    ),
    content: (
      <div className="flex h-full w-full flex-col justify-center p-12 bg-[#0a0a0a] border border-[#f0ece3]/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(184,255,53,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#b8ff35] mb-4">2020 — 2022</div>
          <div className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight text-[#f0ece3]">UI / UX</div>
          <div className="text-sm font-mono text-[#f0ece3]/50">React / GSAP / Three.js</div>
        </div>
      </div>
    ),
  },
  {
    title: "Backend Specialist",
    description:
      "Designed robust APIs and database architectures. Ensured high availability, implemented caching layers, and optimized complex queries for massive datasets.",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center font-mono text-xl font-bold text-[#b8ff35] border border-[#b8ff35]/30">
        03
      </div>
    ),
    content: (
      <div className="flex h-full w-full flex-col justify-center p-12 bg-[#0a0a0a] border border-[#f0ece3]/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(184,255,53,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#b8ff35] mb-4">2018 — 2020</div>
          <div className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight text-[#f0ece3]">Systems</div>
          <div className="text-sm font-mono text-[#f0ece3]/50">MongoDB / Express / Redis</div>
        </div>
      </div>
    ),
  },
  {
    title: "Freelance Engineer",
    description:
      "Delivered end-to-end solutions for diverse global clients. Managed client communication, project scoping, and full-stack implementation from zero to production.",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center font-mono text-xl font-bold text-[#b8ff35] border border-[#b8ff35]/30">
        04
      </div>
    ),
    content: (
      <div className="flex h-full w-full flex-col justify-center p-12 bg-[#0a0a0a] border border-[#f0ece3]/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(184,255,53,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#b8ff35] mb-4">2016 — 2018</div>
          <div className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight text-[#f0ece3]">Independent</div>
          <div className="text-sm font-mono text-[#f0ece3]/50">Full Stack / Consulting</div>
        </div>
      </div>
    ),
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative w-full bg-[#0a0a0a] text-[#f0ece3] overflow-hidden py-32 md:py-48 selection:bg-[#b8ff35] selection:text-[#0a0a0a]">
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex items-center gap-6 border-t border-[#f0ece3]/20 pt-6 mb-12">
          <span className="text-[#b8ff35] font-mono text-sm tracking-widest">[ 03 ]</span>
          <span className="text-sm tracking-[0.3em] uppercase font-light text-[#f0ece3]/60">The Journey</span>
        </div>

        <div className="text-left mb-16 max-w-2xl">
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.95] tracking-tight uppercase mb-6">
            Experience <br />
            <span className="text-[#b8ff35]">Timeline.</span>
          </h2>
          <p className="text-lg text-[#f0ece3]/60 font-light leading-relaxed">
            A track record of building robust, scalable, and beautifully designed digital products across different tech stacks and industries.
          </p>
        </div>
        
        {/* We keep the original StickyScroll component untouched to preserve the animation logic,
            but pass in our brutally styled content array. */}
        <div className="relative -mx-6 md:-mx-12">
          <StickyScroll content={content} contentClassName="!bg-transparent !border-none !shadow-none" />
        </div>
      </div>
    </section>
  );
}