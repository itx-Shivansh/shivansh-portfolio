'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * CursorSpotlight — Soft ambient gold illumination layer.
 *
 * Sits at z-[1] directly above the pitch-black base (#000000) and behind
 * all scene content and cards.
 * Desktop only: enabled via (hover: hover) and (pointer: fine).
 * Zero React re-renders during mouse movement; drives CSS custom properties
 * on a requestAnimationFrame lerp loop that idles when mouse stops.
 */

// Radius of the ambient spotlight circle in pixels
const SPOTLIGHT_RADIUS = 600
// Opacity at the spotlight centre (gold rgba alpha)
const SPOTLIGHT_ALPHA_CENTER = 0.07
// Opacity at the mid-gradient stop (40% from centre)
const SPOTLIGHT_ALPHA_MID = 0.035
// Lerp factor — higher = snappier tracking (0.0–1.0)
const SPOTLIGHT_LERP = 0.12
// Idle threshold — RAF stops when delta below this (px)
const SPOTLIGHT_IDLE_THRESHOLD = 0.2

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [isSupported, setIsSupported] = useState<boolean>(false)

  const mousePos = useRef({ x: -1000, y: -1000 })
  const currentPos = useRef({ x: -1000, y: -1000 })
  const isMoving = useRef<boolean>(false)
  const isFirstMove = useRef<boolean>(true)
  const animFrameId = useRef<number | null>(null)

  useEffect(() => {
    // 1. Check for pointer: fine & hover: hover (disable on mobile/touch)
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointerQuery.matches) {
      return
    }
    setIsSupported(true)

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = reducedMotionQuery.matches

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
    }
    reducedMotionQuery.addEventListener('change', onReducedMotionChange)

  

    // Stop and cancel RAF loop
    const stopLoop = () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current)
        animFrameId.current = null
      }
      isMoving.current = false
    }

    // Tick function for smooth lerp
    const tick = () => {
      const dx = mousePos.current.x - currentPos.current.x
      const dy = mousePos.current.y - currentPos.current.y

      // Lerp with dampening factor for responsive, natural trailing
      currentPos.current.x += dx * SPOTLIGHT_LERP
      currentPos.current.y += dy * SPOTLIGHT_LERP

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--spot-x', `${currentPos.current.x.toFixed(1)}px`)
        spotlightRef.current.style.setProperty('--spot-y', `${currentPos.current.y.toFixed(1)}px`)
      }

      // If close enough to target, idle the loop to conserve CPU/GPU
      if (Math.abs(dx) < SPOTLIGHT_IDLE_THRESHOLD && Math.abs(dy) < SPOTLIGHT_IDLE_THRESHOLD) {
        currentPos.current.x = mousePos.current.x
        currentPos.current.y = mousePos.current.y
        if (spotlightRef.current) {
          spotlightRef.current.style.setProperty('--spot-x', `${mousePos.current.x}px`)
          spotlightRef.current.style.setProperty('--spot-y', `${mousePos.current.y}px`)
        }
        stopLoop()
        return
      }

      animFrameId.current = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (!isMoving.current && !prefersReducedMotion) {
        isMoving.current = true
        animFrameId.current = requestAnimationFrame(tick)
      }
    }

    // Pointer move listener
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (isFirstMove.current) {
        isFirstMove.current = false
        currentPos.current = { x: e.clientX, y: e.clientY }
        if (spotlightRef.current) {
          spotlightRef.current.style.setProperty('--spot-x', `${e.clientX}px`)
          spotlightRef.current.style.setProperty('--spot-y', `${e.clientY}px`)
          spotlightRef.current.style.opacity = '1'
        }
      }

      if (prefersReducedMotion) {
        // Direct static update without lerp
        if (spotlightRef.current) {
          spotlightRef.current.style.setProperty('--spot-x', `${e.clientX}px`)
          spotlightRef.current.style.setProperty('--spot-y', `${e.clientY}px`)
        }
      } else {
        startLoop()
      }
    }

    // Window mouseleave / mouseenter (smooth fade out / in)
    const onMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0'
      }
      stopLoop()
    }

    const onMouseEnter = () => {
      if (spotlightRef.current && !isFirstMove.current) {
        spotlightRef.current.style.opacity = '1'
      }
    }

    // Visibility change listener (pause when tab hidden)
    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop()
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      stopLoop()
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  if (!isSupported) {
    return null
  }

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500 ease-out"
      style={{
        opacity: 0,
        background: `radial-gradient(${SPOTLIGHT_RADIUS}px circle at var(--spot-x, -9999px) var(--spot-y, -9999px), rgba(245, 184, 0, ${SPOTLIGHT_ALPHA_CENTER}) 0%, rgba(245, 184, 0, ${SPOTLIGHT_ALPHA_MID}) 40%, transparent 80%)`,
      }}
    />
  )
}
