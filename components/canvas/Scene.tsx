'use client'

import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import CameraRig from './CameraRig'
import ScenePostProcessing from './ScenePostProcessing'
import ProjectCarousel3D from './ProjectCarousel3D'
import { useScrollStore } from '@/lib/scrollStore'

/**
 * WebGL Canvas — transparent R3F layer that composites post-processing
 * (motion blur, chromatic aberration, bloom) on top of the scroll-scrubbed
 * video background. Background objects have been removed; scroll.mp4 is
 * the sole background visual.
 */
export default function Scene() {
  const activeSection = useScrollStore((state) => state.activeSection)
  const selectedProject = useScrollStore((state) => state.selectedProject)
  const isProjectsInteractive = activeSection === 'projects' && !selectedProject

  return (
    <div
      className={clsx(
        'fixed inset-0 h-screen w-screen overflow-hidden transition-all duration-300',
        selectedProject
          ? 'z-[10] pointer-events-none opacity-0 invisible'
          : isProjectsInteractive
          ? 'z-[25] opacity-100 visible'
          : 'z-[15] pointer-events-none opacity-100 visible'
      )}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: isProjectsInteractive ? 'auto' : 'none' }}
      >
        <ambientLight intensity={0.5} />

        {/* Dynamic Continuous Camera & Lighting Rig */}
        <CameraRig />

        {/* Spatial 3D Gallery Carousel */}
        <ProjectCarousel3D />

        {/* Scroll Velocity Post-Processing */}
        <ScenePostProcessing />
      </Canvas>
    </div>
  )
}
