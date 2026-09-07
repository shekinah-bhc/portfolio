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
    type: "Professional Work",
    category: "Production Website",
    status: "Live",
    year: "2025",
    role: "Full-Stack Developer",
    liveUrl: "https://reborninteractive.com",
    stack: [
      "Next.js",
      "TypeScript",
      "GSAP",
      "ScrollTrigger",
      "Three.js",
      "i18n"
    ],
    description:
      "A production website developed from scratch with multilingual routing, interactive animations, and custom 3D visual experiences.",
    whatIDid: {
      design:
        "Implemented the visual interface, typography system, responsive layouts, and animation-driven interactions.",
      frontend:
        "Built the application with Next.js and TypeScript, including GSAP and ScrollTrigger interactions, Three.js scenes, and multilingual routing.",
      backend:
        "Structured the Next.js application for maintainability and performance, with optimized rendering and reusable feature modules."
    },
    highlights: [
      "Built from scratch using Next.js and TypeScript",
      "Implemented multilingual routing",
      "Developed GSAP and ScrollTrigger interactions",
      "Integrated custom Three.js visual experiences"
    ],
    videoUrls: [
      "/assets/video/about.mp4",
      "/assets/video/dashboard_globe.mp4"
    ]
  },

  {
    id: "alumni-portal",
    slug: "alumni-portal",
    title: "Alumni Dashboard",
    type: "Professional Work",
    category: "Full-Stack Web Application",
    status: "Private",
    year: "2025",
    role: "Full-Stack Developer",
    client: "Bishop Heber College",
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "PHP",
      "MySQL",
      "CCAvenue",
      "AWS S3"
    ],
    description:
      "A full-stack alumni registration and payment platform with document uploads, payment processing, PDF receipts, and administrative transaction tracking.",
    whatIDid: {
      design:
        "Built multi-step registration workflows, fee-related interfaces, and an administrative payment dashboard.",
      frontend:
        "Developed React interfaces with TypeScript and Redux Toolkit, dynamic fee handling, validation, and PDF receipt generation.",
      backend:
        "Implemented PHP/MySQL APIs, CCAvenue payment integration, AWS S3 document storage, and database queries for payment reconciliation."
    },
    highlights: [
      "Integrated CCAvenue payment processing",
      "Implemented AWS S3 document uploads",
      "Generated PDF payment receipts",
      "Built payment tracking and reconciliation workflows"
    ],
    videoUrls: [
      "/assets/video/alumni-dashboard.mp4"
    ]
  },

  {
    id: "wedding-invite-balasundar",
    slug: "wedding-invite-balasundar",
    title: "Wedding Invitation Website",
    type: "Client Work",
    category: "Interactive Website",
    status: "Live",
    year: "2025",
    role: "Frontend Developer",
    liveUrl: "https://invite.balasundar.in/",
    client: "Balasundar",
    stack: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS"
    ],
    description:
      "A responsive digital wedding invitation website with animated sections, event information, and a mobile-focused user experience.",
    whatIDid: {
      design:
        "Designed the invitation interface with a typography-focused layout and responsive visual hierarchy.",
      frontend:
        "Implemented animated sections using Framer Motion, responsive layouts, and optimized static assets.",
      backend:
        "Configured the application as a lightweight Next.js deployment optimized for fast page loading."
    },
    highlights: [
      "Built a responsive mobile-first interface",
      "Implemented smooth Framer Motion animations",
      "Optimized the site for fast loading",
      "Deployed as a production Next.js application"
    ],
    videoUrl: "/assets/video/wedding.mp4"
  }
]
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}
