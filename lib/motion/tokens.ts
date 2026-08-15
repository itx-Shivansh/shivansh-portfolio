/**
 * /lib/motion/tokens.ts
 *
 * Single source of truth for every animation on the site.
 * All GSAP timelines, CSS transitions, and Tailwind arbitrary values
 * reference these constants — visual cohesion depends on nothing going rogue.
 */

// ─── Easing — GSAP string format ──────────────────────────────────────────────
export const ease = {
  /**
   * Signature cinematic ease — slow acceleration into slow deceleration.
   * Use for: hero reveals, full-screen transitions, chapter changes.
   */
  cinematic: 'power4.inOut',

  /**
   * Snappy expo deceleration — fast in, crisp stop.
   * Use for: UI feedback, hover states, small interactive elements.
   */
  snap: 'expo.out',

  /**
   * Smooth cubic out — content entering the viewport.
   * Use for: text reveals, card entrances, scroll-triggered content.
   */
  enter: 'power2.out',

  /**
   * Clean cubic in — content leaving.
   * Use for: section exits, dismissals.
   */
  exit: 'power2.in',

  /**
   * Slight spring overshoot — active/selected state highlights.
   * Use for: button presses, active nav dots, emphasis moments.
   */
  spring: 'back.out(1.4)',
} as const

// ─── Easing — CSS cubic-bezier equivalents ────────────────────────────────────
// Used in globals.css custom properties and Tailwind transitionTimingFunction.
export const easingCSS = {
  cinematic: 'cubic-bezier(0.76, 0, 0.24, 1)',
  snap: 'cubic-bezier(0.16, 1, 0.3, 1)',
  enter: 'cubic-bezier(0.33, 1, 0.68, 1)',
  exit: 'cubic-bezier(0.32, 0, 0.67, 0)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

// ─── Duration Scale — seconds (GSAP) ──────────────────────────────────────────
export const duration = {
  /** Immediate UI feedback — hover glow, cursor: 150ms */
  fast: 0.15,
  /** Standard transition — cards, links, nav: 400ms */
  base: 0.4,
  /** Deliberate reveal — section elements entering: 800ms */
  slow: 0.8,
  /** Cinematic reveal — chapter titles, hero text: 1400ms */
  cinematic: 1.4,
  /** Epic — full-page transitions, WebGL scene swaps: 2400ms */
  epic: 2.4,
} as const

// Duration scale in milliseconds (for CSS transitions / Tailwind duration-*)
export const durationMS = {
  fast: 150,
  base: 400,
  slow: 800,
  cinematic: 1400,
  epic: 2400,
} as const

// ─── Stagger — seconds between sequential items (GSAP stagger) ────────────────
export const stagger = {
  /** Tight list items, letter-by-letter text: 30ms */
  tight: 0.03,
  /** Default — cards, tags, skill pills: 80ms */
  base: 0.08,
  /** Loose — milestone items, large reveals: 150ms */
  loose: 0.15,
  /** Dramatic — chapter sub-headlines, signature moments: 250ms */
  dramatic: 0.25,
} as const

// ─── Delay Scale — seconds (GSAP delay) ──────────────────────────────────────
export const delay = {
  none: 0,
  short: 0.1,
  base: 0.2,
  long: 0.4,
  xlong: 0.8,
} as const

// ─── Convenience type exports ─────────────────────────────────────────────────
export type EaseKey = keyof typeof ease
export type DurationKey = keyof typeof duration
export type StaggerKey = keyof typeof stagger
