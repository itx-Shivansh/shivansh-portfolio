import type { Metadata } from 'next'
import './globals.css'
import { displayFont, bodyFont } from './fonts'
import Scene from '@/components/canvas/Scene'
import ScrollVideoBackground from '@/components/canvas/ScrollVideoBackground'
import Cursor from '@/components/ui/Cursor'
import Nav from '@/components/ui/Nav'
import Loader from '@/components/ui/Loader'
import DebugHUD from '@/components/ui/DebugHUD'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import MainShell from '@/components/providers/MainShell'
import TabTitleController from '@/components/providers/TabTitleController'

export const metadata: Metadata = {
  title: 'Shivansh Raj — Software Engineer & AI Developer',
  description:
    'Cinematic portfolio of Shivansh Raj — Software Engineer, AI Developer, and Full-Stack builder at Delhi Technological University.',
  keywords: ['Shivansh Raj', 'Software Engineer', 'AI Developer', 'Full-Stack', 'DTU', 'Portfolio'],
  openGraph: {
    title: 'Shivansh Raj — Software Engineer & AI Developer',
    description:
      'Immersive, scroll-driven portfolio showcasing AI applications, full-stack projects, and software engineering at DTU.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} bg-bg-base font-body text-text-primary antialiased`}
    >
      <body className="min-h-screen bg-bg-base font-body text-text-primary antialiased selection:bg-accent-cyan/20 selection:text-white">
        <SmoothScrollProvider>
          {/* Scroll-Scrubbed Video Background Engine */}
          <ScrollVideoBackground />

          {/* Persistent WebGL canvas — rendered fixed behind all content */}
          <Scene />

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
