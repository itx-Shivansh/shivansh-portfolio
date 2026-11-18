// Section IDs — used to target DOM sections and drive scroll triggers / in-page nav
export const SECTION_IDS = {
  JOURNEY: 'journey',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CONTACT: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

// Ordered list for sequential navigation
export const SECTION_ORDER: SectionId[] = [
  SECTION_IDS.JOURNEY,
  SECTION_IDS.PROJECTS,
  SECTION_IDS.SKILLS,
  SECTION_IDS.CONTACT,
]

// Lenis scroll options
export const LENIS_OPTIONS = {
  lerp: 0.07,
  duration: 1.65,
  smoothWheel: true,
  smoothTouch: false,
} as const

