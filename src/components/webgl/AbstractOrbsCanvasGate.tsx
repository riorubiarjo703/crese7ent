'use client'

import { useEffect, useState } from 'react'

import { AbstractOrbsCanvas, type AbstractOrbsCanvasProps } from '@/components/webgl/AbstractOrbsCanvas'
import { cn } from '@/utilities'

export function AbstractOrbsCanvasGate(props: AbstractOrbsCanvasProps) {
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

  return <AbstractOrbsCanvas {...props} />
}
