'use client'

import clsx from 'clsx'
import { useScrollStore } from '@/lib/scrollStore'

export default function MainShell({ children }: { children: React.ReactNode }) {
  const selectedProject = useScrollStore((state) => state.selectedProject)
  const isLoaded = useScrollStore((state) => state.isLoaded)

  return (
    <main
      className={clsx(
        'relative transition-opacity duration-500',
        !isLoaded || selectedProject
          ? 'pointer-events-none opacity-0 invisible -z-10'
          : 'z-[20] opacity-100 visible'
      )}
    >
      {children}
    </main>
  )
}
