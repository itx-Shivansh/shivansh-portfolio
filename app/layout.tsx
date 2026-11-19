import type { Metadata, Viewport } from 'next'
import './globals.css'
import { displayFont, bodyFont, monoFont } from './fonts'
import CursorSpotlight from '@/components/ui/CursorSpotlight'
import Cursor from '@/components/ui/Cursor'
import Nav from '@/components/ui/Nav'
import Loader from '@/components/ui/Loader'
import DebugHUD from '@/components/ui/DebugHUD'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import MainShell from '@/components/providers/MainShell'
import TabTitleController from '@/components/providers/TabTitleController'

// ── Single constant for the canonical deployment URL ──────────────────────────
// Change this when the domain changes; nothing else needs updating.
export const SITE_URL = 'https://shivanshraj-portfolio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Shivansh Raj — Software Engineer & AI Developer',
  description:
    'Portfolio of Shivansh Raj — Software Engineer, AI Developer, and Full-Stack builder at Delhi Technological University (DTU).',
  keywords: ['Shivansh Raj', 'Software Engineer', 'AI Developer', 'Full-Stack', 'DTU', 'Portfolio'],
  openGraph: {
    title: 'Shivansh Raj — Software Engineer & AI Developer',
    description:
      'Portfolio of Shivansh Raj — Software Engineer, AI Developer, and Full-Stack builder at Delhi Technological University (DTU).',
    url: SITE_URL,
    siteName: 'Shivansh Raj',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Shivansh Raj — Software Engineer & AI Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivansh Raj — Software Engineer & AI Developer',
    description:
      'Portfolio of Shivansh Raj — Software Engineer, AI Developer, and Full-Stack builder at Delhi Technological University (DTU).',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} bg-bg-base font-body text-text-primary antialiased`}
    >
      <body className="min-h-screen bg-bg-base font-body text-text-primary antialiased selection:bg-accent-gold/20 selection:text-white">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:bg-[#F5B800] focus:px-4 focus:py-2 focus:text-black focus:font-mono focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          {/* Subtle technical background grid overlay — z-[0] */}
          <div
            className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(rgba(245,184,0,0.07)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_15%,#000_60%,transparent_100%)] opacity-70"
            aria-hidden="true"
          />

          {/* Gold ambient cursor spotlight — z-[1], above black base, below all content */}
          <CursorSpotlight />

          {/* Global UI Overlays */}
          <TabTitleController />
          <Loader />
          <Cursor />
          <Nav />
          <DebugHUD />

          {/* Page content */}
          <MainShell>{children}</MainShell>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
