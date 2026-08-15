import { create } from 'zustand'
import { SectionId, SECTION_IDS } from './constants'
import type Lenis from 'lenis'
import { Project } from '@/content/projects'

export type CursorMode = 'default' | 'hover' | 'text' | 'hidden'
export type VideoStatus = 'idle' | 'loading' | 'ready' | 'error' | 'fallback'

interface ScrollState {
  scrollProgress: number
  activeSection: SectionId
  scrollY: number
  chapterProgress: Record<SectionId, number>
  selectedProject: Project | null

  isLoaded: boolean
  isDebugOpen: boolean
  cursorState: CursorMode
  cursorText: string | null

  videoStatus: VideoStatus
  videoDuration: number

  lenis: Lenis | null

  setScrollProgress: (progress: number) => void
  setActiveSection: (section: SectionId) => void
  setScrollY: (y: number) => void
  setChapterProgress: (section: SectionId, progress: number) => void
  setSelectedProject: (project: Project | null) => void
  setIsLoaded: (loaded: boolean) => void
  setIsDebugOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  setCursorState: (state: CursorMode, text?: string | null) => void
  setVideoStatus: (status: VideoStatus, duration?: number) => void
  setLenis: (lenis: Lenis | null) => void
  scrollToSection: (sectionId: SectionId) => void
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  scrollProgress: 0,
  activeSection: SECTION_IDS.HERO,
  scrollY: 0,
  chapterProgress: {
    [SECTION_IDS.HERO]: 0,
    [SECTION_IDS.JOURNEY]: 0,
    [SECTION_IDS.PROJECTS]: 0,
    [SECTION_IDS.SKILLS]: 0,
    [SECTION_IDS.CONTACT]: 0,
  },
  selectedProject: null,

  isLoaded: false,
  isDebugOpen: false,
  cursorState: 'default',
  cursorText: null,

  videoStatus: 'idle',
  videoDuration: 0,

  lenis: null,

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollY: (y) => set({ scrollY: y }),
  setChapterProgress: (section, progress) =>
    set((state) => ({
      chapterProgress: {
        ...state.chapterProgress,
        [section]: Math.max(0, Math.min(1, progress)),
      },
    })),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setIsDebugOpen: (open) =>
    set((state) => ({
      isDebugOpen: typeof open === 'function' ? open(state.isDebugOpen) : open,
    })),
  setCursorState: (state, text = null) => set({ cursorState: state, cursorText: text }),
  setVideoStatus: (status, duration = 0) =>
    set((state) => ({
      videoStatus: status,
      videoDuration: duration > 0 ? duration : state.videoDuration,
    })),
  setLenis: (lenis) => set({ lenis }),

  scrollToSection: (sectionId) => {
    const lenis = get().lenis
    const target = document.getElementById(sectionId)
    if (lenis && target) {
      lenis.scrollTo(target, { duration: 1.4 })
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  },
}))
