"use client"

import { motion, Variants } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"
import { siteConfig } from "@/lib/constants"

const socialLinks = [
  { name: "GitHub", icon: Github, href: siteConfig.links.github },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.links.linkedin },
  { name: "Twitter", icon: Twitter, href: siteConfig.links.twitter },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const lineVariants: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      delay: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function SocialSidebar() {
  return (
    <>
      {/* Left Sidebar - Social Links */}
      <motion.div 
        className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-6 md:flex lg:left-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label={social.name}
            variants={itemVariants}
            custom={index}
            whileHover={{ y: -4, scale: 1.1, color: "var(--primary)" }}
            whileTap={{ scale: 0.9 }}
          >
            <social.icon className="h-5 w-5" />
          </motion.a>
        ))}
        <motion.div 
          className="h-24 w-px bg-muted-foreground"
          variants={lineVariants}
        />
      </motion.div>

      {/* Right Sidebar - Email */}
      <motion.div 
        className="fixed bottom-0 right-6 z-40 hidden flex-col items-center gap-6 md:flex lg:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.a
          href={`mailto:${siteConfig.links.email}`}
          className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          style={{ writingMode: "vertical-rl" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          whileHover={{ y: -4, color: "var(--primary)" }}
        >
          {siteConfig.links.email}
        </motion.a>
        <motion.div 
          className="h-24 w-px bg-muted-foreground"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </>
  )
}
