'use client'

import { SectionId } from '@/lib/constants'
import { useScrollStore } from '@/lib/scrollStore'
import { sound } from '@/lib/sound'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'motion/react'

export interface NavRailItem {
  id: string
  targetSection: SectionId
  label: string
}

export const NAV_ITEMS: NavRailItem[] = [
  {
    id: 'about',
    targetSection: 'journey',
    label: 'About',
  },
  {
    id: 'projects',
    targetSection: 'projects',
    label: 'Projects',
  },
  {
    id: 'skills',
    targetSection: 'skills',
    label: 'Skills',
  },
  {
    id: 'contact',
    targetSection: 'contact',
    label: 'Contact',
  },
]

/**
 * Desktop Nav Rail:
 * Clean, minimal editorial nav with an expanding indicator line.
 * Active item: gold text and 64px line.
 * Inactive items: muted text and 32px line, expands to 64px and white on hover.
 */
export function NavRail() {
  const { activeSection, scrollToSection } = useScrollStore()
  const prefersReduced = useReducedMotion()

  const handleNavClick = (target: SectionId) => {
    sound.playClick()
    scrollToSection(target)
  }

  return (
    <nav aria-label="In-page navigation" className="hidden lg:block py-6">
      <ul className="space-y-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.targetSection

          return (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.targetSection)}
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center py-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5B800] rounded-sm"
                aria-label={`Jump to ${item.label} section`}
              >
                {/* Horizontal Indicator Line Container */}
                <span className="relative mr-4 h-[2px] w-16 flex items-center">
                  {isActive ? (
                    <motion.span
                      layoutId="navRailActiveLine"
                      className="absolute inset-y-0 left-0 h-[2px] w-16 rounded-full bg-[#F5B800] shadow-[0_0_8px_rgba(245,184,0,0.5)]"
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 30 }
                      }
                    />
                  ) : (
                    <span className="h-[2px] w-8 rounded-full bg-neutral-600 transition-all duration-300 ease-out group-hover:w-16 group-hover:bg-neutral-200" />
                  )}
                </span>
                {/* Label */}
                <span
                  className={clsx(
                    'transition-colors duration-300',
                    isActive
                      ? 'text-[#F5B800] font-bold'
                      : 'text-neutral-400 group-hover:text-white'
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/**
 * Global Nav Component:
 * Renders the mobile bottom dock bar and top-right status bar.
 * (Desktop aside is replaced by the left column's NavRail).
 */
export default function Nav() {
  const { activeSection, scrollToSection, selectedProject } = useScrollStore()
  const prefersReduced = useReducedMotion()

  if (selectedProject) return null

  const handleNavClick = (target: SectionId) => {
    sound.playClick()
    scrollToSection(target)
  }

  return (
    <>
      {/* ── Top-Right Header Status Info Bar ────────────────────────────── */}
      <div className="fixed top-6 right-8 z-40 hidden md:flex items-center gap-6 font-mono text-[11px] font-semibold tracking-wider pointer-events-auto select-none">
        <div className="flex items-center gap-2 text-[#F5B800]">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>DELHI, INDIA</span>
        </div>

        <div className="flex items-center gap-2 text-[#F5B800]">
          <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse" />
          <span>AVAILABLE FOR OPPORTUNITIES</span>
        </div>
      </div>

      {/* ── Mobile Floating Bottom Dock Bar ─────────────────────────────── */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex lg:hidden items-center gap-1 p-1.5 bg-[#0c0c0e]/90 backdrop-blur-xl border border-white/15 rounded-full shadow-2xl pointer-events-auto select-none max-w-[92vw]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.targetSection

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.targetSection)}
              className="relative min-w-[48px] min-h-[44px] px-3.5 py-2 rounded-full flex flex-col items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5B800]"
              aria-label={`Navigate to ${item.label}`}
            >
              {isActive && (
                <motion.span
                  layoutId="mobileNavActivePill"
                  className="absolute inset-0 rounded-full bg-[#1c180e] border border-[#F5B800]/50 shadow-[0_0_10px_rgba(245,184,0,0.2)]"
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 400, damping: 32 }
                  }
                />
              )}
              <span
                className={clsx(
                  'relative z-10 text-[10px] font-mono tracking-tight uppercase transition-colors',
                  isActive ? 'text-[#F5B800] font-bold' : 'text-neutral-400 hover:text-white'
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
