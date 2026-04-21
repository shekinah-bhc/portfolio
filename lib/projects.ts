export interface ProjectCaseStudy {
  title: string
  slug: string
  tagline: string
  stack: string[]
  problem: string
  solution: string
  outcome: {
    description: string
    metrics: string[]
  }
  sections: {
    title: string
    body: string
  }[]
  liveUrl: string
  githubUrl: string
  videoUrl?: string
  metrics?: string[]
  featured: boolean
}

export interface OtherProject {
  title: string
  description: string
  stack: string[]
  githubUrl: string
  liveUrl: string | null
  metrics?: string[]
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

export const featuredProjects: ProjectCaseStudy[] = [
  {
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    tagline: "A full-stack marketplace that handles 10K+ daily transactions",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    problem: "Small businesses struggled with expensive enterprise e-commerce solutions that were difficult to customize and maintain. They needed a modern, scalable platform that could grow with their business without requiring a dedicated engineering team.",
    solution: "I built a modular e-commerce platform using Next.js 14 with server components for optimal performance. The system features real-time inventory management, Stripe integration for payments, and a headless CMS for product management. The architecture uses edge functions for global low-latency responses.",
    outcome: {
      description: "The platform now powers over 50 independent stores with a 99.9% uptime record.",
      metrics: ["3000+ daily users", "99.9% uptime", "$2M+ processed"]
    },
    sections: [
      {
        title: "Technical Architecture",
        body: "The application follows a microservices architecture with Next.js handling the frontend and API routes. PostgreSQL with Prisma ORM manages the data layer, while Redis handles session management and caching. The checkout flow integrates Stripe for secure payment processing with webhook handlers for order fulfillment."
      },
      {
        title: "Performance Optimization",
        body: "Implemented ISR (Incremental Static Regeneration) for product pages, achieving sub-100ms TTFB. Image optimization with next/image reduced page weight by 60%. Added edge caching for API responses, bringing average response times under 50ms globally."
      },
      {
        title: "Key Learnings",
        body: "Building this platform taught me the importance of designing for scale from day one. Implementing proper database indexing and query optimization early prevented major refactoring later. The experience also reinforced the value of comprehensive error handling and monitoring in production systems."
      }
    ],
    liveUrl: "https://example-store.com",
    githubUrl: "https://github.com/example/ecommerce",
    videoUrl: "/videos/ecommerce-demo.mp4",
    metrics: ["3000+ users", "99.9% uptime", "100 Lighthouse"],
    featured: true
  },
  {
    title: "AI Content Generator",
    slug: "ai-content-generator",
    tagline: "GPT-powered writing assistant used by 500+ content creators",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    problem: "Content creators and marketers spent hours writing and editing content manually. They needed an intelligent assistant that could understand their brand voice and help generate high-quality content quickly while maintaining consistency.",
    solution: "Developed an AI-powered content generation platform using OpenAI's GPT-4 API with custom fine-tuning for brand voice consistency. The system includes templates for various content types, a collaborative editor, and an approval workflow for teams.",
    outcome: {
      description: "Reduced average content creation time by 70% for users while maintaining quality scores.",
      metrics: ["500+ creators", "70% time saved", "50K+ articles"]
    },
    sections: [
      {
        title: "AI Integration",
        body: "Built a sophisticated prompt engineering system that maintains context across sessions. Implemented streaming responses using Vercel AI SDK for real-time generation feedback. Added custom fine-tuning capabilities so users can train the model on their existing content for brand voice matching."
      },
      {
        title: "Collaboration Features",
        body: "Designed a real-time collaborative editor using Yjs for conflict-free replicated data types (CRDTs). Teams can work on content simultaneously with live cursors and presence indicators. Added commenting, version history, and approval workflows for enterprise users."
      },
      {
        title: "Scalability Challenges",
        body: "Managing API rate limits and costs was a significant challenge. Implemented a queuing system with priority tiers, request batching, and intelligent caching of similar prompts. This reduced API costs by 40% while improving response times."
      }
    ],
    liveUrl: "https://ai-writer.example.com",
    githubUrl: "https://github.com/example/ai-content",
    videoUrl: "/videos/ai-content-demo.mp4",
    metrics: ["500+ creators", "70% faster", "50K articles"],
    featured: true
  },
  {
    title: "Task Management App",
    slug: "task-management-app",
    tagline: "Real-time collaborative workspace for distributed teams",
    stack: ["React", "Node.js", "MongoDB", "TypeScript"],
    problem: "Remote teams struggled with existing project management tools that felt bloated and slow. They needed a lightweight, real-time solution that focused on quick task capture and seamless collaboration without the overhead of complex project hierarchies.",
    solution: "Created a minimalist task management application with real-time sync using WebSockets. Features include drag-and-drop Kanban boards, @mentions, file attachments, and smart notifications. The UI prioritizes speed and keyboard navigation for power users.",
    outcome: {
      description: "Adopted by 200+ teams who report 40% improvement in task completion rates.",
      metrics: ["200+ teams", "40% more productive", "< 100ms sync"]
    },
    sections: [
      {
        title: "Real-time Architecture",
        body: "Implemented a WebSocket-based sync engine using Socket.io with Redis pub/sub for horizontal scaling. Changes propagate to all connected clients in under 100ms. Optimistic updates provide instant feedback while background sync ensures data consistency."
      },
      {
        title: "Offline Support",
        body: "Built a robust offline-first architecture using IndexedDB for local storage. The app queues changes when offline and intelligently resolves conflicts when connectivity returns. Users can work seamlessly regardless of network conditions."
      },
      {
        title: "Performance Metrics",
        body: "Achieved a 95+ Lighthouse performance score through careful optimization. Implemented virtual scrolling for large task lists, lazy-loaded components, and aggressive code splitting. The initial bundle is under 100KB gzipped."
      }
    ],
    liveUrl: "https://tasks.example.com",
    githubUrl: "https://github.com/example/task-app",
    metrics: ["200+ teams", "40% boost", "95 Lighthouse"],
    featured: true
  }
]

export const otherProjects: OtherProject[] = [
  {
    title: "Weather Dashboard",
    description: "A weather application that displays current conditions and forecasts based on user location.",
    stack: ["React", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    metrics: ["10K+ users"]
  },
  {
    title: "Portfolio Template",
    description: "A customizable portfolio template for developers built with Next.js and Tailwind CSS.",
    stack: ["Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: null,
    metrics: ["500+ stars"]
  },
  {
    title: "Markdown Editor",
    description: "A real-time markdown editor with live preview and export functionality.",
    stack: ["React", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    title: "Recipe Finder",
    description: "Search and save recipes from various sources with ingredient filtering and meal planning.",
    stack: ["Vue.js", "Firebase"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    metrics: ["5K+ recipes"]
  },
  {
    title: "Habit Tracker",
    description: "Track daily habits with streak counting, statistics, and reminder notifications.",
    stack: ["React", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: null,
    metrics: ["30-day streaks"]
  },
  {
    title: "URL Shortener",
    description: "A URL shortening service with analytics tracking and custom alias support.",
    stack: ["Node.js", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    metrics: ["1M+ links"]
  }
]

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return featuredProjects.find(project => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return featuredProjects.map(project => project.slug)
}
