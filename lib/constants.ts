// Section IDs — used to target DOM sections and drive scroll triggers
export const SECTION_IDS = {
  HERO: 'hero',
  JOURNEY: 'journey',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CONTACT: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

// Ordered list for sequential navigation
export const SECTION_ORDER: SectionId[] = [
  SECTION_IDS.HERO,
  SECTION_IDS.JOURNEY,
  SECTION_IDS.PROJECTS,
  SECTION_IDS.SKILLS,
  SECTION_IDS.CONTACT,
]

// Design tokens (placeholder — will be replaced in Chunk 2 design system)
export const COLORS = {
  background: '#0a0a0a',
  surface: '#111111',
  border: '#1a1a1a',
  text: {
    primary: '#e5e5e5',
    secondary: '#888888',
    muted: '#444444',
  },
  accent: '#ffffff',
} as const

// Breakpoints (px)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Lenis scroll options — tuned for smooth, weightless-feeling scroll
export const LENIS_OPTIONS = {
  lerp: 0.07,
  duration: 1.65,
  smoothWheel: true,
  smoothTouch: false,
} as const
