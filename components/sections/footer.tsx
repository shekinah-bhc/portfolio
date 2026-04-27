"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { siteConfig } from "@/lib/constants"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  { name: "GitHub", icon: Github, href: siteConfig.links.github },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.links.linkedin },
  { name: "Twitter", icon: Twitter, href: siteConfig.links.twitter },
  { name: "Email", icon: Mail, href: `mailto:${siteConfig.email}` },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-6 py-12 border-t border-border/50">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <p className="font-mono text-sm text-muted-foreground">
              Designed & Built by <span className="text-foreground font-medium">{siteConfig.name}</span>
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for Freelance • {currentYear}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={siteConfig.links.github} 
              target="_blank" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href={siteConfig.links.linkedin} 
              target="_blank" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

