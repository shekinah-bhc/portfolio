export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  coverImage: string
  images: string[]
  tags: string[]
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
  startDate: string
  endDate?: string
}

// Tech stack icon mapping using devicon CDN
export const techIcons: Record<string, string> = {
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Prisma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
}

export const projects: Project[] = [
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "A full-stack marketplace that handles 10K+ daily transactions",
    longDescription: "A modular e-commerce platform built using Next.js with server components for optimal performance. Features real-time inventory management, Stripe integration, and a headless CMS. Achieved sub-100ms TTFB and 60% reduction in page weight through ISR and image optimization.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["Full Stack", "E-Commerce", "Scalable"],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    liveUrl: "https://example-store.com",
    githubUrl: "https://github.com/example/ecommerce",
    featured: true,
    order: 1,
    startDate: "2024-01-01",
  },
  {
    slug: "ai-content-generator",
    title: "AI Content Generator",
    description: "GPT-powered writing assistant used by 500+ content creators",
    longDescription: "Developed an AI-powered platform using OpenAI's GPT-4 with custom fine-tuning. Includes a collaborative editor with real-time sync using Yjs and CRDTs. Reduced content creation time by 70% and API costs by 40% through intelligent caching and prompt engineering.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["AI", "SaaS", "Productivity"],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://ai-writer.example.com",
    githubUrl: "https://github.com/example/ai-content",
    featured: true,
    order: 2,
    startDate: "2024-02-15",
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    description: "Real-time collaborative workspace for distributed teams",
    longDescription: "A minimalist task management application with real-time sync using WebSockets and Redis pub/sub. Features an offline-first architecture using IndexedDB, drag-and-drop Kanban boards, and sub-100ms sync latency. Adopted by 200+ teams with a 40% improvement in task completion.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["Collaboration", "Real-time", "Offline-first"],
    techStack: ["React", "Node.js", "MongoDB", "TypeScript"],
    liveUrl: "https://tasks.example.com",
    githubUrl: "https://github.com/example/task-app",
    featured: true,
    order: 3,
    startDate: "2024-04-10",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description: "A weather application that displays current conditions and forecasts based on user location.",
    longDescription: "Real-time weather tracking application providing hyper-local forecasts and historical data visualizations. Built with standard API integration and responsive design patterns.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["Frontend", "API"],
    techStack: ["React", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    order: 4,
    startDate: "2023-11-20",
  },
  {
    slug: "portfolio-template",
    title: "Portfolio Template",
    description: "A customizable portfolio template for developers built with Next.js and Tailwind CSS.",
    longDescription: "A high-performance, SEO-optimized portfolio starter for developers. Includes dark mode, project showcases, and blog integration with markdown support.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["Template", "SEO"],
    techStack: ["Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com",
    featured: false,
    order: 5,
    startDate: "2023-12-05",
  },
  {
    slug: "markdown-editor",
    title: "Markdown Editor",
    description: "A real-time markdown editor with live preview and export functionality.",
    longDescription: "Intuitive editor for writing and previewing markdown in real-time. Features syntax highlighting, PDF export, and local storage persistence.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["Web App", "Editor"],
    techStack: ["React", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    order: 6,
    startDate: "2024-01-20",
  },
  {
    slug: "recipe-finder",
    title: "Recipe Finder",
    description: "Search and save recipes from various sources with ingredient filtering and meal planning.",
    longDescription: "A comprehensive recipe management tool with smart search, grocery list generation, and dietary restriction filters. Uses Firebase for real-time data sync.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["Mobile Web", "Firebase"],
    techStack: ["Vue.js", "Firebase"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    order: 7,
    startDate: "2024-02-10",
  },
  {
    slug: "habit-tracker",
    title: "Habit Tracker",
    description: "Track daily habits with streak counting, statistics, and reminder notifications.",
    longDescription: "Personal growth application focused on habit formation and consistency. Features detailed progress charts, automated reminders, and social sharing options.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["PWA", "Productivity"],
    techStack: ["React", "TypeScript"],
    githubUrl: "https://github.com",
    featured: false,
    order: 8,
    startDate: "2024-03-05",
  },
  {
    slug: "url-shortener",
    title: "URL Shortener",
    description: "A URL shortening service with analytics tracking and custom alias support.",
    longDescription: "Scalable URL shortener backend with detailed analytics, QR code generation, and expiry settings. Built for high throughput using Redis and PostgreSQL.",
    coverImage: "/placeholder.jpg",
    images: [],
    tags: ["Backend", "Infrastructure"],
    techStack: ["Node.js", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    order: 9,
    startDate: "2024-03-25",
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured).sort((a, b) => a.order - b.order)
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order)
}
