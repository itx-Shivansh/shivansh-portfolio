'use client'

import { SectionId } from '@/lib/constants'
import { useScrollStore } from '@/lib/scrollStore'
import { sound } from '@/lib/sound'

interface NavItem {
  id: string
  targetSection: SectionId
  label: string
  icon: React.ReactNode
}

export default function Nav() {
  const { activeSection, scrollToSection, selectedProject } = useScrollStore()

  if (selectedProject) return null

  const handleNavClick = (target: SectionId) => {
    sound.playClick()
    scrollToSection(target)
  }

  const navItems: NavItem[] = [
    {
      id: 'home',
      targetSection: 'hero',
      label: 'Home',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      id: 'about',
      targetSection: 'journey',
      label: 'About',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'projects',
      targetSection: 'projects',
      label: 'Projects',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect width="18" height="14" x="3" y="6" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: 'skills',
      targetSection: 'skills',
      label: 'Skills',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: 'contact',
      targetSection: 'contact',
      label: 'Contact',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* ── Top-Right Header Status Info Bar ────────────────────────────── */}
      <div className="fixed top-6 right-8 z-40 hidden md:flex items-center gap-6 font-mono text-[11px] font-semibold tracking-wider pointer-events-auto select-none">
        <div className="flex items-center gap-2 text-[#F5B800]">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>DELHI, INDIA</span>
        </div>

        <div className="flex items-center gap-2 text-[#F5B800]">
          <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
          <span>AVAILABLE FOR OPPORTUNITIES</span>
        </div>
      </div>

      {/* ── Left Floating Vertical Sidebar Dock ───────────────────────── */}
      <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center justify-between h-[600px] w-20 py-6 bg-[#0c0c0e]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl pointer-events-auto select-none">
        {/* Top SR Monogram Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          onMouseEnter={() => sound.playHover()}
          className="relative group w-11 h-11 rounded-xl bg-[#1a1710] border border-[#F5B800]/40 flex items-center justify-center shadow-lg transition-all duration-300 hover:border-[#F5B800] hover:scale-105"
          aria-label="Go to Home"
        >
          <span className="font-extrabold text-sm tracking-tighter text-[#F5B800]">SR</span>
        </button>

        {/* Navigation Items Stack */}
        <nav className="flex flex-col items-center gap-5 w-full">
          {navItems.map((item) => {
            const isActive =
              (item.id === 'home' && activeSection === 'hero') ||
              (item.id === 'about' && activeSection === 'journey') ||
              (item.id === 'projects' && activeSection === 'projects') ||
              (item.id === 'skills' && activeSection === 'skills') ||
              (item.id === 'contact' && activeSection === 'contact')

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetSection)}
                onMouseEnter={() => sound.playHover()}
                className={`relative group flex flex-col items-center justify-center w-full py-1.5 transition-all duration-200 ${
                  isActive ? 'text-[#F5B800]' : 'text-neutral-400 hover:text-white'
                }`}
                aria-label={`Navigate to ${item.label}`}
              >
                {/* Active Indicator Bar on Left Edge */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#F5B800] rounded-r-full shadow-[0_0_8px_#F5B800]" />
                )}

                <div className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#F5B800]' : ''}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-medium tracking-tight mt-1 ${isActive ? 'text-[#F5B800] font-semibold' : 'text-neutral-400 group-hover:text-white'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bottom Social Links Stack */}
        <div className="flex flex-col items-center gap-3 text-neutral-400">
          {/* GitHub */}
          <a
            href="https://github.com/itx-Shivansh"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="hover:text-[#F5B800] transition-colors p-1.5"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/shivansh-raj-429733229/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="hover:text-[#F5B800] transition-colors p-1.5"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/only.shivanshhh/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="hover:text-[#F5B800] transition-colors p-1.5"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* Mail */}
          <a
            href="mailto:shivanshrajoo@gmail.com"
            onMouseEnter={() => sound.playHover()}
            className="hover:text-[#F5B800] transition-colors p-1.5"
            aria-label="Email"
          >
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  )
}


