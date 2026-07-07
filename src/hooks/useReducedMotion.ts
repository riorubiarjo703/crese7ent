'use client'

import { useEffect, useState } from 'react'

function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(getReducedMotionPreference())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    function handleChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return reducedMotion
}
