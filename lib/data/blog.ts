export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "handling-conditional-zod-validation",
    title: "How I handled conditional Zod validation across a 6-step form",
    excerpt: "Multi-step forms with branching logic are tricky. Here's how I used superRefine to handle NRI nationality, PG/UG branching, and dynamic required fields.",
    date: "April 15, 2024",
    readTime: "8 min read",
    tags: ["React", "Zod", "Forms", "Validation"]
  },
  {
    slug: "gsap-scrolltrigger-on-mobile",
    title: "GSAP ScrollTrigger on mobile — what I learned the hard way",
    excerpt: "Mobile GSAP performance is a different beast. gsap.matchMedia(), force3D, and context cleanup saved my animations.",
    date: "March 28, 2024",
    readTime: "6 min read",
    tags: ["GSAP", "Animations", "Mobile", "Performance"]
  }
]

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}
