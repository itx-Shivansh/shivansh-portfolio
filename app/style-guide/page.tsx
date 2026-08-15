'use client'

import Link from 'next/link'
import { ease, easingCSS, duration, durationMS, stagger } from '@/lib/motion/tokens'

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-bg-base px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <header className="mb-16 border-b border-border-subtle pb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-caption text-accent-cyan">Design System</p>
            <h1 className="mt-2 font-display text-display-lg font-bold text-text-primary">
              Visual & Motion Tokens
            </h1>
          </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-surface px-5 py-2.5 text-body-sm font-medium text-text-secondary transition-all duration-base ease-snap hover:border-accent-cyan/40 hover:text-text-primary"
          >
            <span>← Back to Portfolio</span>
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-body-md text-text-secondary">
          Dark, cinematic visual aesthetic and motion design system for Shivansh Raj&apos;s
          portfolio. Built with Next.js 14, Tailwind CSS, Syne display font, Inter body grotesk,
          and GSAP motion tokens.
        </p>
      </header>

      <div className="space-y-24">
        {/* SECTION 1: TYPOGRAPHY */}
        <section className="space-y-8">
          <div className="border-b border-border-subtle pb-4">
            <h2 className="font-display text-heading-md font-semibold text-text-primary">
              1. Typography & Fluid Scale
            </h2>
            <p className="mt-1 text-body-sm text-text-muted">
              Display: <span className="font-display font-bold text-accent-cyan">Syne</span>{' '}
              (Geometric, Editorial AI Aesthetic) | Body:{' '}
              <span className="font-body font-semibold text-text-primary">Inter</span> (Clean
              Grotesk)
            </p>
          </div>

          <div className="space-y-10">
            {/* Display XXL */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-caption text-text-muted">
                <span>Display XXL</span>
                <span className="rounded bg-bg-elevated px-2 py-0.5 text-accent-cyan">
                  clamp(3.2rem, 8vw + 1rem, 9.5rem)
                </span>
              </div>
              <h1 className="font-display text-display-xxl font-extrabold uppercase text-text-primary">
                Shivansh Raj
              </h1>
            </div>

            {/* Display XL */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-caption text-text-muted">
                <span>Display XL</span>
                <span className="rounded bg-bg-elevated px-2 py-0.5 text-accent-cyan">
                  clamp(2.5rem, 5vw + 1rem, 6rem)
                </span>
              </div>
              <h2 className="font-display text-display-xl font-bold text-accent-gradient">
                Intelligent Software & AI
              </h2>
            </div>

            {/* Display LG */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-caption text-text-muted">
                <span>Display LG</span>
                <span className="rounded bg-bg-elevated px-2 py-0.5 text-accent-cyan">
                  clamp(1.8rem, 3.2vw + 1rem, 3.8rem)
                </span>
              </div>
              <h3 className="font-display text-display-lg font-semibold text-text-primary">
                Adaptive Reasoning & Engineering
              </h3>
            </div>

            {/* Heading MD */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-caption text-text-muted">
                <span>Heading MD</span>
                <span className="rounded bg-bg-elevated px-2 py-0.5 text-accent-cyan">
                  clamp(1.4rem, 2vw + 0.8rem, 2.4rem)
                </span>
              </div>
              <h4 className="font-display text-heading-md font-medium text-text-primary">
                Geopolitical Intelligence Platform — India Signal
              </h4>
            </div>

            {/* Body LG, MD, SM */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2 rounded-lg border border-border-subtle bg-bg-surface p-5">
                <span className="text-caption text-accent-cyan">Body Large</span>
                <p className="text-body-lg text-text-secondary">
                  Mechanical Engineering student at Delhi Technological University passionate about
                  building AI-powered applications.
                </p>
              </div>

              <div className="space-y-2 rounded-lg border border-border-subtle bg-bg-surface p-5">
                <span className="text-caption text-accent-cyan">Body Medium</span>
                <p className="text-body-md text-text-secondary">
                  Shifted from learning concepts to creating complete software projects including
                  AI assistants and full-stack tools.
                </p>
              </div>

              <div className="space-y-2 rounded-lg border border-border-subtle bg-bg-surface p-5">
                <span className="text-caption text-accent-cyan">Body Small & Caption</span>
                <p className="text-body-sm text-text-muted">
                  Technologies: Python, React, Node.js, Express, MongoDB, REST APIs, Google Gemini
                  API.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COLOR PALETTE */}
        <section className="space-y-8">
          <div className="border-b border-border-subtle pb-4">
            <h2 className="font-display text-heading-md font-semibold text-text-primary">
              2. Color Palette & Surfaces
            </h2>
            <p className="mt-1 text-body-sm text-text-muted">
              Deep near-black foundation (#07090F) paired with electric cyan (#00D9FF) to violet
              (#8B5CF6) glow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Base Surface */}
            <div className="space-y-3 rounded-xl border border-border-subtle bg-bg-base p-5">
              <div className="h-20 w-full rounded-lg bg-bg-base border border-border-subtle"></div>
              <div>
                <p className="font-display text-body-md font-semibold text-text-primary">
                  Background Base
                </p>
                <p className="text-caption text-text-muted">#07090F (RGB: 7, 9, 15)</p>
              </div>
            </div>

            {/* Surface Panel */}
            <div className="space-y-3 rounded-xl border border-border-subtle bg-bg-surface p-5">
              <div className="h-20 w-full rounded-lg bg-bg-surface border border-border-subtle"></div>
              <div>
                <p className="font-display text-body-md font-semibold text-text-primary">
                  Surface Panel
                </p>
                <p className="text-caption text-text-muted">#0F121C (RGB: 15, 18, 28)</p>
              </div>
            </div>

            {/* Elevated Surface */}
            <div className="space-y-3 rounded-xl border border-border-subtle bg-bg-elevated p-5">
              <div className="h-20 w-full rounded-lg bg-bg-elevated border border-border-subtle"></div>
              <div>
                <p className="font-display text-body-md font-semibold text-text-primary">
                  Elevated Surface
                </p>
                <p className="text-caption text-text-muted">#181C2A (RGB: 24, 28, 42)</p>
              </div>
            </div>

            {/* Glass Panel */}
            <div className="space-y-3 rounded-xl glass-panel p-5">
              <div className="h-20 w-full rounded-lg glass-panel flex items-center justify-center">
                <span className="text-caption text-accent-cyan">Glass Backdrop</span>
              </div>
              <div>
                <p className="font-display text-body-md font-semibold text-text-primary">
                  Glassmorphism
                </p>
                <p className="text-caption text-text-muted">blur(16px) + 65% opacity</p>
              </div>
            </div>
          </div>

          {/* Accent Swatches & Glows */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Electric Cyan */}
            <div className="flex items-center gap-4 rounded-xl border border-border-subtle bg-bg-surface p-4">
              <div className="h-14 w-14 rounded-lg bg-accent-cyan glow-cyan flex-shrink-0"></div>
              <div>
                <p className="font-display text-body-md font-bold text-accent-cyan">
                  Electric Cyan
                </p>
                <p className="text-caption text-text-muted">#00D9FF — AI Focus & Interactive</p>
              </div>
            </div>

            {/* Violet */}
            <div className="flex items-center gap-4 rounded-xl border border-border-subtle bg-bg-surface p-4">
              <div className="h-14 w-14 rounded-lg bg-accent-violet glow-violet flex-shrink-0"></div>
              <div>
                <p className="font-display text-body-md font-bold text-accent-violet">
                  Electric Violet
                </p>
                <p className="text-caption text-text-muted">#8B5CF6 — Depth & Ambient</p>
              </div>
            </div>

            {/* Gradient Pair */}
            <div className="flex items-center gap-4 rounded-xl border border-border-subtle bg-bg-surface p-4">
              <div className="h-14 w-14 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-violet flex-shrink-0"></div>
              <div>
                <p className="font-display text-body-md font-bold text-accent-gradient">
                  AI Gradient Pair
                </p>
                <p className="text-caption text-text-muted">Cyan ➔ Violet Linear</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: MOTION TOKENS & INTERACTIVE STATES */}
        <section className="space-y-8">
          <div className="border-b border-border-subtle pb-4">
            <h2 className="font-display text-heading-md font-semibold text-text-primary">
              3. Motion Tokens & Interactive States
            </h2>
            <p className="mt-1 text-body-sm text-text-muted">
              Centralized animation curves defined in{' '}
              <code className="text-accent-cyan font-mono">/lib/motion/tokens.ts</code>.
            </p>
          </div>

          {/* Easing Token Matrix */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(ease).map(([key, value]) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-surface p-5 transition-all duration-base hover:border-accent-cyan/50 hover:bg-bg-elevated"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-body-md font-bold uppercase tracking-wider text-accent-cyan">
                    {key}
                  </span>
                  <span className="text-caption text-text-muted font-mono">{value}</span>
                </div>
                <p className="mt-2 text-body-sm text-text-secondary">
                  CSS:{' '}
                  <code className="text-caption text-text-muted">
                    {easingCSS[key as keyof typeof easingCSS]}
                  </code>
                </p>
                {/* Interactive Motion Test Bar */}
                <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-bg-base">
                  <div
                    className="h-full w-12 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet transition-all duration-slow group-hover:w-full"
                    style={{
                      transitionTimingFunction: easingCSS[key as keyof typeof easingCSS],
                    }}
                  ></div>
                </div>
                <p className="mt-2 text-caption text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
                  Hover card to test cubic-bezier motion
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Button & Link States */}
          <div className="space-y-4 rounded-xl border border-border-subtle bg-bg-surface p-6">
            <h3 className="font-display text-body-lg font-semibold text-text-primary">
              Interactive Component States
            </h3>
            <p className="text-body-sm text-text-secondary">
              Hover, focus, and active triggers using our signature motion tokens.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              {/* Primary Glow Button */}
              <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet px-7 py-3 text-body-sm font-semibold text-bg-base transition-all duration-base ease-snap hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] active:scale-[0.97]">
                <span>Primary CTA</span>
              </button>

              {/* Glass / Secondary Button */}
              <button className="group rounded-full border border-border-subtle bg-bg-elevated/80 px-7 py-3 text-body-sm font-medium text-text-primary transition-all duration-base ease-snap hover:border-accent-cyan/60 hover:bg-bg-elevated hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] active:scale-[0.98]">
                <span className="group-hover:text-accent-cyan transition-colors duration-fast">
                  Secondary Action
                </span>
              </button>

              {/* Ghost Link */}
              <a
                href="#style-guide"
                className="group relative inline-flex items-center gap-2 text-body-sm font-medium text-text-secondary transition-colors duration-fast hover:text-accent-cyan"
              >
                <span>Explore Interactive Link</span>
                <span className="transition-transform duration-base ease-spring group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-accent-cyan transition-all duration-base ease-cinematic group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Duration & Stagger Scale Table */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Duration Table */}
            <div className="rounded-xl border border-border-subtle bg-bg-surface p-5">
              <h4 className="font-display text-body-md font-semibold text-text-primary mb-3">
                Duration Scale
              </h4>
              <div className="space-y-2">
                {Object.entries(duration).map(([key, sec]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border-b border-border-subtle/50 py-1.5 text-body-sm"
                  >
                    <span className="font-medium text-text-secondary uppercase text-caption">
                      {key}
                    </span>
                    <span className="font-mono text-accent-cyan">{sec}s ({durationMS[key as keyof typeof durationMS]}ms)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stagger Table */}
            <div className="rounded-xl border border-border-subtle bg-bg-surface p-5">
              <h4 className="font-display text-body-md font-semibold text-text-primary mb-3">
                Stagger Scale
              </h4>
              <div className="space-y-2">
                {Object.entries(stagger).map(([key, sec]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border-b border-border-subtle/50 py-1.5 text-body-sm"
                  >
                    <span className="font-medium text-text-secondary uppercase text-caption">
                      {key}
                    </span>
                    <span className="font-mono text-accent-violet">{sec}s per item</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
