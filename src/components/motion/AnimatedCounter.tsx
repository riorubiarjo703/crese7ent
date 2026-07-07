'use client'

import { animate } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AnimatedCounterProps {
  value: string
  prefix?: string | null
  suffix?: string | null
  className?: string
  duration?: number
  /** When true, counts up from zero. When false, shows the final value. */
  active?: boolean
}

function parseNumericValue(raw: string): { numeric: number; decimals: number } | null {
  const cleaned = raw.replace(/,/g, '').trim()
  const match = cleaned.match(/^-?\d+(\.\d+)?/)
  if (!match) return null

  const numeric = Number.parseFloat(match[0])
  const decimals = match[0].includes('.') ? (match[0].split('.')[1]?.length ?? 0) : 0

  return { numeric, decimals }
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  className,
  duration = 1.2,
  active = false,
}: AnimatedCounterProps) {
  const reducedMotion = useReducedMotion()
  const parsed = useMemo(() => parseNumericValue(value), [value])
  const numeric = parsed?.numeric
  const decimals = parsed?.decimals ?? 0
  const formattedFinal = parsed ? parsed.numeric.toFixed(parsed.decimals) : value
  const [display, setDisplay] = useState(formattedFinal)

  useEffect(() => {
    if (numeric == null) {
      setDisplay(value)
      return
    }

    if (reducedMotion || !active) {
      setDisplay(formattedFinal)
      return
    }

    setDisplay('0')
    const controls = animate(0, numeric, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        setDisplay(latest.toFixed(decimals))
      },
      onComplete() {
        setDisplay(formattedFinal)
      },
    })

    return () => controls.stop()
  }, [active, decimals, duration, formattedFinal, numeric, reducedMotion, value])

  if (!parsed) {
    return (
      <span className={className}>
        {prefix}
        {value}
        {suffix}
      </span>
    )
  }

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
