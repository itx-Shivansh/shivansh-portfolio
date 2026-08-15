'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/scrollStore'

export default function ScenePostProcessing() {
  const scrollY = useScrollStore((state) => state.scrollY)
  const selectedProject = useScrollStore((state) => state.selectedProject)
  const prevScrollY = useRef(0)
  const velocityLerped = useRef(0)

  const offsetRef = useRef<THREE.Vector2>(new THREE.Vector2(0.0005, 0.0005))

  useFrame((_, delta) => {
    // 1. Calculate scroll velocity magnitude
    const rawVelocity = Math.abs(scrollY - prevScrollY.current)
    prevScrollY.current = scrollY

    // 2. Smoothly lerp velocity
    velocityLerped.current = THREE.MathUtils.lerp(
      velocityLerped.current,
      rawVelocity,
      delta * 4
    )

    // 3. Map velocity to Chromatic Aberration offset (0.0005 rest -> 0.005 max speed)
    const targetOffset = 0.0005 + Math.min(0.0045, velocityLerped.current * 0.00015)
    offsetRef.current.set(targetOffset, targetOffset)
  })

  return (
    <EffectComposer>
      <Bloom
        intensity={selectedProject ? 0 : 0.4}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.8}
        mipmapBlur
      />
      <ChromaticAberration
        offset={selectedProject ? new THREE.Vector2(0, 0) : offsetRef.current}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  )
}
