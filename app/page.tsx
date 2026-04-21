import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { SocialSidebar } from "@/components/sections/social-sidebar"
import { ScrollProgress } from "@/components/sections/scroll-progress"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ScrollProgress />
      <Header />
      <SocialSidebar />
      
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
