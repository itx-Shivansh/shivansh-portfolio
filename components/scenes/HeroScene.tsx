'use client'

import { useEffect, useRef } from 'react'
import { identity } from '@/content/identity'
import { useScrollStore } from '@/lib/scrollStore'
import { gsap, ease, duration, stagger } from '@/lib/motion'
import { sound } from '@/lib/sound'

export default function HeroScene() {
  const { isLoaded, scrollToSection, selectedProject } = useScrollStore()

  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const rolesRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)

  // 1. Entrance Animation Sequence (Fires after Loader finishes)
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: ease.snap },
      })

      // Badge entrance
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: duration.slow },
          0.1
        )
      }

      // Name Headline Reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word')
        tl.fromTo(
          words,
          { opacity: 0, y: 70, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: duration.cinematic,
            stagger: stagger.loose,
            ease: ease.cinematic,
          },
          0.3
        )
      }

      // Roles Pills
      if (rolesRef.current) {
        const pills = rolesRef.current.children
        tl.fromTo(
          pills,
          { opacity: 0, y: 25, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: duration.slow, stagger: stagger.base },
          0.8
        )
      }

      // Positioning Statement
      if (bioRef.current) {
        tl.fromTo(
          bioRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: duration.slow },
          1.1
        )
      }

      // Scroll Prompt & CTAs
      if (promptRef.current) {
        tl.fromTo(
          promptRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: duration.slow },
          1.3
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoaded])

  // 2. Mouse Parallax (Desktop Only)
  useEffect(() => {
    if (!containerRef.current) return

    const xHeadlineTo = gsap.quickTo(headlineRef.current, 'x', { duration: duration.slow, ease: ease.enter })
    const yHeadlineTo = gsap.quickTo(headlineRef.current, 'y', { duration: duration.slow, ease: ease.enter })

    const xSubTo = gsap.quickTo(bioRef.current, 'x', { duration: duration.cinematic, ease: ease.enter })
    const ySubTo = gsap.quickTo(bioRef.current, 'y', { duration: duration.cinematic, ease: ease.enter })

    const handleMouseMove = (e: MouseEvent) => {
      if (selectedProject) return

      const { innerWidth, innerHeight } = window
      const normX = (e.clientX / innerWidth - 0.5) * 2
      const normY = (e.clientY / innerHeight - 0.5) * 2

      xHeadlineTo(normX * 18)
      yHeadlineTo(normY * 18)

      xSubTo(normX * 8)
      ySubTo(normY * 8)
    }

    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (isFinePointer) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [selectedProject])

  // 3. Scroll-Exit Transition
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: -140,
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const roleIcons: Record<string, React.ReactNode> = {
    'AI Developer': (
      <svg className="w-4 h-4 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    'Software Engineer': (
      <svg className="w-4 h-4 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    'Full-Stack Developer': (
      <svg className="w-4 h-4 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
      </svg>
    ),
    'Automation Builder': (
      <svg className="w-4 h-4 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full select-none overflow-hidden"
      style={{ minHeight: '140vh' }}
    >
      {/* Sticky Viewport Container */}
      <div
        ref={containerRef}
        className="sticky top-0 flex h-screen w-full items-center justify-between px-8 sm:px-16 md:px-24 lg:pl-36 lg:pr-20 overflow-hidden z-10"
      >
        {/* ── Left Hero Main Content ──────────────────────────────────── */}
        <div className="flex w-full max-w-3xl flex-col items-start text-left select-none space-y-6 md:space-y-7">
          {/* Top Badge Pill */}
          <div ref={badgeRef} className="flex items-center gap-3">
            <div className="rounded-full border border-[#F5B800]/40 bg-[#121214]/80 px-4 py-1.5 backdrop-blur-md flex items-center gap-2.5 shadow-lg">
              <span className="font-mono text-[11px] font-bold text-[#F5B800] tracking-widest uppercase">
                ENGINEERING & AI
              </span>
              <span className="w-1 h-1 rounded-full bg-[#F5B800]" />
              <span className="font-mono text-[11px] font-semibold text-neutral-300 tracking-widest uppercase">
                DELHI TECHNOLOGICAL UNIVERSITY
              </span>
            </div>
          </div>

          {/* Huge Dual-Color Name Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-extrabold uppercase tracking-tight leading-[0.88] select-none text-[64px] sm:text-[92px] lg:text-[112px]"
          >
            <span className="hero-word block text-white">SHIVANSH</span>
            <span className="hero-word block text-[#F5B800]">RAJ</span>
          </h1>

          {/* Subtitle / Tagline */}
          <div className="flex items-center gap-3 text-neutral-300 text-sm md:text-base font-normal tracking-wide">
            <span className="w-6 h-[2px] bg-[#F5B800] rounded-full inline-block" />
            <p>
              Building intelligent software solutions for{' '}
              <span className="text-[#F5B800] font-bold">real-world</span> impact.
            </p>
          </div>

          {/* Interactive Role Badges Grid */}
          <div
            ref={rolesRef}
            className="flex flex-wrap items-center justify-start gap-3 max-w-2xl pt-1"
          >
            {identity.roles.map((role, idx) => (
              <span
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="rounded-full border border-white/10 bg-[#141416]/80 px-4 py-2 text-xs font-medium text-neutral-200 backdrop-blur-md transition-all duration-200 hover:border-[#F5B800]/60 hover:text-[#F5B800] hover:shadow-[0_0_12px_rgba(245,184,0,0.15)] flex items-center gap-2 cursor-pointer"
              >
                {roleIcons[role] || (
                  <svg className="w-4 h-4 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                )}
                {role}
              </span>
            ))}
          </div>

          {/* Positioning Statement */}
          <p
            ref={bioRef}
            className="max-w-xl text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed pt-1"
          >
            {identity.positioningStatement}
          </p>

          {/* Action CTA Buttons */}
          <div ref={promptRef} className="flex items-center gap-4 pt-2">
            <button
              onClick={() => {
                sound.playClick()
                scrollToSection('projects')
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-7 py-3.5 bg-[#F5B800] hover:bg-[#e0a700] text-black font-bold rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-[#F5B800]/25 hover:scale-[1.02] active:scale-95"
            >
              <span>View Projects</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>

            <button
              onClick={() => {
                sound.playClick()
                scrollToSection('journey')
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-7 py-3.5 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl text-sm flex items-center gap-2 transition-all hover:border-white/40 active:scale-95"
            >
              <span>My Journey</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Bottom Left Scroll Prompt */}
          <div className="pt-8 flex items-center gap-3 text-neutral-400 font-mono text-[11px] tracking-widest uppercase">
            <div className="w-5 h-8 rounded-full border-2 border-neutral-400 flex items-start justify-center p-1">
              <span className="w-1 h-2 bg-[#F5B800] rounded-full animate-bounce" />
            </div>
            <span>SCROLL TO EXPLORE</span>
            <div className="w-24 h-[1px] bg-gradient-to-r from-[#F5B800] to-transparent" />
          </div>
        </div>

        {/* ── Right Floating HUD Cards Stack (Matching Mockup) ───────────── */}
        <div className="hidden xl:flex flex-col items-end gap-5 pointer-events-auto select-none">
          {/* Card 1 — HERO Data Module Card */}
          <div className="w-80 rounded-2xl bg-[#0e0e11]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#F5B800]">01</span>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">HERO</span>
              </div>
              <button
                onClick={() => sound.playClick()}
                className="w-8 h-8 rounded-full bg-[#1b1912] border border-[#F5B800]/40 flex items-center justify-center text-[#F5B800] hover:scale-105 transition-transform"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">DATA MODULE</span>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-[#F5B800] rounded-full w-[72%] shadow-[0_0_10px_#F5B800]" />
                </div>
                <span className="font-mono text-xs font-bold text-neutral-200">72%</span>
              </div>
            </div>
          </div>

          {/* Card 2 — Quick Stats HUD Card */}
          <div className="w-80 rounded-2xl bg-[#0e0e11]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl space-y-4">
            {/* Stat Row 1 */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div>
                <div className="font-display text-xl font-extrabold text-white leading-none">20+</div>
                <div className="text-xs text-neutral-400 font-medium mt-0.5">Projects Completed</div>
              </div>
            </div>

            {/* Stat Row 2 */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <div className="font-display text-xl font-extrabold text-white leading-none">5+</div>
                <div className="text-xs text-neutral-400 font-medium mt-0.5">Hackathons</div>
              </div>
            </div>

            {/* Stat Row 3 */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-white leading-tight">Problem</div>
                <div className="font-display text-sm font-semibold text-white leading-tight">Solver</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

