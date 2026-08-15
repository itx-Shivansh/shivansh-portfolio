'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/scrollStore'

/**
 * CameraRig & Dynamic Lighting Controller:
 * Smoothly interpolates 3D camera position, field of view (FOV), and scene lighting
 * across all five chapters based on global scrollProgress (0 to 1).
 */
export default function CameraRig() {
  const { camera } = useThree()
  const scrollProgress = useScrollStore((state) => state.scrollProgress)
  const selectedProject = useScrollStore((state) => state.selectedProject)

  const dirLight1Ref = useRef<THREE.DirectionalLight>(null)
  const dirLight2Ref = useRef<THREE.DirectionalLight>(null)

  // Pre-allocated THREE vectors and colors to avoid GC allocation overhead
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 8))
  const colorCyan = useRef(new THREE.Color('#00d9ff'))
  const colorViolet = useRef(new THREE.Color('#8b5cf6'))
  const colorGold = useRef(new THREE.Color('#f59e0b'))
  const currentLightColor = useRef(new THREE.Color('#00d9ff'))

  useFrame((_, delta) => {
    // If a project is selected, let ProjectCarousel3D handle camera positioning
    if (selectedProject) return

    const p = Math.max(0, Math.min(1, scrollProgress))

    // 1. Calculate camera position keyframe interpolation across 5 chapters
    if (p < 0.22) {
      // Hero chapter (0.00 -> 0.22)
      const t = p / 0.22
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0, 1.2, t),
        THREE.MathUtils.lerp(0, -0.6, t),
        THREE.MathUtils.lerp(8, 7.2, t)
      )
      currentLightColor.current.copy(colorCyan.current).lerp(colorViolet.current, t)
    } else if (p < 0.48) {
      // Journey chapter (0.22 -> 0.48)
      const t = (p - 0.22) / 0.26
      targetCamPos.current.set(
        THREE.MathUtils.lerp(1.2, -1.5, t),
        THREE.MathUtils.lerp(-0.6, 0.8, t),
        THREE.MathUtils.lerp(7.2, 6.4, t)
      )
      currentLightColor.current.copy(colorViolet.current).lerp(colorCyan.current, t)
    } else if (p < 0.75) {
      // Projects chapter (0.48 -> 0.75)
      const t = (p - 0.48) / 0.27
      targetCamPos.current.set(
        THREE.MathUtils.lerp(-1.5, 0, t),
        THREE.MathUtils.lerp(0.8, 1.0, t),
        THREE.MathUtils.lerp(6.4, 7.5, t)
      )
      currentLightColor.current.copy(colorCyan.current).lerp(colorViolet.current, t)
    } else {
      // Skills -> Contact finale (0.75 -> 1.00)
      const t = (p - 0.75) / 0.25
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0, 0, t),
        THREE.MathUtils.lerp(1.0, -0.4, t),
        THREE.MathUtils.lerp(7.5, 6.2, t)
      )
      currentLightColor.current.copy(colorViolet.current).lerp(colorGold.current, t)
    }

    // 2. Smoothly lerp camera position
    camera.position.lerp(targetCamPos.current, delta * 3)
    camera.lookAt(0, 0, 0)

    // 3. Smoothly lerp directional light color
    if (dirLight1Ref.current) {
      dirLight1Ref.current.color.lerp(currentLightColor.current, delta * 2)
    }
  })

  return (
    <>
      <directionalLight
        ref={dirLight1Ref}
        position={[10, 10, 5]}
        intensity={1}
        color="#00d9ff"
      />
      <directionalLight
        ref={dirLight2Ref}
        position={[-10, -10, -5]}
        intensity={0.5}
        color="#8b5cf6"
      />
    </>
  )
}
