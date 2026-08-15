/**
 * /lib/motion/index.ts
 *
 * GSAP animation helper functions linked to central motion tokens.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ease, duration, stagger, delay } from './tokens'

// Register plugins once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Fade an element in from below using design system tokens.
 */
export function fadeUp(
  target: gsap.TweenTarget,
  options: { delay?: number; duration?: number; easeName?: keyof typeof ease } = {}
) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? duration.slow,
      delay: options.delay ?? delay.none,
      ease: options.easeName ? ease[options.easeName] : ease.snap,
    }
  )
}

/**
 * Create a ScrollTrigger-linked timeline for a section.
 */
export function sectionTimeline(
  trigger: string | Element,
  options: ScrollTrigger.Vars = {}
) {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...options,
    },
  })
}

export { gsap, ScrollTrigger, ease, duration, stagger, delay }
