'use client'

import { useEffect } from 'react'

export default function TabTitleController() {
  useEffect(() => {
    const originalTitle = document.title

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '⚡ Shivansh // Creative Engineer'
      } else {
        document.title = originalTitle
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null
}
