'use client'

import { projects, Project } from '@/content/projects'
import { useScrollStore } from '@/lib/scrollStore'
import { sound } from '@/lib/sound'
import ProjectDetailOverlay from '@/components/scenes/ProjectDetailOverlay'

export default function ProjectsList() {
  const { selectedProject, setSelectedProject } = useScrollStore()

  const handleCardClick = (project: Project) => {
    sound.playClick()
    setSelectedProject(project)
  }

  return (
    <section id="projects" className="relative w-full space-y-6 scroll-mt-20">
      {/* Section Header / Chapter Badge */}
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

      {/* HTML Cards List with lg hover-dimming */}
      <div className="space-y-4 lg:group/projects">
        {projects.map((project) => (
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleCardClick(project)
              }
            }}
            onMouseEnter={() => sound.playHover()}
            className="group relative block w-full rounded-2xl border border-white/10 bg-surface-card hover:bg-surface-card-hover p-6 sm:p-7 text-left transition-all duration-300 hover:border-[#F5B800]/60 hover:shadow-[0_0_25px_rgba(245,184,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] cursor-pointer lg:group-hover/projects:opacity-60 lg:hover:!opacity-100"
            aria-label={`Open project details for ${project.title}`}
          >
            <div className="space-y-3">
              {/* Role Line & Arrow Indicator */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-[#F5B800] tracking-wide uppercase">
                  {project.role}
                </span>
                <span className="text-neutral-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#F5B800]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
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
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
