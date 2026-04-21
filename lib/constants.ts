export const siteConfig = {
  name: 'Shekinah Florance M',
  title: 'Web Developer',
  tagline: 'I build things for the web.',
  description: 'I am a web developer with experience in building web applications.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ogImage: '/og.png',
  links: {
    github: '[YOUR_GITHUB_URL]',
    linkedin: 'www.linkedin.com/in/shekinah-florance-ab4449202',
    twitter: '[YOUR_TWITTER_URL]',
    email: 'florashek24official@gmail.com',
  },
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
}
