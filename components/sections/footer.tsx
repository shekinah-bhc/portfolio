"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { siteConfig } from "@/lib/constants"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  { name: "GitHub", icon: Github, href: siteConfig.links.github },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.links.linkedin },
  { name: "Twitter", icon: Twitter, href: siteConfig.links.twitter },
  { name: "Email", icon: Mail, href: `mailto:${siteConfig.links.email}` },
]

export function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-50px" })

  return (
    <motion.footer
      ref={footerRef}
      className="px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Mobile social links */}
        <motion.div 
          className="flex justify-center gap-6 md:hidden mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label={social.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon className="h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            whileHover={{ color: "var(--primary)" }}
          >
            <motion.span
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              Designed & Built by {siteConfig.name}
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  )
}
