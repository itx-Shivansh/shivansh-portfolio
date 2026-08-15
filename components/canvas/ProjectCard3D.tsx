import { useState, useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useCursor } from '@react-three/drei'
import * as THREE from 'three'
import { Project } from '@/content/projects'
import { useScrollStore } from '@/lib/scrollStore'
import { sound } from '@/lib/sound'

// ─── Module-level Blob cache (kills the HTTP range-request storm) ───────────
//
// Problem: when <video src="/videos/aria_vid.mp4"> is pointed at the raw file,
// the browser keeps only a small sliding decode buffer. Every
// Three.js-driven seek via VideoTexture + every re-mount of the card → a new
// HTTP byte-range request (we observed 261 tiny 0.2kB requests in the
// screenshot, spread across ~30s of scrolling).
//
// Fix: fetch each unique src ONCE as a Blob, turn it into a blob: object URL,
// and share the URL between every card instance that references the same
// video. refCount tracks how many components are using each cached entry so
// we revoke the URL only when the last consumer unmounts.
type CacheEntry = {
  objectUrl?: string
  loading?: Promise<void>
  refCount: number
}
const blobCache = new Map<string, CacheEntry>()

async function acquireObjectUrl(src: string): Promise<string> {
  let entry = blobCache.get(src)
  if (!entry) {
    entry = { refCount: 0 }
    blobCache.set(src, entry)
  }
  entry.refCount++

  if (entry.objectUrl) return entry.objectUrl
  if (entry.loading) {
    await entry.loading
    if (entry.objectUrl) return entry.objectUrl
  }

  entry.loading = (async () => {
    const res = await fetch(src, { cache: 'force-cache' })
    if (!res.ok) {
      throw new Error(`Failed to fetch video: ${src}`)
    }
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const cur = blobCache.get(src)
    if (cur) cur.objectUrl = objectUrl
  })()

  await entry.loading
  const cur = blobCache.get(src)
  if (cur && cur.objectUrl) return cur.objectUrl
  throw new Error(`Blob cache error for ${src}`)
}

function releaseObjectUrl(src: string) {
  const entry = blobCache.get(src)
  if (!entry) return
  entry.refCount--
  if (entry.refCount <= 0 && entry.objectUrl) {
    URL.revokeObjectURL(entry.objectUrl)
    blobCache.delete(src)
  }
}

interface ProjectCard3DProps {
  project: Project
  index: number
  active: boolean
  onClick: () => void
  onHover: (hovered: boolean) => void
  progress: number
  opacityBase: number
  groupOpacityRef: React.MutableRefObject<number>
}

function CardContent({
  project,
  index,
  active,
  onClick,
  onHover,
  progress,
  opacityBase,
  groupOpacityRef,
}: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const effectiveOpacityRef = useRef(0)

  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [hasError, setHasError] = useState(false)
  const setCursorState = useScrollStore((state) => state.setCursorState)
  const selectedProject = useScrollStore((state) => state.selectedProject)
  
  useCursor(hovered && effectiveOpacityRef.current > 0.3)

  const videoSrc = useMemo(() => {
    const videoItem = project.media.find(
      (m) => typeof m === 'object' && m.type === 'video' && m.src
    )
    return videoItem && typeof videoItem === 'object' ? videoItem.src : undefined
  }, [project.media])

  const imageUrl = useMemo(() => {
    const prompt = encodeURIComponent(`Cinematic, high-tech, futuristic UI for ${project.title}, ${project.role}, dark theme, cyan and violet accents`)
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`
  }, [project])

  useEffect(() => {
    if (!videoSrc) return

    let cancelled = false
    let mountedVideo: HTMLVideoElement | null = null
    let mountedTexture: THREE.VideoTexture | null = null

    const video = document.createElement('video')
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.autoplay = true
    video.preload = 'auto'
    video.src = videoSrc
    mountedVideo = video
    videoRef.current = video

    const createAndSetTexture = () => {
      if (cancelled || mountedTexture) return
      const videoTexture = new THREE.VideoTexture(video)
      videoTexture.colorSpace = THREE.SRGBColorSpace
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.generateMipmaps = false
      mountedTexture = videoTexture
      setTexture(videoTexture)
      setHasError(false)
    }

    if (video.readyState >= 2) {
      createAndSetTexture()
    } else {
      video.addEventListener('loadeddata', createAndSetTexture)
      video.addEventListener('canplay', createAndSetTexture)
    }

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {})
    }

    // Background Blob pre-caching optimization
    acquireObjectUrl(videoSrc)
      .then((blobUrl) => {
        if (!cancelled && mountedVideo && blobUrl && mountedVideo.src !== blobUrl) {
          const currentTime = mountedVideo.currentTime
          mountedVideo.src = blobUrl
          mountedVideo.currentTime = currentTime
          mountedVideo.play().catch(() => {})
        }
      })
      .catch(() => {
        // Blob fetch failed — raw URL remains active
      })

    return () => {
      cancelled = true
      video.removeEventListener('loadeddata', createAndSetTexture)
      video.removeEventListener('canplay', createAndSetTexture)
      if (mountedTexture) {
        mountedTexture.dispose()
        mountedTexture = null
      }
      if (mountedVideo) {
        try { mountedVideo.pause() } catch { /* ignore */ }
        try { mountedVideo.removeAttribute('src') } catch { /* ignore */ }
        try { mountedVideo.load() } catch { /* ignore */ }
        mountedVideo = null
      }
      if (videoRef.current === mountedVideo) videoRef.current = null
      releaseObjectUrl(videoSrc)
    }
  }, [videoSrc])

  useEffect(() => {
    if (videoSrc) return

    const loader = new THREE.TextureLoader()
    loader.load(
      imageUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.minFilter = THREE.LinearFilter
        tex.magFilter = THREE.LinearFilter
        setTexture(tex)
        setHasError(false)
      },
      undefined,
      () => {
        console.warn(`Failed to load texture for project: ${project.title}`)
        setHasError(true)
      }
    )
  }, [imageUrl, project.title, videoSrc])

  // Sync texture to material on texture state change
  useEffect(() => {
    if (materialRef.current && texture) {
      materialRef.current.map = texture
      materialRef.current.needsUpdate = true
    }
  }, [texture])

  useFrame(() => {
    if (!meshRef.current) return

    const effectiveOpacity = opacityBase * groupOpacityRef.current
    effectiveOpacityRef.current = effectiveOpacity

    if (materialRef.current) {
      materialRef.current.opacity = effectiveOpacity
    }

    const offset = index - progress
    const x = offset * 7
    const z = -Math.pow(Math.abs(offset), 1.5) * 3
    const rotationY = offset * -0.4

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.08)
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, z, 0.08)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotationY, 0.08)
    
    if (active) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1)
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 2, 0.1)
    }

    const targetScale = active ? 1.4 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <group
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation()
        if (effectiveOpacityRef.current < 0.3) return
        onClick()
      }}
      onPointerOver={() => {
        if (effectiveOpacityRef.current < 0.3 || selectedProject) return
        setHovered(true)
        setCursorState('hover', 'VIEW')
        sound.playHover()
        onHover(true)
      }}
      onPointerOut={() => {
        if (selectedProject) return
        setHovered(false)
        setCursorState('default')
        onHover(false)
      }}
    >
      <mesh>
        <planeGeometry args={[6, 3.5]} />
        {texture && !hasError ? (
          <meshBasicMaterial
            ref={materialRef}
            map={texture}
            transparent
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshBasicMaterial 
            color="#0e1018" 
            transparent 
            opacity={0.8 * effectiveOpacityRef.current} 
            side={THREE.DoubleSide}
          />
        )}
      </mesh>

      <Text
        position={[0, -2.2, 0.1]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        maxWidth={5}
        fillOpacity={active ? 0 : effectiveOpacityRef.current}
      >
        {project.title.toUpperCase()}
      </Text>

      <Text
        position={[0, -2.6, 0.1]}
        fontSize={0.15}
        color="#F5B800"
        anchorX="center"
        fillOpacity={active ? 0 : effectiveOpacityRef.current}
      >
        {`0${index + 1} // ${project.role.toUpperCase()}`}
      </Text>

      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[6.15, 3.65]} />
        <meshBasicMaterial
          color="#F5B800"
          transparent
          opacity={selectedProject ? 0 : (hovered || active ? 0.25 : 0.08) * effectiveOpacityRef.current}
        />
      </mesh>
    </group>
  )
}

export default function ProjectCard3D(props: ProjectCard3DProps) {
  return <CardContent {...props} />
}
