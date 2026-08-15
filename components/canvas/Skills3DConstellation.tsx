'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/scrollStore'

/**
 * Orbiting 3D Constellation Nodes representing Shivansh's skill network.
 */
export default function Skills3DConstellation() {
  const groupRef = useRef<THREE.Group>(null)
  const activeSection = useScrollStore((state) => state.activeSection)

  const count = 30
  const [positions, linesGeometry] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const linePositions: number[] = []

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      const radius = 2.5 + (i % 3) * 0.8
      pos[i * 3] = Math.cos(theta) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3
      pos[i * 3 + 2] = Math.sin(theta) * radius
    }

    // Connect nearby nodes with constellation lines
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < 2.2) {
          linePositions.push(
            pos[i * 3],
            pos[i * 3 + 1],
            pos[i * 3 + 2],
            pos[j * 3],
            pos[j * 3 + 1],
            pos[j * 3 + 2]
          )
        }
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

    return [pos, geo]
  }, [count])

  useFrame((_, delta) => {
    const isSkills = activeSection === 'skills'

    if (groupRef.current) {
      const targetScale = isSkills ? 1 : 0
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -2]} scale={[0, 0, 0]}>
      {/* Node Spheres */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#00d9ff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Constellation Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
      </lineSegments>
    </group>
  )
}
