'use client'

import { useEffect, useRef } from 'react'
import { useScrollStore } from '@/lib/scrollStore'

const TOTAL_FRAMES = 300

function getFrameUrl(index: number): string {
  const frameNum = String(index + 1).padStart(3, '0')
  return `/frames/ezgif-frame-${frameNum}.jpg`
}

/**
 * ScrollVideoBackground — Ultra-smooth canvas-based 300-frame image sequence background.
 *
 * Preloads and asynchronously GPU-decodes all 300 frames from `/frames/ezgif-frame-XXX.jpg`.
 * Uses a persistent 60fps/120fps requestAnimationFrame loop with lerp dampening
 * for silky smooth, lag-free scroll scrubbing.
 */
export default function ScrollVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef<number>(0)
  const lastDrawnFrameRef = useRef<number>(-1)
  const scrollProgressRef = useRef<number>(0)

  const scrollProgress = useScrollStore((state) => state.scrollProgress)
  const setVideoStatus = useScrollStore((state) => state.setVideoStatus)
  const selectedProject = useScrollStore((state) => state.selectedProject)

  // Keep scrollProgressRef updated without tearing down the RAF loop
  useEffect(() => {
    scrollProgressRef.current = scrollProgress
  }, [scrollProgress])

  // ─── 1. Draw frame helper with aspect cover math ─────────────────────
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex))
    const img = imagesRef.current[clampedIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    const imgRatio = imgWidth / imgHeight
    const canvasRatio = canvasWidth / canvasHeight

    let drawWidth = canvasWidth
    let drawHeight = canvasHeight
    let offsetX = 0
    let offsetY = 0

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio
      offsetY = (canvasHeight - drawHeight) / 2
    } else {
      drawWidth = canvasHeight * imgRatio
      offsetX = (canvasWidth - drawWidth) / 2
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    lastDrawnFrameRef.current = clampedIndex
  }

  // ─── 2. Handle canvas dimensions & resize ─────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      // Force redraw current frame on resize
      lastDrawnFrameRef.current = -1
      renderFrame(Math.round(currentFrameRef.current))
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // ─── 3. Preload & async GPU-decode all 300 frame images ───────────
  useEffect(() => {
    setVideoStatus('loading')
    let cancelled = false
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFrameUrl(i)
      images.push(img)

      const onImageReady = () => {
        if (cancelled) return
        loadedCount++

        // Render first frame as soon as frame 0 or early frames load/decode
        if (i === 0 || loadedCount === 1) {
          renderFrame(0)
        }

        if (loadedCount >= TOTAL_FRAMES) {
          setVideoStatus('ready', TOTAL_FRAMES)
        }
      }

      if (typeof img.decode === 'function') {
        img
          .decode()
          .then(onImageReady)
          .catch(() => {
            if (img.complete) {
              onImageReady()
            } else {
              img.onload = onImageReady
              img.onerror = onImageReady
            }
          })
      } else {
        if (img.complete) {
          onImageReady()
        } else {
          img.onload = onImageReady
          img.onerror = onImageReady
        }
      }
    }

    imagesRef.current = images

    return () => {
      cancelled = true
    }
  }, [setVideoStatus])

  // ─── 4. Continuous, persistent RAF ticker (Mounted ONCE) ──────────
  useEffect(() => {
    let animId: number

    const tick = () => {
      const targetProgress = scrollProgressRef.current
      const targetFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetProgress * (TOTAL_FRAMES - 1)))
      
      const diff = targetFrame - currentFrameRef.current

      // Smooth lerp dampening for fluid, responsive 60fps tracking
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.2
      } else {
        currentFrameRef.current = targetFrame
      }

      const frameToDraw = Math.round(currentFrameRef.current)
      if (frameToDraw !== lastDrawnFrameRef.current) {
        renderFrame(frameToDraw)
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, []) // Mounted ONCE — RAF loop is NEVER destroyed/re-created during scroll!

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 h-screen w-screen overflow-hidden select-none transition-opacity duration-300 ${selectedProject ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
      style={{ backgroundColor: '#000000' }}
    >
      {/* ── Ultra-Smooth 60fps Canvas Image Sequence Background ───────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none transform-gpu"
        style={{
          willChange: 'transform',
          filter: 'saturate(1.05) contrast(1.04) brightness(0.88)',
        }}
      />

      {/* ── Cinematic overlay stack ─────────────────────────────────── */}

      {/* Layer 1 — Darkening multiply wash */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-10 mix-blend-multiply" />

      {/* Layer 2 — Left-to-right readability gradient */}
      <div className="absolute inset-y-0 left-0 w-full pointer-events-none z-10 bg-gradient-to-r from-black/80 via-black/35 to-transparent md:from-black/72 md:via-black/20 md:w-[68%]" />

      {/* Layer 3 — Top fade (nav / HUD chrome protection) */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/65 to-transparent pointer-events-none z-10" />

      {/* Layer 4 — Bottom vignette rolloff */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />

      {/* Layer 5 — Radial center vignette (cinematic halation) */}
      <div
        className="absolute inset-0 pointer-events-none z-[12] mix-blend-multiply"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.60) 100%)',
        }}
      />

      {/* Layer 6 — Subtle cyan/violet palette wash */}
      <div className={`absolute inset-0 pointer-events-none z-[15] bg-gradient-to-br from-accent-cyan/[0.04] via-transparent to-accent-violet/[0.06] transition-opacity duration-300 ${selectedProject ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  )
}

