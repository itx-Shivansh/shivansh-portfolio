'use client'

import { motion, useReducedMotion } from 'motion/react'
import { projects, Project } from '@/content/projects'
import { useScrollStore } from '@/lib/scrollStore'
import { sound } from '@/lib/sound'
import ProjectDetailOverlay from '@/components/scenes/ProjectDetailOverlay'

export default function ProjectsList() {
  const { selectedProject, setSelectedProject } = useScrollStore()
  const prefersReduced = useReducedMotion()

  const handleCardClick = (project: Project) => {
    sound.playClick()
    setSelectedProject(project)
  }

  return (
    <section id="projects" className="relative w-full space-y-6 scroll-mt-20">
      {/* Section Header / Chapter Badge */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-full border border-[#F5B800]/30 bg-surface-card px-4 py-1.5 flex items-center gap-2.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#F5B800] tracking-widest uppercase">
              Projects
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Featured Work
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Selected AI, full-stack, and automation applications. Click any project to inspect architecture and details.
          </p>
        </div>
      </motion.div>

      {/* HTML Cards List with lg hover-dimming */}
      <div className="space-y-4 lg:group/projects">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: prefersReduced ? 0 : 0.5,
              delay: prefersReduced ? 0 : index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={prefersReduced ? {} : { y: -3 }}
            onMouseEnter={() => sound.playHover()}
            className="group relative block w-full rounded-2xl border border-white/10 bg-surface-card hover:bg-surface-card-hover p-6 sm:p-7 text-left transition-colors duration-300 hover:border-[#F5B800]/60 hover:shadow-[0_0_25px_rgba(245,184,0,0.12)] has-[:focus-visible]:border-[#F5B800] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#F5B800] cursor-pointer lg:group-hover/projects:opacity-60 lg:hover:!opacity-100"
          >
            {/* Primary Clickable Area for opening project details (sibling to external links, no nesting) */}
            <button
              type="button"
              onClick={() => handleCardClick(project)}
              className="absolute inset-0 z-0 h-full w-full rounded-2xl focus:outline-none"
              aria-label={`Open project details for ${project.title}`}
            />

            {/* Card Content Area */}
            <div className="relative z-[1] pointer-events-none space-y-3">
              {/* Role Line & Links / Arrow Indicator */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-[#F5B800] tracking-wide uppercase">
                  {project.role}
                </span>

                <div className="flex items-center gap-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation()
                        sound.playClick()
                      }}
                      className="pointer-events-auto inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-neutral-300 transition-colors hover:border-[#F5B800]/50 hover:text-[#F5B800] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F5B800]"
                      aria-label={`${project.title} GitHub repository (opens in a new tab)`}
                    >
                      <span>GitHub</span>
                      <span className="text-[#F5B800] font-bold">↗</span>
                    </a>
                  )}

                  <span className="text-neutral-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#F5B800]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#F5B800] transition-colors">
                {project.title}
              </h3>

              {/* Hook / Description */}
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {project.hook}
              </p>

              {/* Technologies Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-neutral-300 transition-colors group-hover:border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Detail Overlay */}
      <ProjectDetailOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
