export interface Project {
  id: string
  slug: string
  title: string
  type: string
  category?: string
  status: 'Live' | 'Seasonal' | 'Private'
  year?: string
  role?: string
  liveUrl?: string
  githubUrl?: string
  client?: string
  stack: string[]
  description: string
  whatIDid: {
    design: string
    frontend: string
    backend: string
  }
  highlights: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  videoUrl?: string
  videoUrls?: string[]
}

export const projects: Project[] = [
  {
    id: "reborn-interactive",
    slug: "reborn-interactive",
    title: "Reborn Interactive",
    type: "Client Work",
    category: "Creative Agency Website",
    status: "Live",
    year: "2024",
    role: "Full-Stack Engineer",
    liveUrl: "https://reborninteractive.in",
    stack: ["Next.js 15", "TypeScript", "GSAP", "ScrollTrigger", "Three.js", "i18n", "feature-sliced architecture"],
    description: "Production website built from scratch for a creative agency. Multi-language, GPU-accelerated animations, custom Three.js visuals.",
    whatIDid: {
      design: "Custom animation system, editorial typography, dark luxury aesthetic",
      frontend: "GSAP/ScrollTrigger scroll sequences, Three.js scenes, i18n route groups",
      backend: "Next.js 15 App Router, performance-optimized, Feature-sliced structure",
    },
    highlights: [
      "GPU-accelerated animations",
      "Multi-language support (i18n)",
      "Performance-optimized architecture"
    ],
    testimonial: {
      quote: "Shekinah delivered a polished, production-ready site that exceeded our expectations.",
      author: "Client",
      role: "Reborn Interactive"
    },
    videoUrls: ["/assets/video/about.mp4", "/assets/video/dashboard_globe.mp4"]
  },

  {
    id: "alumni-portal",
    slug: "alumni-portal",
    title: "Alumni Dashboard",
    type: "Client Work",
    category: "Full-Stack Web App",
    status: "Private",
    year: "2024",
    role: "Full-Stack Developer",
    client: "Bishop Heber College",
    stack: ["React", "TypeScript", "Redux Toolkit", "PHP", "MySQL", "CCAvenue", "AWS S3", "@react-pdf/renderer"],
    description: "Full-stack alumni registration and payment system with CCAvenue gateway integration, document upload, and a matched payments dashboard.",
    whatIDid: {
      design: "Multi-step registration flow, matched payments dashboard UI",
      frontend: "Redux Toolkit, TypeScript, dynamic fee logic, PDF receipt generation",
      backend: "PHP/MySQL backend, CCAvenue payment integration, S3 document storage, INNER JOIN matched payments query",
    },
    highlights: [
      "Secure CCAvenue payment integration",
      "Automated PDF receipt generation",
      "Real-time matched payments dashboard"
    ],
    videoUrls: ["/assets/video/alumni-dashboard.mp4"]
  },
  {
    id: "wedding-invite-balasundar",
    slug: "wedding-invite-balasundar",
    title: "Wedding Invitation Website",
    type: "Client Work",
    category: "Interactive Microsite",
    status: "Live",
    year: "2024",
    role: "Frontend Engineer",
    liveUrl: "https://invite.balasundar.in/",
    client: "Balasundar",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    description: "Custom digital wedding invitation website with smooth animations, event details, and responsive design tailored for a modern invite experience.",
    whatIDid: {
      design: "Elegant invitation-style UI with typography-focused layout and smooth transitions",
      frontend: "Animated sections using Framer Motion, responsive layout, optimized asset loading",
      backend: "Static optimized deployment with Next.js",
    },
    highlights: [
      "Smooth animated invite experience",
      "Mobile-first responsive design",
      "Fast-loading static deployment"
    ],
    testimonial: {
      quote: "The website gave our wedding invite a modern and memorable touch.",
      author: "Balasundar",
      role: "Client"
    },
    videoUrl: "/assets/video/wedding.mp4"
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}
