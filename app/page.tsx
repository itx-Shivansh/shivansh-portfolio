import HeroScene from '@/components/scenes/HeroScene'
import JourneyScene from '@/components/scenes/JourneyScene'
import ProjectsScene from '@/components/scenes/ProjectsScene'
import SkillsScene from '@/components/scenes/SkillsScene'
import ContactScene from '@/components/scenes/ContactScene'

/**
 * Single-page scroll experience.
 * Each scene component renders one <section id="..."> chapter.
 * Chunk 2 will wire up Lenis smooth scroll + GSAP ScrollTrigger here.
 */
export default function Home() {
  return (
    <>
      <HeroScene />
      <JourneyScene />
      <ProjectsScene />
      <SkillsScene />
      <ContactScene />
    </>
  )
}
