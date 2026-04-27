"use client"

import { motion } from "framer-motion"

export function CurrentlyBuilding() {
  return (
    <section className="py-12 border-y border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-center gap-4 text-sm sm:text-base md:text-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 font-mono"
          >
            <span className="text-muted-foreground">Currently building</span>
            <span className="text-primary">→</span>
            <span className="text-foreground font-semibold">A developer portfolio with a built-in AI chatbot</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
