"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { siteConfig } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { Github, Linkedin, Mail, Send, Loader2 } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  projectType: z.enum(["Website", "Web App", "Other"], {
    required_error: "Please select a project type",
  }),
  budget: z.enum(["<₹50K", "₹50K–₹1L", "₹1L+", "Let's discuss"], {
    required_error: "Please select a budget range",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } as const,
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-[80px] sm:blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-[80px] sm:blur-[120px] -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Content Side */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 order-1 lg:order-none w-full">
            <div className="space-y-4 sm:space-y-6">
              
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Let's build <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">something great</span> together.
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Have an idea? I'm here to help you turn it into a digital reality. Reach out via the form or my socials.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="grid gap-3 sm:gap-4">
              <a 
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/20 border border-border/50 hover:border-primary/50 transition-all touch-manipulation w-full"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Me</p>
                  <p className="text-sm sm:text-base lg:text-lg font-semibold truncate">{siteConfig.email}</p>
                </div>
              </a>

              <div className="flex gap-3 sm:gap-4">
                {[
                  { icon: Github, href: siteConfig.links.github },
                  { icon: Linkedin, href: siteConfig.links.linkedin }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all touch-manipulation"
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Side - Fixed Responsive Container */}
          <motion.div 
            variants={itemVariants} 
            className="relative group order-2 lg:order-none w-full"
          >
            {/* Animated Border Gradient Glow - Now properly constrained */}
            <div className="absolute -inset-0.5 sm:-inset-1 bg-linear-to-r from-primary via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl lg:rounded-4xl blur-md sm:blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            
            {/* Form Container - Full width on mobile */}
            <div className="relative bg-background/80 backdrop-blur-xl p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-white/10 shadow-2xl w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 w-full">
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-foreground/70 text-sm sm:text-base">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="bg-secondary/30 border-none h-10 sm:h-12 rounded-lg sm:rounded-xl focus-visible:ring-primary/50 text-sm sm:text-base w-full" 
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-foreground/70 text-sm sm:text-base">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john@example.com" 
                              {...field} 
                              className="bg-secondary/30 border-none h-10 sm:h-12 rounded-lg sm:rounded-xl focus-visible:ring-primary/50 text-sm sm:text-base w-full" 
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-foreground/70 text-sm sm:text-base">Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-secondary/30 border-none h-10 sm:h-12 rounded-lg sm:rounded-xl focus:ring-primary/50 text-sm sm:text-base w-full">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-lg sm:rounded-xl">
                              <SelectItem value="Website">Website</SelectItem>
                              <SelectItem value="Web App">Web App</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-foreground/70 text-sm sm:text-base">Budget</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-secondary/30 border-none h-10 sm:h-12 rounded-lg sm:rounded-xl focus:ring-primary/50 text-sm sm:text-base w-full">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-lg sm:rounded-xl">
                              <SelectItem value="<₹50K">&lt;₹50K</SelectItem>
                              <SelectItem value="₹50K–₹1L">₹50K–₹1L</SelectItem>
                              <SelectItem value="₹1L+">₹1L+</SelectItem>
                              <SelectItem value="Let's discuss">Let's discuss</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-foreground/70 text-sm sm:text-base">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="bg-secondary/30 border-none min-h-[100px] sm:min-h-[120px] rounded-lg sm:rounded-xl focus-visible:ring-primary/50 resize-none text-sm sm:text-base w-full"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-11 sm:h-14 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg font-bold bg-linear-to-r from-primary to-blue-600 hover:opacity-90 transition-all shadow-lg shadow-primary/25 group touch-manipulation"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 sm:w-6 sm:h-6 animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}