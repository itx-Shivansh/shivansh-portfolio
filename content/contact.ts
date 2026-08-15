export interface SocialLink {
  label: string
  url: string
}

export interface Contact {
  email: string
  location: string
  availability: string
  socials: SocialLink[]
}

export const contact: Contact = {
  email: 'shivanshrajoo@gmail.com',
  location: 'Delhi, India',
  availability: 'Open to Software Development, AI, and Full-Stack Internship Opportunities.',
  socials: [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/shivansh-raj-429733229/',
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/only.shivanshhh/',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/itx-Shivansh',
    },
  ],
}

