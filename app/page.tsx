import { Header } from "@/components/portfolio/header"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Experience } from "@/components/portfolio/experience"
import { Projects } from "@/components/portfolio/projects"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { SocialSidebar } from "@/components/portfolio/social-sidebar"
import { ScrollProgress } from "@/components/portfolio/scroll-progress"

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
