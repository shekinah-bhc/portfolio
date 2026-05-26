"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { siteConfig } from "@/lib/constants"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { Github, Linkedin, ArrowUpRight, Loader2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, SplitText)

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

const socials = [
  { label: "GitHub", icon: Github, href: siteConfig.links.github },
  { label: "LinkedIn", icon: Linkedin, href: siteConfig.links.linkedin },
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.")
        form.reset()
      } else {
        toast.error("Failed to send message.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline char reveal
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: "chars,words" })
        gsap.fromTo(split.chars,
          { opacity: 0, y: 50, rotateX: -90 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7, stagger: 0.02, ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        )
      }

      // Content stagger
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8, stagger: 0.12, ease: "expo.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#0a0a0a] text-[#f0ece3] overflow-hidden py-32 md:py-48 selection:bg-[#b8ff35] selection:text-[#0a0a0a]"
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12 flex flex-col gap-24 md:gap-32">

        {/* Section Header */}
        <div className="flex items-center gap-6 border-t border-[#f0ece3]/20 pt-6">
          <span className="text-[#b8ff35] font-mono text-sm tracking-widest">[ 04 ]</span>
          <span className="text-sm tracking-[0.3em] uppercase font-light text-[#f0ece3]/60">Get In Touch</span>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(3rem,8vw,9rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase max-w-[90%]"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          LET&apos;S <span className="text-[#b8ff35]">WORK</span><br />
          TOGETHER.
        </h2>

        {/* Two Column: Info + Form */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* Left — Info */}
          <div className="flex flex-col gap-12">
            <p className="text-lg md:text-xl font-light text-[#f0ece3]/60 leading-relaxed max-w-lg">
              Have a project in mind, or just want to say hello? Drop me a message. I&apos;m always open to discussing new opportunities, creative ideas, or ways to bring your vision to life.
            </p>

            {/* Email */}
            <a 
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-4 border-t border-[#f0ece3]/10 pt-6"
            >
              <span className="text-xs font-mono text-[#f0ece3]/30 tracking-[0.2em] uppercase">EMAIL</span>
              <span className="flex-1 text-base md:text-lg font-medium text-[#f0ece3]/80 group-hover:text-[#b8ff35] transition-colors duration-300 truncate">
                {siteConfig.email}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#f0ece3]/30 group-hover:text-[#b8ff35] transition-colors duration-300" />
            </a>

            {/* Socials */}
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3 border border-[#f0ece3]/10 hover:border-[#b8ff35]/50 transition-colors duration-300"
                >
                  <s.icon className="w-4 h-4 text-[#f0ece3]/50 group-hover:text-[#b8ff35] transition-colors duration-300" />
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#f0ece3]/50 group-hover:text-[#f0ece3] transition-colors duration-300">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 border-t border-[#f0ece3]/10 pt-6">
              <span className="text-xs font-mono text-[#f0ece3]/30 tracking-[0.2em] uppercase">BASED IN</span>
              <span className="text-sm font-light text-[#f0ece3]/60">{siteConfig.location}</span>
            </div>
          </div>

          {/* Right — Form */}
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f0ece3]/40 mb-3 block">Name</label>
                        <FormControl>
                          <input
                            {...field}
                            placeholder="Your name"
                            className="w-full bg-transparent border-b border-[#f0ece3]/20 pb-3 text-base text-[#f0ece3] placeholder:text-[#f0ece3]/20 focus:border-[#b8ff35] focus:outline-none transition-colors duration-300"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-mono text-red-400 mt-2" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f0ece3]/40 mb-3 block">Email</label>
                        <FormControl>
                          <input
                            {...field}
                            placeholder="you@example.com"
                            className="w-full bg-transparent border-b border-[#f0ece3]/20 pb-3 text-base text-[#f0ece3] placeholder:text-[#f0ece3]/20 focus:border-[#b8ff35] focus:outline-none transition-colors duration-300"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-mono text-red-400 mt-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f0ece3]/40 mb-3 block">Message</label>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={5}
                          placeholder="Tell me about your project..."
                          className="w-full bg-transparent border-b border-[#f0ece3]/20 pb-3 text-base text-[#f0ece3] placeholder:text-[#f0ece3]/20 focus:border-[#b8ff35] focus:outline-none transition-colors duration-300 resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-mono text-red-400 mt-2" />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-5 border border-[#b8ff35]/40 text-[#b8ff35] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#b8ff35] hover:text-[#0a0a0a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </Form>
          </div>
        </div>

      </div>
    </section>
  )
}