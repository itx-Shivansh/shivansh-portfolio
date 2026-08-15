'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollStore } from '@/lib/scrollStore'

export default function Cursor() {
  const { cursorState, cursorText, setCursorState, selectedProject } = useScrollStore()
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Bail out immediately if modal is open — no cursor engine setup needed
    if (selectedProject) return

    // Detect touch / coarse pointer devices
    const touchQuery = window.matchMedia('(pointer: coarse)')
    if (touchQuery.matches) {
      setIsTouchDevice(true)
      return
    }

    // Expose native cursor as safety baseline while cursor engine runs
    document.documentElement.style.cursor = 'none'

    const onMouseMove = (e: MouseEvent) => {
      // Double guard against state updates if modal opens mid-move
      if (useScrollStore.getState().selectedProject) return
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Directly update inner dot for instant response
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Global listener for hover targets (buttons, links, text)
    const onMouseOver = (e: MouseEvent) => {
      // If project modal is open, never drive cursor state changes
      if (useScrollStore.getState().selectedProject) return
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor="interactive"]')
      const textEl = target.closest('h1, h2, h3, [data-cursor="text"]')

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor-text')
        setCursorState('hover', customText)
      } else if (textEl) {
        setCursorState('text')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Smooth lerp loop for outer trailing ring
    let animId: number
    const render = () => {
      // Pause loop immediately if modal is open
      if (useScrollStore.getState().selectedProject) {
        animId = requestAnimationFrame(render)
        return
      }
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }
      animId = requestAnimationFrame(render)
    }
    animId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animId)
      document.documentElement.style.cursor = ''
    }
  }, [isVisible, setCursorState, selectedProject])

  if (isTouchDevice || !isVisible || selectedProject) return null

  const isHover = cursorState === 'hover'
  const isText = cursorState === 'text'

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] rounded-full bg-accent-cyan transition-all duration-fast ${
          isHover ? 'h-3 w-3 bg-accent-violet' : isText ? 'h-5 w-1 rounded-sm bg-accent-cyan' : 'h-2 w-2'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] flex items-center justify-center rounded-full border transition-all duration-base ease-snap ${
          isHover
            ? 'h-14 w-14 border-accent-cyan/80 bg-accent-cyan/10 glow-cyan scale-110'
            : isText
            ? 'h-8 w-8 border-accent-violet/40 bg-accent-violet/5'
            : 'h-8 w-8 border-white/30 bg-transparent'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent-cyan animate-in fade-in duration-150">
            {cursorText}
          </span>
        )}
      </div>
    </>
  )
}
