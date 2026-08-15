'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { useScrollStore } from '@/lib/scrollStore'
import { SECTION_ORDER, SectionId, LENIS_OPTIONS } from '@/lib/constants'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const { setScrollProgress, setActiveSection, setScrollY, setChapterProgress, setIsDebugOpen, setLenis } =
    useScrollStore()

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: LENIS_OPTIONS.duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Lenis smooth cubic curve
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    setLenis(lenis)

    // 2. Connect Lenis to GSAP Ticker
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateRaf)
    gsap.ticker.lagSmoothing(0)

    // 3. Connect Lenis scroll callback to GSAP ScrollTrigger & Zustand
    lenis.on('scroll', (e: { scroll: number; limit: number; progress: number }) => {
      ScrollTrigger.update()
      setScrollY(e.scroll)
      setScrollProgress(Math.max(0, Math.min(1, e.progress)))
    })

    // 4. Set up ScrollTrigger scrollerProxy
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    // 5. Build separate ScrollTriggers for (a) active-section detection and (b) chapter scrub progress.
    //    These need different boundary ranges: active-section uses mid-viewport windows,
    //    but chapter-progress must span the full scrollable extent of each section so that
    //    hero-progress 0 = top of hero, 1 = hero fully scrolled past (matches HeroScene's GSAP scrub range).
    const triggers: ScrollTrigger[] = []

    SECTION_ORDER.forEach((id: SectionId) => {
      const el = document.getElementById(id)
      if (!el) return

      // Active-section detection trigger (60%/40% window)
      const activeTrigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(id)
          }
        },
      })
      triggers.push(activeTrigger)

      // Chapter-progress scrub trigger (full section extent — matches HeroScene canonical range)
      const progressTrigger = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          setChapterProgress(id, self.progress)
        },
      })
      triggers.push(progressTrigger)
    })

    ScrollTrigger.refresh()

    // 6. Keypress listener for Debug HUD toggle (Backtick key `)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        setIsDebugOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      triggers.forEach((t) => t.kill())
      gsap.ticker.remove(updateRaf)
      lenis.destroy()
      setLenis(null)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setScrollProgress, setActiveSection, setScrollY, setChapterProgress, setIsDebugOpen, setLenis])

  return <>{children}</>
}
