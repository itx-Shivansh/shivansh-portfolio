'use client'

import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Project } from '@/content/projects'
import { gsap, ease, duration } from '@/lib/motion'
import { sound } from '@/lib/sound'
import { useScrollStore } from '@/lib/scrollStore'

interface ProjectDetailOverlayProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetailOverlay({ project, onClose }: ProjectDetailOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lenis = useScrollStore((state) => state.lenis)

  const handleClose = useCallback(() => {
    sound.playClick()
    if (overlayRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: duration.base,
        ease: ease.exit,
      })
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: duration.base,
        ease: ease.exit,
        onComplete: () => {
          if (lenis) lenis.start()
          onClose()
        },
      })
    } else {
      if (lenis) lenis.start()
      onClose()
    }
  }, [onClose, lenis])

  useEffect(() => {
    if (!project) return

    sound.playTransition()

    if (lenis) lenis.stop()

    // Snapshot refs to avoid stale closure in cleanup
    const overlayNode = overlayRef.current
    const contentNode = contentRef.current

    // Animate overlay entrance
    if (overlayNode && contentNode) {
      gsap.fromTo(
        overlayNode,
        { opacity: 0 },
        { opacity: 1, duration: duration.base, ease: ease.enter }
      )
      gsap.fromTo(
        contentNode,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: duration.slow, ease: ease.snap, delay: 0.05 }
      )
    }

    // Keyboard accessibility: Escape to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    // Prevent ALL wheel/touch events inside modal from leaking to background
    const preventLeak = (e: Event) => e.stopPropagation()

    window.addEventListener('keydown', handleKeyDown)
    if (overlayNode) {
      overlayNode.addEventListener('wheel', preventLeak, { capture: true })
      overlayNode.addEventListener('touchmove', preventLeak, { capture: true })
    }
    document.body.style.overflow = 'hidden' // Lock background scroll while modal open
    document.documentElement.style.overflow = 'hidden' // Also lock html element to be safe
    // Force native cursor to be visible during modal — safety net
    document.documentElement.style.cursor = 'auto'
    document.body.style.cursor = 'auto'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (overlayNode) {
        overlayNode.removeEventListener('wheel', preventLeak, { capture: true })
        overlayNode.removeEventListener('touchmove', preventLeak, { capture: true })
      }
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      // Re-enable custom cursor engine after modal fully closes
      document.documentElement.style.cursor = ''
      document.body.style.cursor = ''
    }
  }, [project, handleClose, lenis])

  if (!project) return null

  const overlayContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-bg-base p-6 backdrop-blur-2xl md:p-12 lg:p-16 select-none"
      style={{
        zIndex: 2147483647,
        isolation: 'isolate',
      }}
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      {/* Modal Container */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
        className="relative my-auto w-full max-w-4xl rounded-3xl border border-border-subtle bg-bg-surface p-8 shadow-2xl backdrop-blur-xl md:p-12 space-y-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#F5B800]/40 bg-[#1c180e] px-4 py-1 font-mono text-xs font-bold text-[#F5B800] shadow-md">
              {project.role}
            </span>
          </div>

          <button
            onClick={handleClose}
            data-cursor="interactive"
            data-cursor-text="CLOSE"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#121215] px-4 py-2 text-xs font-semibold text-neutral-300 transition-all duration-200 hover:border-[#F5B800]/60 hover:text-white"
          >
            <span>Close</span>
            <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
              ESC
            </span>
          </button>
        </div>

        {/* Title & Hook */}
        <div className="space-y-4">
          <h2
            id="project-detail-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            {project.title}
          </h2>
          <p className="font-display text-lg sm:text-xl font-normal text-[#F5B800]">
            {project.hook}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-3">
          <p className="font-mono text-xs font-bold text-[#F5B800] tracking-widest uppercase">TECHNOLOGY STACK</p>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="rounded-xl border border-white/10 bg-[#121215] px-3.5 py-1.5 text-xs font-semibold text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Capability & Architecture Section (data-driven) OR Generic Highlights */}
        {project.capabilities && project.architectureHighlights ? (
          <div className="space-y-8 border-t border-white/10 pt-8">
            {/* Capability cards heading */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white">
                {project.sectionTitle || 'Capabilities & Highlights'}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="group rounded-2xl border border-white/10 bg-[#121215]/80 p-5 transition-all duration-300 hover:border-[#F5B800]/50 hover:bg-[#1a1710]/50"
                  >
                    <div className="flex items-start gap-2.5 mb-2">
                      <span className="font-mono text-xs text-[#F5B800] mt-0.5 select-none">
                        {cap.icon}
                      </span>
                      <h4 className="font-display text-base font-bold text-white leading-tight">
                        {cap.title}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-300 mb-3 leading-relaxed pl-5">
                      {cap.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pl-5">
                      {cap.keyConcepts.map((concept, i) => (
                        <span
                          key={i}
                          className="font-mono text-[10px] tracking-wider text-[#F5B800] uppercase px-2 py-0.5 rounded bg-[#1c180e] border border-[#F5B800]/30"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture & Engineering Highlights */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="font-display text-lg font-bold text-white">
                Architecture &amp; Engineering Highlights
              </h3>
              <ul className="space-y-2.5">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#F5B800] shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4 border-t border-white/10 pt-8">
            <h3 className="font-display text-lg font-bold text-white">
              Key Architecture &amp; Highlights
            </h3>
            <ul className="space-y-3">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#F5B800] shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Media Preview Grid */}
        <div className="space-y-4 border-t border-white/10 pt-8">
          <h3 className="font-display text-lg font-bold text-white">
            Media &amp; Artifacts
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.media.map((mediaItem, idx) => {
              const isObject = typeof mediaItem === 'object' && mediaItem !== null
              const label = isObject ? mediaItem.label : mediaItem
              const src = isObject ? mediaItem.src : undefined
              const type = isObject ? mediaItem.type : undefined
              const isVideo = type === 'video' && src

              return (
                <div
                  key={idx}
                  className="group relative flex h-48 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#121215] to-[#0c0c0e] transition-all duration-300 hover:border-[#F5B800]/50 shadow-xl"
                >
                  {isVideo ? (
                    <video
                      src={src}
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                  <div className="relative z-10 p-5 flex flex-col justify-end h-full">
                    <span className="font-mono text-xs font-bold text-[#F5B800] mb-1">
                      0{idx + 1} &frasl;&frasl; {isVideo ? 'VIDEO PREVIEW' : 'MEDIA ARTIFACT'}
                    </span>
                    <span className="font-display text-sm font-bold text-white">
                      {label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Actions / Links */}
        <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#121215] px-6 py-3.5 text-xs font-semibold text-white transition-all duration-200 hover:border-[#F5B800]/60 hover:text-[#F5B800] shadow-lg"
            >
              <span>GitHub Repository</span>
              <span className="text-[#F5B800] font-bold transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          )}

          {project.links.live && project.links.live !== '#' && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#F5B800] to-[#E65100] hover:brightness-110 px-7 py-3.5 text-xs font-mono font-extrabold text-black transition-all shadow-lg hover:scale-[1.02]"
            >
              <span>View Live Demo</span>
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(overlayContent, document.body)
}
