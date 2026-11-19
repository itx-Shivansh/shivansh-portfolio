'use client'

import clsx from 'clsx'
import { identity } from '@/content/identity'
import { contact } from '@/content/contact'
import { useScrollStore } from '@/lib/scrollStore'
import { sound } from '@/lib/sound'
import { NavRail } from '@/components/ui/Nav'

export default function MainShell({ children }: { children: React.ReactNode }) {
  const selectedProject = useScrollStore((state) => state.selectedProject)
  const isLoaded = useScrollStore((state) => state.isLoaded)
  const scrollToSection = useScrollStore((state) => state.scrollToSection)

  return (
    <main
      id="main-content"
      className={clsx(
        'relative transition-opacity duration-500 bg-transparent',
        !isLoaded || selectedProject
          ? 'pointer-events-none opacity-0 invisible -z-10'
          : 'z-[20] opacity-100 visible'
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16 bg-transparent">
        <div className="lg:flex lg:justify-between lg:gap-12 bg-transparent">
          {/* ── Fixed Left Column (Sticky at lg and up) ──────────────────── */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-dvh lg:h-dvh lg:w-[44%] lg:flex-col lg:justify-between lg:py-20 xl:py-24 pt-16 pb-10 bg-transparent select-none min-w-0">
            {/* Top Identity Block */}
            <div className="space-y-5 container-inline min-w-0">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F5B800]/30 bg-surface-card px-3.5 py-1 text-xs font-mono font-semibold text-[#F5B800]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] animate-pulse" />
                <span>ENGINEERING &amp; AI · DTU</span>
              </div>

              {/* Name Headline */}
              <h1 className="font-display font-black uppercase tracking-tight leading-[0.9] text-[clamp(2rem,10.5cqw,4.5rem)]">
                <span className="block text-white whitespace-nowrap">SHIVANSH</span>
                <span className="block text-[#F5B800] whitespace-nowrap">RAJ</span>
              </h1>

              {/* Role Line */}
              <p className="font-mono text-sm sm:text-base font-semibold text-neutral-200 tracking-wide">
                Software Engineer &amp; AI Developer
              </p>

              {/* Tagline & Short Bio */}
              <div className="space-y-3 pt-1 max-w-md">
                <p className="text-sm font-medium text-neutral-300">
                  Building intelligent software solutions for{' '}
                  <span className="text-[#F5B800] font-semibold">real-world</span> impact.
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                  {identity.positioningStatement}
                </p>
              </div>
            </div>

            {/* Middle: Desktop Nav Rail */}
            <NavRail />

            {/* Bottom Actions & Social Links */}
            <div className="space-y-6 pt-6 lg:pt-0">
              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="px-5 py-2.5 rounded-xl border border-white/20 bg-surface-card hover:bg-surface-card-hover text-white font-mono text-xs font-medium transition-all duration-200 hover:border-[#F5B800]/50 hover:text-[#F5B800] flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]"
                  aria-label="Download Resume PDF"
                >
                  <span>RESUME</span>
                  <svg className="w-3.5 h-3.5 text-[#F5B800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>

                <button
                  onClick={() => {
                    sound.playClick()
                    scrollToSection('contact')
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="px-5 py-2.5 rounded-xl bg-[#F5B800] hover:bg-[#e0a700] text-black font-mono text-xs font-bold transition-all shadow-md hover:shadow-[#F5B800]/25 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Jump to Contact section"
                >
                  <span>GET IN TOUCH</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Social Links Row */}
              <div className="flex items-center gap-4 text-neutral-400">
                {/* GitHub */}
                <a
                  href="https://github.com/itx-Shivansh"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-[#F5B800] transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5B800]"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/shivansh-raj-429733229/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-[#F5B800] transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5B800]"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/only.shivanshhh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-[#F5B800] transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5B800]"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contact.email}`}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-[#F5B800] transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5B800]"
                  aria-label="Send Email"
                >
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </header>

          {/* ── Scrolling Right Column (Normal Document Flow) ───────────── */}
          <div className="lg:w-[54%] min-w-0 py-12 lg:py-20 xl:py-24 bg-transparent space-y-24 sm:space-y-32">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
