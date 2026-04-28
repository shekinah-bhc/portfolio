"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { getAllBlogPosts } from "@/lib/data/blog"
import { TextReveal } from "./text-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function Blog() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const posts = getAllBlogPosts()

  return (
    <section id="blog" className="px-6 py-2 bg-secondary/10">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-16 space-y-4">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            <TextReveal>Blog</TextReveal>
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-primary rounded-full"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Card className="h-full bg-background border-border hover:border-primary/20 transition-all group overflow-hidden">
                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] uppercase font-mono tracking-wider">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-6 pt-4 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            Full blog coming soon. Currently migrating my technical articles.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
