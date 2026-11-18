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
    </>
  )
}
