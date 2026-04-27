"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Shekinah delivered a polished, production-ready site that exceeded our expectations.",
    author: "Client",
    role: "Project Manager",
    company: "Reborn Interactive",
    size: "md:col-span-3", // Bento grid sizing
  },
  {
    quote: "The admissions portal handled our entire intake season without a single issue.",
    author: "Admin",
    role: "Dean of Admissions",
    company: "Bishop Heber College",
    size: "md:col-span-2",
  },
];

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Creates the "spotlight" effect following the mouse
  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
      }}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative group p-8 md:p-12 rounded-[3rem] border border-white/10 bg-zinc-900/50 backdrop-blur-2xl overflow-hidden",
        t.size
      )}
    >
      {/* Interactive Spotlight Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
          ),
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <Quote className="w-6 h-6 text-primary" />
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              ))}
            </div>
          </div>
          
          <p className="text-2xl md:text-3xl leading-[1.2] text-white font-medium tracking-tight mb-12">
            {t.quote}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-white tracking-tight">{t.author}</h4>
            <p className="text-sm text-zinc-500 font-medium uppercase tracking-widest flex items-center gap-2">
              {t.role} <span className="w-4 h-px bg-zinc-800" /> <span className="text-primary">{t.company}</span>
            </p>
          </div>
          
          <motion.div 
            whileHover={{ x: 5 }}
            className="hidden md:flex p-3 rounded-full border border-white/10 text-white/50 group-hover:text-primary group-hover:border-primary/50 transition-colors"
          >
            <MoveRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Massive Background Text Effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <h2 className="text-[15vw] font-black text-white/2 leading-none uppercase">
          Feedback
        </h2>
      </div>

      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <h3 className="text-primary font-mono text-sm tracking-[0.4em] uppercase">Voices of Trust</h3>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter italic">
              What they say.
            </h2>
          </div>
          <p className="text-zinc-500 max-w-xs text-lg">
            Collaborating with brands to build digital excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}