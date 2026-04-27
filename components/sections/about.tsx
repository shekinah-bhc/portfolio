"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { TechBadge } from "./tech-badge"
import { TextReveal } from "./text-reveal"

// Added descriptions for a bit more "meat" in the UI
const skillGroups = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "PHP", "MySQL", "MongoDB"],
    gradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    name: "Tools & DevOps",
    skills: ["Git", "Vercel", "AWS S3", "Redux", "Zod"],
    gradient: "from-orange-500/10 to-red-500/10"
  }
]

export function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="relative px-6 py-32 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto max-w-6xl"
      >
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Side: Narrative */}
          <div className="lg:w-3/5 space-y-12">
            <div className="space-y-4">
              <motion.h2 
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="text-4xl font-bold tracking-tight sm:text-5xl"
              >
                <TextReveal>Crafting Digital</TextReveal>
                <span className="text-primary block">Experiences.</span>
              </motion.h2>
              <div className="h-1.5 w-20 bg-primary rounded-full" />
            </div>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="space-y-6 text-lg text-muted-foreground"
            >
              <p className="leading-relaxed">
                I’m a <span className="font-semibold text-foreground underline decoration-primary/30">Full Stack Developer</span> based in Tamil Nadu. I bridge the gap between complex backend logic and fluid, front-end motion.
              </p>
              <p>
                My philosophy is simple: **Performance shouldn't sacrifice personality.** I use Next.js 15 and GSAP to build interfaces that feel "alive" while maintaining lighthouse scores that stay in the green.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Skill Bento-ish Cards */}
          <div className="lg:w-2/5 grid gap-4">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.name}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { delay: i * 0.1 } }
                }}
                className={`p-6 rounded-2xl border border-border/50 bg-linear-to-br ${group.gradient} backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 group`}
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  {group.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div key={skill} className="transform transition-transform hover:scale-105">
                      <TechBadge tech={skill} showIcon={false} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  )
}