export interface Project {
  id: string
  slug: string
  title: string
  type: string
  status: 'Live' | 'Seasonal' | 'Private'
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
}

export const projects: Project[] = [
  {
    id: "reborn-interactive",
    slug: "reborn-interactive",
    title: "Reborn Interactive",
    type: "Client Work",
    status: "Live",
    liveUrl: "https://reborninteractive.in", // Placeholder, user said [reborn live URL]
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
    }
  },
  {
    id: "bhc-admissions",
    slug: "bhc-admissions",
    title: "BHC Admissions Portal",
    type: "Client Work",
    status: "Seasonal",
    client: "Bishop Heber College",
    stack: ["React", "Redux Toolkit", "TypeScript", "Node.js", "Express", "MongoDB", "AWS S3", "jsPDF", "Three.js"],
    description: "Full-stack admissions system for an engineering college. Multi-step form with conditional Zod validation, 3 user roles, admin analytics dashboard.",
    whatIDid: {
      design: "Multi-step form UX, candidate dashboard, admin analytics with Three.js globe",
      frontend: "Redux Toolkit state, Zod superRefine conditional logic, PDF receipt generation",
      backend: "Node.js/Express REST API, MongoDB, AWS S3 presigned URLs, connect-mongo sessions",
    },
    highlights: [
      "Handled intensive intake seasons",
      "Admin analytics with Three.js globe",
      "Conditional Zod validation for multi-step forms"
    ],
    testimonial: {
      quote: "The admissions portal handled our entire intake season without a single issue.",
      author: "Admin",
      role: "Bishop Heber College"
    }
  },
  {
    id: "alumni-portal",
    slug: "alumni-portal",
    title: "Alumni Registration & Payment Portal",
    type: "Client Work",
    status: "Private",
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
    ]
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}

