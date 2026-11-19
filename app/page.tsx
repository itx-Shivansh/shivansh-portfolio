import JourneyScene from '@/components/scenes/JourneyScene'
import ProjectsList from '@/components/sections/ProjectsList'
import SkillsScene from '@/components/scenes/SkillsScene'
import ContactScene from '@/components/scenes/ContactScene'

/**
 * Single-page scrolling right column.
 * Rendered inside MainShell's two-column layout.
 * Sections flow naturally: About (Journey) -> Projects -> Skills -> Contact.
 */
export default function Home() {
  return (
    <>
      <JourneyScene />
      <ProjectsList />
      <SkillsScene />
      <ContactScene />
      <footer className="pt-8 pb-12 border-t border-white/10 font-mono text-xs text-neutral-500 flex flex-wrap justify-between items-center gap-3">
        <span>© {new Date().getFullYear()} Shivansh Raj. All rights reserved.</span>
        <span>Delhi Technological University</span>
      </footer>
    </>
  )
}
