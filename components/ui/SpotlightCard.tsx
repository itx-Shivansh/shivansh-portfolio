'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import clsx from 'clsx'

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  borderColor?: string
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(245, 184, 0, 0.12)',
  borderColor = 'rgba(245, 184, 0, 0.35)',
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const prefersReduced = useReducedMotion()
  const isHovered = useRef(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    isHovered.current = true
    props.onMouseEnter?.(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    isHovered.current = false
    mouseX.set(-1000)
    mouseY.set(-1000)
    props.onMouseLeave?.(e)
  }

  const spotBackground = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`
  const borderBackground = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, ${borderColor}, transparent 70%)`

  return (
    <motion.div
      {...props}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        'group relative rounded-2xl border border-white/10 bg-surface-card overflow-hidden transition-colors duration-300',
        className
      )}
    >
      {/* ── Dynamic Mouse-tracking Inner Spotlight (Desktop) ────────── */}
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
          style={{ background: spotBackground }}
          aria-hidden="true"
        />
      )}

      {/* ── Dynamic Mouse-tracking Border Glow (Desktop) ────────────── */}
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 [mask-image:linear-gradient(black,black)]"
          style={{
            background: borderBackground,
            padding: '1px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Card Content ───────────────────────────────────────────── */}
      <div className="relative z-[2] h-full w-full">{children}</div>
    </motion.div>
  )
}
