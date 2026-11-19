'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface CountUpProps {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReduced = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(prefersReduced ? to : 0)

  useEffect(() => {
    if (!isInView || prefersReduced) {
      if (prefersReduced) setDisplayValue(to)
      return
    }

    const start = 0
    const end = to
    const startTime = performance.now()
    const durationMs = duration * 1000

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / durationMs, 1)

      // Snappy easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.floor(ease * (end - start) + start)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setDisplayValue(end)
      }
    }

    requestAnimationFrame(updateCounter)
  }, [isInView, to, duration, prefersReduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}
