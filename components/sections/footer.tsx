"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { siteConfig } from "@/lib/constants"
import { Github, Linkedin,  Mail } from "lucide-react"

const socialLinks = [
  { name: "GitHub", icon: Github, href: siteConfig.links.github },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.links.linkedin },
  { name: "Email", icon: Mail, href: `mailto:${siteConfig.email}` },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#f0ece3]/10 py-8">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="font-mono text-[10px] md:text-xs text-[#f0ece3]/60 uppercase tracking-[0.2em] text-center md:text-left">
            Designed & Built by <span className="text-[#b8ff35] font-medium">{siteConfig.name}</span>
          </p>
          
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-[#f0ece3]/60">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b8ff35] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-[#b8ff35]"></span>
            </span>
            Copyright © {currentYear}
          </div>

        </div>
      </div>
    </footer>
  )
}

