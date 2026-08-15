import type { Config } from 'tailwindcss'
import { easingCSS, durationMS } from './lib/motion/tokens'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          base: 'rgb(var(--color-bg-base) / <alpha-value>)',
          surface: 'rgb(var(--color-bg-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-bg-surface-elevated) / <alpha-value>)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          glow: 'var(--color-border-glow)',
        },
        accent: {
          cyan: 'var(--color-accent-cyan)',
          violet: 'var(--color-accent-violet)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
      },
      transitionTimingFunction: {
        cinematic: easingCSS.cinematic,
        snap: easingCSS.snap,
        enter: easingCSS.enter,
        exit: easingCSS.exit,
        spring: easingCSS.spring,
      },
      transitionDuration: {
        fast: `${durationMS.fast}ms`,
        base: `${durationMS.base}ms`,
        slow: `${durationMS.slow}ms`,
        cinematic: `${durationMS.cinematic}ms`,
        epic: `${durationMS.epic}ms`,
      },
    },
  },
  plugins: [],
}

export default config
