'use client'

import { useRef, useEffect } from 'react'
import { projects } from '@/content/projects'
import ProjectDetailOverlay from './ProjectDetailOverlay'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { useScrollStore } from '@/lib/scrollStore'
import clsx from 'clsx'

export default function ProjectsScene() {
  const { selectedProject, setSelectedProject } = useScrollStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      const travel = projects.length * 800

      if (sectionRef.current) {
        sectionRef.current.style.height = `calc(100dvh + ${travel}px)`
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${travel}`,
        pin: containerRef.current,
        scrub: 0.8,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className={clsx(
          'relative w-full select-none bg-transparent overflow-hidden pointer-events-none',
          selectedProject && 'invisible'
        )}
      >
        <div aria-hidden="true" className="absolute top-6 left-6 font-mono text-xs text-white/20 pointer-events-none select-none z-20">
          +
        </div>
        <div aria-hidden="true" className="absolute top-6 right-6 font-mono text-xs text-white/20 pointer-events-none select-none z-20">
          +
        </div>

        <div
          ref={containerRef}
          className={clsx(
            'sticky top-0 flex h-screen h-dvh w-full flex-col justify-center px-4 sm:px-12 md:px-20 lg:px-32 overflow-hidden z-10 pointer-events-none',
            selectedProject && 'opacity-0 pointer-events-none'
          )}
        >
          <div className="absolute top-6 sm:top-12 left-4 sm:left-12 md:left-20 lg:left-32 flex items-center gap-4 z-20">
            <div className="flex items-center gap-3 rounded-full border border-[#F5B800]/30 bg-[#121215]/80 px-4 py-1.5 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-[#F5B800] tracking-widest uppercase">
                CHAPTER 03 // SELECTED WORK
              </span>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] text-text-muted tracking-[0.3em] uppercase opacity-40 pointer-events-none">
            Scroll to Navigate / Click Frame to View Overview
          </div>
        </div>
      </section>

      <ProjectDetailOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
