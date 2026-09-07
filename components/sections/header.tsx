"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ArrowUpRight, ArrowDown } from "lucide-react"
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"
import { siteConfig } from "@/lib/constants"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const lastY = useRef(0)
  const navRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40)
    setVisible(y < lastY.current || y < 80)
    lastY.current = y
  })

  // Active section via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const match = navItems.find((n) => n.href === `#${e.target.id}`)
            if (match) setActive(match.name)
          }
        })
      },
      { threshold: 0.45 }
    )
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ── Navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pt-4"
      >
        <nav
          className="flex items-center justify-between w-full max-w-[1600px] py-4"
        >
          {/* Logo — stark monogram */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 border border-[#f0ece3]/20 flex items-center justify-center font-black text-sm text-[#b8ff35] tracking-tighter group-hover:border-[#b8ff35] group-hover:bg-[#b8ff35] group-hover:text-[#0a0a0a] transition-all duration-300">
              S
            </div>
            <span className="hidden min-[400px]:block text-sm font-mono uppercase tracking-[0.15em] text-[#f0ece3]/70 group-hover:text-[#f0ece3] transition-colors duration-300">
              Shekinah
            </span>
          </Link>

          {/* Desktop nav items */}
          <div
            ref={navRef}
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHovered(null)}
          >
            {navItems.map((item, i) => {
              const isActive = active === item.name
              const isHovered = hovered === item.name
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.name)}
                  onClick={() => setActive(item.name)}
                  className="relative px-5 py-2 text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300 select-none"
                  style={{
                    color: isActive
                      ? "#b8ff35"
                      : isHovered
                        ? "#f0ece3"
                        : "rgba(240,236,227,0.4)",
                  }}
                >
                  {item.name}
                  {/* Active underline */}
                  <motion.div
                    className="absolute bottom-0 left-2 right-2 h-px"
                    style={{ background: "#b8ff35" }}
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  />
                </Link>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <motion.a
              href="/assets/resume/resume.pdf"
              target="_blank"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] border border-[#b8ff35]/40 text-[#b8ff35] hover:bg-[#b8ff35] hover:text-[#0a0a0a] transition-colors duration-300"
            >
              Résumé
            </motion.a>

            {/* Burger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 border border-[#f0ece3]/20 flex items-center justify-center text-[#f0ece3]/60 hover:border-[#b8ff35] hover:text-[#b8ff35] transition-colors duration-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-[#0a0a0a]/90 md:hidden"
              style={{ backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="mobile"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-50 bg-[#0a0a0a] border-l border-[#f0ece3]/10 md:hidden flex flex-col"
            >
              {/* Close */}
              <div className="flex justify-end p-6">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 border border-[#f0ece3]/20 flex items-center justify-center text-[#f0ece3]/60 hover:border-[#b8ff35] hover:text-[#b8ff35] transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-8 gap-2 flex-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => { setMobileOpen(false); setActive(item.name) }}
                      className="group flex items-center justify-between py-5 border-b border-[#f0ece3]/10 transition-colors duration-300"
                    >
                      <span
                        className="text-2xl font-bold uppercase tracking-tight transition-colors duration-300"
                        style={{ color: active === item.name ? "#b8ff35" : "#f0ece3" }}
                      >
                        {item.name}
                      </span>
                      <span className="text-xs font-mono text-[#f0ece3]/20 group-hover:text-[#b8ff35] transition-colors duration-300">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="p-8 border-t border-[#f0ece3]/10">
                <motion.a
                  href="/assets/resume/resume.pdf"
                  target="_blank"
                  download
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 w-full py-4 text-xs font-mono uppercase tracking-[0.2em] border border-[#b8ff35]/40 text-[#b8ff35] hover:bg-[#b8ff35] hover:text-[#0a0a0a] transition-colors duration-300"
                >
                  Résumé
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}