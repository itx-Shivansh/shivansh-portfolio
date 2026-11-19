'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap, ease, duration } from '@/lib/motion'
import { useScrollStore } from '@/lib/scrollStore'

const MODULES = [
  {
    id: 'core',
    label: 'CORE SYSTEMS',
    threshold: 20,
    icon: (
      <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'assets',
    label: 'ASSETS',
    threshold: 40,
    icon: (
      <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: 'interface',
    label: 'INTERFACE',
    threshold: 60,
    icon: (
      <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect width="18" height="14" x="3" y="5" rx="2" />
        <polyline points="7 10 10 12 7 14" />
        <line x1="12" x2="16" y1="14" y2="14" />
      </svg>
    ),
  },
  {
    id: 'datapackets',
    label: 'DATA PACKETS',
    threshold: 80,
    icon: (
      <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: 'launchprep',
    label: 'LAUNCH PREP',
    threshold: 100,
    icon: (
      <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-3-3m0 0l8.5-8.5a2.12 2.12 0 013 3L12 15zm-3-3l-4 4m7.5-7.5l4 4" />
      </svg>
    ),
  },
]

export default function Loader() {
  const setIsLoaded = useScrollStore((state) => state.setIsLoaded)

  const [progress, setProgress] = useState<number>(0)
  const [statusMessage, setStatusMessage] = useState<string>('Initializing system modules...')
  const [shouldRender, setShouldRender] = useState<boolean>(true)
  const [dotIndex, setDotIndex] = useState<number>(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const isCompletingRef = useRef<boolean>(false)

  // Skip loader: once per session OR if user prefers reduced motion.
  // isLoaded must still be set when skipping so the page becomes visible.
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem('loaderSeen') === '1'
    } catch {
      // sessionStorage blocked (e.g. private-browsing cookie settings)
    }

    if (prefersReduced || alreadySeen) {
      setIsLoaded(true)
      setShouldRender(false)
      return
    }

    try {
      sessionStorage.setItem('loaderSeen', '1')
    } catch {
      // ignore write failures
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Animated 3 loading dots interval
  useEffect(() => {
    if (!shouldRender) return
    const dotInterval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % 3)
    }, 400)
    return () => clearInterval(dotInterval)
  }, [shouldRender])

  // Fixed ~800ms progress sequence
  useEffect(() => {
    if (!shouldRender) return
    let animId: number
    const durationMs = 800
    const startTime = performance.now()

    const update = (now: number) => {
      const elapsed = now - startTime
      const rawProgress = Math.min(1, elapsed / durationMs)
      const currentProgress = Math.min(100, Math.floor(rawProgress * 100))

      setProgress(currentProgress)

      if (currentProgress < 25) {
        setStatusMessage('Initializing system modules...')
      } else if (currentProgress < 50) {
        setStatusMessage('Calibrating core interface...')
      } else if (currentProgress < 80) {
        setStatusMessage('Mounting layout architecture...')
      } else {
        setStatusMessage('Redirecting to experience...')
      }

      if (rawProgress >= 1 && !isCompletingRef.current) {
        isCompletingRef.current = true
        setProgress(100)
        setTimeout(() => {
          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              opacity: 0,
              scale: 1.03,
              duration: duration.slow,
              ease: ease.cinematic,
              onComplete: () => {
                setIsLoaded(true)
                setShouldRender(false)
              },
            })
          } else {
            setIsLoaded(true)
            setShouldRender(false)
          }
        }, 150)
        return
      }

      if (!isCompletingRef.current) {
        animId = requestAnimationFrame(update)
      }
    }

    animId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [setIsLoaded, shouldRender])

  if (!shouldRender) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#08080a] px-6 py-8 text-white select-none overflow-hidden font-mono bg-technical-grid"
    >
      {/* Viewport Outer 4 Corner Brackets */}
      <span className="absolute top-6 left-6 text-[#F5B800] text-sm pointer-events-none select-none">┌</span>
      <span className="absolute top-6 right-6 text-[#F5B800] text-sm pointer-events-none select-none">┐</span>
      <span className="absolute bottom-6 left-6 text-[#F5B800] text-sm pointer-events-none select-none">└</span>
      <span className="absolute bottom-6 right-6 text-[#F5B800] text-sm pointer-events-none select-none">┘</span>

      {/* ── Top Header Row ─────────────────────────────────────────── */}
      <div className="flex w-full items-center justify-between text-xs font-semibold text-neutral-400 tracking-wider">
        <div className="flex items-center gap-2">
          <span>SHIVANSH RAJ</span>
          <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
        </div>

        <div className="flex items-center gap-2">
          <span>INITIALIZING EXPERIENCE</span>
          <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
        </div>
      </div>

      {/* ── Center Counter & Modules Cluster ───────────────────────── */}
      <div className="my-auto space-y-8 max-w-4xl mx-auto w-full text-center">
        {/* Main 100% Display Box with Brackets */}
        <div className="space-y-3">
          <p className="font-mono text-xs font-extrabold text-[#F5B800] tracking-[0.25em] uppercase">
            INITIALIZING SYSTEM MODULES ...
          </p>

          <div className="relative inline-block px-6 py-3 sm:px-10 sm:py-4">
            {/* Box Corner Brackets */}
            <span className="absolute -top-1 -left-1 text-[#F5B800] text-xl">┌</span>
            <span className="absolute -top-1 -right-1 text-[#F5B800] text-xl">┐</span>
            <span className="absolute -bottom-1 -left-1 text-[#F5B800] text-xl">└</span>
            <span className="absolute -bottom-1 -right-1 text-[#F5B800] text-xl">┘</span>

            <div
              role="status"
              aria-live="polite"
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#F5B800] tracking-tight leading-none drop-shadow-[0_0_25px_rgba(245,184,0,0.3)]"
            >
              {progress}%
            </div>
          </div>

          <p className="font-mono text-xs font-bold text-neutral-300 tracking-[0.2em] uppercase">
            {progress === 100 ? '— ALL SYSTEMS ONLINE —' : '— PRELOADING SYSTEM MODULES —'}
          </p>
        </div>

        {/* Barbershop Striped Glowing Progress Bar */}
        <div className="w-full max-w-xl mx-auto h-3.5 rounded-full bg-[#16140e] border border-[#F5B800]/40 p-0.5 shadow-[0_0_20px_rgba(245,184,0,0.25)] relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F5B800] to-[#A67C00] transition-all duration-150 ease-out shadow-[0_0_12px_#F5B800] relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Barbershop Diagonal Stripe Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.15)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[stripe-move_1s_linear_infinite]" />
          </div>
        </div>

        {/* 5 System Check Modules Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4 max-w-3xl mx-auto">
          {MODULES.map((mod) => {
            const isOk = progress >= mod.threshold
            return (
              <div
                key={mod.id}
                className="relative rounded-xl border border-white/10 bg-surface-card p-4 flex flex-col items-center justify-center space-y-2 transition-all"
              >
                {/* Module Corner Brackets */}
                <span className="absolute top-1 left-1 text-[#F5B800] text-xs">┌</span>
                <span className="absolute top-1 right-1 text-[#F5B800] text-xs">┐</span>
                <span className="absolute bottom-1 left-1 text-[#F5B800] text-xs">└</span>
                <span className="absolute bottom-1 right-1 text-[#F5B800] text-xs">┘</span>

                <div className="p-2 rounded-lg bg-[#18150d] border border-[#F5B800]/30">
                  {mod.icon}
                </div>

                <div className="text-[10px] font-bold text-white tracking-wider uppercase">
                  {mod.label}
                </div>

                <div
                  className={`text-[10px] font-bold tracking-widest ${
                    isOk ? 'text-[#F5B800]' : 'text-neutral-500'
                  }`}
                >
                  {isOk ? '_OK' : '_LOADING...'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Status Console Box */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#F5B800] text-lg font-bold">[</span>
            <div className="text-center space-y-0.5">
              <p className="text-white font-bold">
                {progress === 100 ? 'System Check Complete.' : 'Performing System Diagnostic...'}
              </p>
              <p className="text-[#F5B800] font-semibold">
                {statusMessage}
              </p>
            </div>
            <span className="text-[#F5B800] text-lg font-bold">]</span>
          </div>

          {/* 3 Loading Dots Indicator */}
          <div className="flex items-center gap-2 pt-3 text-xs text-[#F5B800]">
            <span className={dotIndex >= 0 ? 'text-[#F5B800]' : 'text-neutral-600'}>●</span>
            <span className={dotIndex >= 1 ? 'text-[#F5B800]' : 'text-neutral-600'}>●</span>
            <span className={dotIndex >= 2 ? 'text-[#F5B800]' : 'text-neutral-600'}>●</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Footer Info ──────────────────────────────────────── */}
      <div className="text-center text-xs font-semibold text-neutral-400 tracking-widest uppercase">
        DELHI TECHNOLOGICAL UNIVERSITY <span className="text-[#F5B800] mx-1.5">●</span> 2025
      </div>
    </div>
  )
}

