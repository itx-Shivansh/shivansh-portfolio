'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/scrollStore'

// GLSL Shaders for atmospheric animated noise gradient + grain
const HeroShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
    uColorCyan: { value: new THREE.Color('#00d9ff') },
    uColorViolet: { value: new THREE.Color('#8b5cf6') },
    uColorBg: { value: new THREE.Color('#07090f') },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uScroll;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      // Subtle vertex wave shift
      pos.z += sin(pos.x * 2.0 + uTime * 0.5) * 0.15;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;
    uniform vec3 uColorCyan;
    uniform vec3 uColorViolet;
    uniform vec3 uColorBg;
    varying vec2 vUv;

    // Simplex Noise algorithm
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 rise ) );
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // Pseudo-random noise for subtle film grain
    float grain(vec2 uv, float time) {
      return (fract(sin(dot(uv + time, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.04;
    }

    void main() {
      vec2 uv = vUv - 0.5;
      
      // Mouse Parallax Influence
      uv += uMouse * 0.05;

      // Dynamic animated noise
      float n = snoise(uv * 1.8 + vec2(uTime * 0.08, uTime * 0.05));
      float n2 = snoise(uv * 3.5 - vec2(uTime * 0.12));

      // Color mixing gradient
      float cyanMix = smoothstep(-0.6, 0.8, n);
      float violetMix = smoothstep(-0.4, 0.9, n2);

      vec3 gradient = mix(uColorBg, uColorCyan, cyanMix * 0.22);
      gradient = mix(gradient, uColorViolet, violetMix * 0.18);

      // Radial vignette from center
      float dist = length(vUv - 0.5);
      float vignette = smoothstep(0.7, 0.2, dist);
      gradient *= vignette;

      // Add grain
      gradient += vec3(grain(vUv, uTime));

      // Scroll Fade
      float scrollAlpha = 1.0 - smoothstep(0.0, 1.0, uScroll * 1.5);

      gl_FragColor = vec4(gradient, scrollAlpha * 0.85);
    }
  `,
}

export default function HeroShaderBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()
  const chapterProgress = useScrollStore((state) => state.chapterProgress)
  const selectedProject = useScrollStore((state) => state.selectedProject)

  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseLerped = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uColorCyan: { value: new THREE.Color('#00d9ff') },
      uColorViolet: { value: new THREE.Color('#8b5cf6') },
      uColorBg: { value: new THREE.Color('#07090f') },
    }),
    []
  )

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta

      // Smooth mouse parallax lerp (only when no project is selected)
      if (!selectedProject) {
        const pointer = state.pointer
        mouseTarget.current = { x: pointer.x, y: pointer.y }
        mouseLerped.current.x += (mouseTarget.current.x - mouseLerped.current.x) * 0.05
        mouseLerped.current.y += (mouseTarget.current.y - mouseLerped.current.y) * 0.05

        materialRef.current.uniforms.uMouse.value.set(mouseLerped.current.x, mouseLerped.current.y)
      }

      // Hero scroll progress
      const heroProg = chapterProgress.hero || 0
      materialRef.current.uniforms.uScroll.value = heroProg
    }

    if (meshRef.current) {
      const heroProg = chapterProgress.hero || 0
      meshRef.current.position.z = -heroProg * 4
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <planeGeometry args={[viewport.width * 2.5, viewport.height * 2.5, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        args={[HeroShader]}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
