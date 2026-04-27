"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Terminal, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "2024 — Present",
    type: "Work",
    description: [
      "Built production web applications for institutional and private clients using Next.js 15, TypeScript, and high-end animations.",
      "Developed high-performance agency websites and complex full-stack portals from scratch.",
      "Implemented GSAP-powered scroll sequences and Three.js visual elements for luxury aesthetics.",
    ],
    skills: ["Next.js 15", "TypeScript", "GSAP", "Three.js", "Resend", "AWS S3"],
  },
  {
    title: "MCA (Master of Computer Applications)",
    company: "Bishop Heber College",
    period: "2022 — 2024",
    type: "Education",
    description: [
      "Specialized in advanced web technologies and software engineering principles.",
      "Graduated with honors, focusing on building scalable full-stack applications.",
      "Participated in various technical symposiums and development workshops.",
    ],
    skills: ["Full Stack", "Software Architecture", "Distributed Systems"],
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll-linked animation for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="px-6 py-32 bg-black relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest uppercase"
          >
         
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter"
          >
            Experience
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 md:-translate-x-1/2">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-linear-to-b from-primary via-indigo-500 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
            />
          </div>

          <div className="space-y-20">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center group"
              >
                {/* Timeline Node Icon */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 translate-x-[-19px] md:-translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-primary transition-colors duration-500 shadow-xl">
                    {exp.type === "Work" ? (
                      <Briefcase size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
                    ) : (
                      <GraduationCap size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className={cn(
                  "w-full md:w-[45%] mt-16 md:mt-0 ml-8 md:ml-0",
                  index % 2 === 0 ? "md:text-right md:pr-12" : "md:ml-auto md:pl-12"
                )}>
                  {/* Fake Terminal Header for the card */}
                  <div className={cn(
                    "flex gap-1.5 mb-4",
                    index % 2 === 0 ? "md:justify-end" : "justify-start"
                  )}>
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white pt-2">
                      {exp.title}
                    </h3>
                    <p className="text-zinc-400 font-medium text-lg italic">
                      {exp.company}
                    </p>
                  </div>

                  <ul className={cn(
                    "mt-6 space-y-4 text-zinc-500",
                    index % 2 === 0 ? "md:items-end" : "items-start"
                  )}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className={cn(
                    "flex flex-wrap gap-2 mt-8",
                    index % 2 === 0 ? "md:justify-end" : "justify-start"
                  )}>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-tighter rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary/50 hover:text-primary transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}