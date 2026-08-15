'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/scrollStore'

/**
 * Interactive 3D geometric shapes tied to Journey milestones.
 * Rotates and fades in when the Journey chapter is active.
 */
export default function Journey3DObjects() {
  const groupRef = useRef<THREE.Group>(null)
  const mesh1Ref = useRef<THREE.Mesh>(null)
  const mesh2Ref = useRef<THREE.Mesh>(null)
  const mesh3Ref = useRef<THREE.Mesh>(null)

  const activeSection = useScrollStore((state) => state.activeSection)
  const chapterProgress = useScrollStore((state) => state.chapterProgress)

  useFrame((_, delta) => {
    const isJourney = activeSection === 'journey'
    const prog = chapterProgress.journey || 0

    if (groupRef.current) {
      // Smooth opacity / scale transition when entering/exiting Journey
      const targetScale = isJourney ? 1 : 0
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)

      // Rotate group based on scroll
      groupRef.current.rotation.y = prog * Math.PI * 2
      groupRef.current.rotation.z = prog * Math.PI * 0.5
    }

    if (mesh1Ref.current) {
      mesh1Ref.current.rotation.x += delta * 0.4
      mesh1Ref.current.rotation.y += delta * 0.3
    }

    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x -= delta * 0.5
      mesh2Ref.current.rotation.z += delta * 0.4
    }

    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y += delta * 0.6
    }
  })

  return (
    <group ref={groupRef} position={[2.5, 0, -1]} scale={[0, 0, 0]}>
      {/* 3D Shape 1: Octahedron */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={mesh1Ref} position={[-0.5, 1.2, 0]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#00d9ff"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      {/* 3D Shape 2: Dodecahedron */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={mesh2Ref} position={[0.8, -1, -0.5]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#8b5cf6"
            emissiveIntensity={0.35}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      {/* 3D Shape 3: Icosahedron Core */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh ref={mesh3Ref} position={[-1.2, -0.5, 0.5]}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  )
}
