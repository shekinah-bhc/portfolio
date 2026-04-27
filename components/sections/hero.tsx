"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { siteConfig } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { CharacterReveal } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"
import { ArrowDown, Mail } from "lucide-react"

const roles = ["Full Stack Developer", "React Developer", "Next.js Developer", "UI Engineer"]

const logos = [
  {
    name: "Vercel",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
  },
  {
    name: "Nextjs",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881475/nextjs_logo_dark_gfkf8m.svg",
  },
  {
    name: "Prime",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg",
  },
  {
    name: "Trustpilot",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tkfspxqmjflfllbuqxsi.svg",
  },
  {
    name: "Webflow",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg",
  },
  {
    name: "Airbnb",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg",
  },
  {
    name: "Tina",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/afqhiygywyphuou6xtxc.svg",
  },
  {
    name: "Stackoverflow",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/ts1j4mkooxqmscgptafa.svg",
  },
  {
    name: "mistral",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg",
  },
]

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage: "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex shrink-0 animate-x-slider flex-row justify-around gap-6">
                {logos.map((logo, key) => (
                  <img
                    key={key}
                    src={logo.url}
                    className="h-10 w-28 px-2 flex-none brightness-0 dark:invert"
                    alt={logo.name}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const ref = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,#fff,#b49de0_40%,#A46EDB_88%)] dark:bg-[linear-gradient(to_bottom,#000,#200D42_40%,#4F21A1_74%,#A46EDB_88%_50%)]"
    >
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-full -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)]"
      />
      
      {/* Grid Borders */}
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-border dark:border-white/10">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x border-border dark:border-white/10" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>

      <motion.figure 
        style={{ y: backgroundY, opacity }}
        className="bg-primary/20 pointer-events-none absolute bottom-[-70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[200px]" 
      />
      
      <motion.div 
        style={{ y: contentY, opacity, scale }}
        className="relative z-10 flex flex-col divide-y divide-border dark:divide-white/10 pt-[100px]"
      >
        <div className="flex flex-col items-center justify-end pb-8">
          <div className="flex items-center gap-2 px-4 py-2 border border-border dark:border-white/10 bg-background/50 backdrop-blur-sm rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-sm font-medium text-muted-foreground">Available for Freelance</p>
          </div>
        </div>

        <div>
          <div className="mx-auto flex flex-col items-center justify-center gap-6 px-6 py-12 sm:px-10 lg:px-24 text-center">
            <h1 className="text-pretty text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-none">
              <CharacterReveal delay={0.8}>{siteConfig.name}</CharacterReveal>
            </h1>
            
            <div className="h-12 sm:h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-2xl font-semibold sm:text-4xl lg:text-5xl text-muted-foreground"
                >
                  {roles[roleIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground/80 text-balance">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <MagneticButton>
                <Button asChild size="lg" className="rounded-full px-8 h-14 text-base shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                  <a href="#projects">View My Work</a>
                </Button>
              </MagneticButton>
              
              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base bg-background/50 backdrop-blur-md border-border hover:bg-accent/50 group">
                  <a href="#contact" className="flex items-center gap-2">
                    Get In Touch
                    <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl overflow-hidden">
          <AnimatedLogoCloud />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
