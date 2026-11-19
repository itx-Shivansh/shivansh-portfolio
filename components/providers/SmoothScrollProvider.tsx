'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { useScrollStore } from '@/lib/scrollStore'
import { SECTION_ORDER, SECTION_IDS, SectionId, LENIS_OPTIONS } from '@/lib/constants'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const { setScrollProgress, setActiveSection, setScrollY, setIsDebugOpen, setLenis } =
    useScrollStore()

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Initialize Lenis Smooth Scroll (disabled/immediate when reduced motion preferred)
    const lenis = new Lenis({
      duration: prefersReduced ? 0 : LENIS_OPTIONS.duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Lenis smooth cubic curve
      smoothWheel: !prefersReduced,
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
      if (e.scroll < 100) {
        setActiveSection(SECTION_IDS.JOURNEY)
      }
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

    // 5. Active section detection via IntersectionObserver on right-column sections
    let activeObserver: IntersectionObserver | null = null

    const setupObserver = () => {
      const sectionElements = SECTION_ORDER.map((id) => document.getElementById(id)).filter(
        Boolean
      ) as HTMLElement[]

      if (sectionElements.length === 0) return

      activeObserver = new IntersectionObserver(
        (entries) => {
          if (window.scrollY < 100) {
            setActiveSection(SECTION_IDS.JOURNEY)
            return
          }

          const visibleEntries = entries.filter((e) => e.isIntersecting)
          if (visibleEntries.length > 0) {
            visibleEntries.sort(
              (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
            )
            const topMost = visibleEntries[0]
            if (topMost && topMost.target.id) {
              setActiveSection(topMost.target.id as SectionId)
            }
          }
        },
        {
          root: null,
          rootMargin: '-20% 0px -40% 0px',
          threshold: [0, 0.1, 0.3, 0.6],
        }
      )

      sectionElements.forEach((el) => activeObserver?.observe(el))
    }

    const observerTimer = setTimeout(setupObserver, 100)

    ScrollTrigger.refresh()

    // 6. Debounced ScrollTrigger refresh on window resize & orientationchange (Category 3)
    let resizeTimeout: NodeJS.Timeout | null = null
    const handleResizeOrOrientation = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }

    window.addEventListener('resize', handleResizeOrOrientation)
    window.addEventListener('orientationchange', handleResizeOrOrientation)

    // 7. Keypress listener for Debug HUD toggle (Backtick key `)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        setIsDebugOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(observerTimer)
      if (activeObserver) activeObserver.disconnect()
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResizeOrOrientation)
      window.removeEventListener('orientationchange', handleResizeOrOrientation)
      gsap.ticker.remove(updateRaf)
      lenis.destroy()
      setLenis(null)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setScrollProgress, setActiveSection, setScrollY, setIsDebugOpen, setLenis])

  return <>{children}</>
}
