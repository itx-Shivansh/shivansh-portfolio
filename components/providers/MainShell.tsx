'use client'

import clsx from 'clsx'
import { useScrollStore } from '@/lib/scrollStore'

export default function MainShell({ children }: { children: React.ReactNode }) {
  const selectedProject = useScrollStore((state) => state.selectedProject)

  return (
    <main
      className={clsx(
        'relative transition-opacity duration-300',
        selectedProject ? 'pointer-events-none opacity-0 invisible -z-10' : 'z-[20]'
      )}
    >
      {children}
    </main>
  )
}
