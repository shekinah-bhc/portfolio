"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, FileText } from "lucide-react"
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/lib/constants"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

  const lastY = useRef(0)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

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

  // Indicator position — runs whenever hovered or active changes
  useEffect(() => {
    const target = hovered ?? active
    if (!target || !navRef.current) {
      setIndicatorStyle((s) => ({ ...s, opacity: 0 }))
      return
    }
    const el = itemRefs.current.get(target)
    const nav = navRef.current
    if (!el) return
    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setIndicatorStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    })
  }, [hovered, active])

  return (
    <>
      {/* ── Navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5"
      >
        <motion.nav
          animate={{
            background: scrolled ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.2)",
            borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 2px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-between gap-6 rounded-2xl border px-4 py-2.5 w-full max-w-4xl"
          style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <div
              className="relative w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                boxShadow: "0 0 14px rgba(96,165,250,0.4)",
              }}
            >
              <span className="relative z-10">S</span>
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <span className="hidden min-[400px]:block text-sm font-semibold text-white tracking-tight">
              Shekinah
            </span>
          </Link>

          {/* Desktop nav items */}
          <div
            ref={navRef}
            className="hidden md:flex items-center relative"
            onMouseLeave={() => setHovered(null)}
          >

            {navItems.map((item) => {
              const isActive = active === item.name
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  ref={(el) => { if (el) itemRefs.current.set(item.name, el) }}
                  onMouseEnter={() => setHovered(item.name)}
                  onClick={() => setActive(item.name)}
                  className="relative px-4 py-2 text-[13px] font-medium rounded-lg z-10 transition-colors duration-200 select-none"
                  style={{ color: isActive || hovered === item.name ? "#fff" : "rgba(148,163,184,0.7)" }}
                >
                  {item.name}
                  {/* Active dot */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        key="dot"
                        layoutId="active-dot"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
                        style={{ background: "#60a5fa", boxShadow: "0 0 5px #60a5fa" }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium"
              style={{
                background: "rgba(96,165,250,0.1)",
                border: "1px solid rgba(96,165,250,0.22)",
                color: "#60a5fa",
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </motion.a>

            {/* Burger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
              }}
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
        </motion.nav>
      </motion.header>

      {/* ── Mobile menu — separate floating card ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[76px] left-4 right-4 z-40 rounded-2xl overflow-hidden md:hidden"
            style={{
              background: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Accent line */}
            <div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.6), rgba(167,139,250,0.6), transparent)" }}
            />

            <div className="p-3 space-y-0.5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.28, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => { setMobileOpen(false); setActive(item.name) }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150"
                    style={{
                      color: active === item.name ? "#60a5fa" : "rgba(148,163,184,0.8)",
                      background: active === item.name ? "rgba(96,165,250,0.08)" : "transparent",
                    }}
                  >
                    {item.name}
                    <motion.svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke={active === item.name ? "#60a5fa" : "rgba(148,163,184,0.3)"}
                      strokeWidth="2"
                      whileHover={{ x: 2 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </motion.div>
              ))}

              <div className="pt-2 px-1 pb-1">
                <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.05)" }} />
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: "rgba(96,165,250,0.08)",
                    border: "1px solid rgba(96,165,250,0.2)",
                    color: "#60a5fa",
                  }}
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}