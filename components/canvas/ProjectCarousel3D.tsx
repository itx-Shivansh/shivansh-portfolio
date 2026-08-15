'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { projects } from '@/content/projects'
import ProjectCard3D from './ProjectCard3D'
import { useScrollStore } from '@/lib/scrollStore'
import { sound } from '@/lib/sound'

export default function ProjectCarousel3D() {
  const { chapterProgress, activeSection, selectedProject, setSelectedProject } = useScrollStore()
  const { camera } = useThree()
  const carouselRef = useRef<THREE.Group>(null)

  // We only show the carousel when the Projects section is active or nearby
  const progress = chapterProgress['projects'] || 0

  // Derived progress mapped to card indices
  const currentScrollIndex = progress * (projects.length - 1)

  const targetCamPos = useRef(new THREE.Vector3(0, 0, 8))
  const groupOpacity = useRef(0)
  const activeProjectId = selectedProject?.id ?? null

  useFrame((state, delta) => {
    if (!carouselRef.current) return

    // Visibility control - strictly restricted to projects section
    // Use lerp for smooth fade in/out
    const isTargetSection = activeSection === 'projects'
    groupOpacity.current = THREE.MathUtils.lerp(
      groupOpacity.current,
      isTargetSection ? 1 : 0,
      0.1
    )

    carouselRef.current.visible = groupOpacity.current > 0.01

    // Camera Zoom / Focus State
    if (selectedProject) {
      targetCamPos.current.set(0, 0, 4.5)
      camera.position.lerp(targetCamPos.current, delta * 3)
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <group ref={carouselRef} position={[0, 0, 0]}>
      {projects.map((project, index) => {
        const isActive = activeProjectId === project.id
        const baseOpacity = activeProjectId
          ? isActive ? 1 : 0.3
          : 1
        return (
          <ProjectCard3D
            key={project.id}
            project={project}
            index={index}
            active={isActive}
            progress={currentScrollIndex}
            opacityBase={baseOpacity}
            groupOpacityRef={groupOpacity}
            onClick={() => {
              sound.playClick()
              setSelectedProject(project)
            }}
            onHover={() => {
              // Can trigger global scene effects here
            }}
          />
        )
      })}
    </group>
  )
}
