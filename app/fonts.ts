import { Syne, Inter } from 'next/font/google'

/**
 * Display face: Syne
 *
 * Justification: Syne is a variable-weight geometric typeface designed with
 * a computational, experimental spirit. At large display sizes its letterforms
 * read as simultaneously technical and editorial — exactly the "AI-inspired,
 * cinematic" register this site needs. The variable weight axis (300–800) lets
 * us use ultra-light for atmosphere and heavy for impact within the same family,
 * removing the need for a third face.
 *
 * Google Fonts subsets: latin only — keeps the bundle minimal.
 */
export const displayFont = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

/**
 * Body/UI face: Inter
 *
 * The definitive neutral grotesk. Zero readability friction at any size.
 * Its neutrality means it never competes with Syne — it simply serves.
 * Variable font axis available in newer Inter versions; we load the key
 * optical sizes to keep the bundle manageable.
 */
export const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})
