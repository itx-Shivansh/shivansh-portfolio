'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/scrollStore'

/**
 * Closing Atmosphere Shift for Contact Chapter:
 * Warms and brightens the background ambient light with a golden/amber glow.
 */
export default function ContactAtmosphere() {
  const lightRef = useRef<THREE.PointLight>(null)
  const activeSection = useScrollStore((state) => state.activeSection)

  useFrame((_, delta) => {
    const isContact = activeSection === 'contact'

    if (lightRef.current) {
      const targetIntensity = isContact ? 1.5 : 0
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        delta * 2
      )
    }
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, -2, 3]}
      color="#f59e0b"
      intensity={0}
      distance={15}
    />
  )
}
