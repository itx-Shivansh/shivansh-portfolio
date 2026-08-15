'use client'

import { useEffect, useState } from 'react'
import { useScrollStore } from '@/lib/scrollStore'
import { SECTION_ORDER } from '@/lib/constants'
import { sound } from '@/lib/sound'

export default function DebugHUD() {
  const { isDebugOpen, setIsDebugOpen, activeSection, scrollProgress, scrollY, chapterProgress, cursorState, selectedProject } =
    useScrollStore()

  const [fps, setFps] = useState<number>(60)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const calcFps = () => {
      frameCount++
      const now = performance.now()
      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }
      animationFrameId = requestAnimationFrame(calcFps)
    }

    animationFrameId = requestAnimationFrame(calcFps)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Only render in development environment
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  if (selectedProject) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-auto font-mono text-caption select-none">
      {/* Toggle Button */}
      <button
        onClick={() => {
          sound.playClick()
          setIsDebugOpen((prev) => !prev)
        }}
        onMouseEnter={() => sound.playHover()}
        data-cursor="interactive"
        data-cursor-text="DEBUG"
        className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0e0e11]/80 px-4 py-2 backdrop-blur-md transition-all duration-200 hover:border-[#F5B800]/50 hover:bg-black/90 shadow-xl"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-mono text-xs font-bold tracking-wider text-white">
          DEBUG MODE
        </span>
        <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-[#F5B800]">
          &gt;_
        </span>
      </button>

      {/* Expanded HUD Panel */}
      {isDebugOpen && (
        <div className="mt-2 w-72 rounded-xl border border-border-subtle bg-bg-glass p-4 backdrop-blur-xl space-y-3 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-border-subtle/50 pb-2">
            <span className="font-bold text-accent-cyan">SYSTEM DEBUG HUD</span>
            <span className="text-text-muted">{fps} FPS</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-text-muted">Active Chapter:</span>
              <span className="font-semibold text-accent-cyan uppercase">{activeSection}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-muted">Global Progress:</span>
              <span className="text-text-primary">{(scrollProgress * 100).toFixed(1)}%</span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-muted">Scroll Y:</span>
              <span className="text-text-primary">{Math.round(scrollY)}px</span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-muted">Cursor Mode:</span>
              <span className="text-accent-violet">{cursorState}</span>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-border-subtle/50 pt-2">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
              Chapter Progress Breakdown
            </p>
            {SECTION_ORDER.map((id) => {
              const prog = chapterProgress[id] || 0
              return (
                <div key={id} className="space-y-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-text-secondary uppercase">{id}</span>
                    <span className="text-text-muted">{(prog * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-bg-base">
                    <div
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet transition-all duration-fast"
                      style={{ width: `${prog * 100}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
