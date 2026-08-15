'use client'

import { useState } from 'react'
import { skillGroups } from '@/content/skills'
import { sound } from '@/lib/sound'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Programming: (
    <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Frontend: (
    <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  ),
  Backend: (
    <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect width="20" height="8" x="2" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  ),
  Databases: (
    <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  'Artificial Intelligence': (
    <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 0 1 10 10c0 4.418-2.865 8.166-6.839 9.489a2 2 0 0 1-1.344-.067l-2.025-.81a2 2 0 0 0-1.584 0l-2.025.81a2 2 0 0 1-1.344.067C4.865 20.166 2 16.418 2 12A10 10 0 0 1 12 2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Tools: (
    <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
}

export default function SkillsScene() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredGroups = activeCategory
    ? skillGroups.filter((g) => g.category === activeCategory)
    : skillGroups

  return (
    <section
      id="skills"
      className="relative w-full select-none py-20 px-6 sm:px-12 md:px-20 lg:pl-32 lg:pr-16"
    >
      <div className="w-full max-w-7xl mx-auto space-y-10 z-10 relative pointer-events-auto select-none">
        {/* ── Top Header Row ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F5B800]/30 bg-[#121215]/80 px-4 py-1.5 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#F5B800] tracking-widest uppercase">
                CHAPTER 04 // TECHNICAL MATRIX
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="text-white">Skills &amp; </span>
              <span className="text-[#F5B800]">Competencies</span>
            </h2>
            <div className="flex items-center gap-3 text-neutral-300 text-sm font-normal tracking-wide">
              <span className="w-6 h-[2px] bg-[#F5B800] rounded-full inline-block" />
              <p>A curated overview of my technical expertise across different domains and technologies.</p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
            <button
              onClick={() => {
                sound.playClick()
                setActiveCategory(null)
              }}
              onMouseEnter={() => sound.playHover()}
              className={`rounded-full border px-4 py-2 font-mono text-xs font-bold transition-all duration-200 ${
                activeCategory === null
                  ? 'border-[#F5B800] bg-[#1a1710] text-[#F5B800] shadow-[0_0_12px_rgba(245,184,0,0.2)]'
                  : 'border-white/10 bg-[#0e0e11]/80 text-neutral-400 hover:border-white/30 hover:text-white'
              }`}
            >
              ALL ({skillGroups.length})
            </button>

            {skillGroups.map((group) => {
              const isSelected = activeCategory === group.category
              return (
                <button
                  key={group.category}
                  onClick={() => {
                    sound.playClick()
                    setActiveCategory(isSelected ? null : group.category)
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`rounded-full border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'border-[#F5B800] bg-[#1a1710] text-[#F5B800] shadow-[0_0_12px_rgba(245,184,0,0.2)]'
                      : 'border-white/10 bg-[#0e0e11]/80 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {group.category.toUpperCase()}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Main Content Grid: 6 Skill Cards + Right Overview Stack ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Category Skill Cards Grid (2 Columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <div
                key={group.category}
                className="group rounded-2xl border border-white/10 bg-[#0d0d10]/80 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 hover:border-[#F5B800]/40 space-y-4"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1b1912] border border-[#F5B800]/30 flex items-center justify-center shrink-0">
                      {CATEGORY_ICONS[group.category] || (
                        <svg className="w-5 h-5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="12" cy="12" r="8" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-display text-base font-bold text-white">
                      {group.category}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#F5B800] uppercase tracking-wider">
                    {group.skills.length} MODULES
                  </span>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {group.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => sound.playHover()}
                      className="rounded-xl border border-white/10 bg-[#121215] px-3.5 py-2 text-xs font-medium text-neutral-200 transition-all duration-200 hover:border-[#F5B800]/50 hover:text-[#F5B800] flex items-center justify-between gap-2"
                    >
                      <span className="font-semibold text-white">{skill.name}</span>
                      {skill.level && (
                        <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-tight opacity-75">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Skills Overview & Quote Stack */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Skills Overview Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0d0d10]/80 backdrop-blur-xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1a1710] border border-[#F5B800]/40 flex items-center justify-center text-[#F5B800]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-[#F5B800]">Skills Overview</h3>
              </div>

              {/* Stat 1 */}
              <div className="space-y-0.5">
                <div className="font-display text-3xl font-extrabold text-white">6</div>
                <div className="text-xs text-neutral-400 font-medium">Categories</div>
              </div>

              {/* Stat 2 */}
              <div className="space-y-0.5 pt-2 border-t border-white/5">
                <div className="font-display text-3xl font-extrabold text-white">22+</div>
                <div className="text-xs text-neutral-400 font-medium">Technologies</div>
              </div>

              {/* Stat 3 */}
              <div className="space-y-0.5 pt-2 border-t border-white/5">
                <div className="font-display text-xl font-bold text-[#F5B800]">Advanced</div>
                <div className="text-xs text-neutral-400 font-medium">In Problem Solving &amp; Building Solutions</div>
              </div>
            </div>

            {/* Card 2: Quote Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0d0d10]/80 backdrop-blur-xl p-6 shadow-2xl space-y-3">
              <div className="text-[#F5B800] font-serif text-4xl leading-none">&ldquo;</div>
              <p className="text-neutral-200 text-xs sm:text-sm italic font-normal leading-relaxed">
                I focus on learning deeply, building consistently, and solving real-world problems with clean and efficient code.
              </p>
              <div className="font-mono text-xs font-bold text-[#F5B800] pt-1">
                &mdash; Shivansh Raj
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

