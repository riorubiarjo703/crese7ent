'use client'

import { useEffect, useState } from 'react'

import { HeroMistCanvas, type HeroMistCanvasProps } from '@/heros/PageHero/HeroMistCanvas'
import { cn } from '@/utilities'

/** Client-only gate — avoids next/dynamic chunk load failures with Turbopack HMR. */
export function HeroMistCanvasGate(props: HeroMistCanvasProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0', props.className)}
      />
    )
  }

  return <HeroMistCanvas {...props} />
}
