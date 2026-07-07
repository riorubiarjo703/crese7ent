'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/index'
import { BRAND_RED_35, BRAND_RED_40, BRAND_RED_80 } from '@/utilities/brand-colors'

interface RisingMeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

/** Meteors-style streaks that travel upward (inverse of Magic UI Meteors). */
export function RisingMeteors({
  number = 32,
  minDelay = 0.1,
  maxDelay = 1.8,
  minDuration = 2,
  maxDuration = 8,
  angle = 90,
  className,
}: RisingMeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([])

  useEffect(() => {
    const width = window.innerWidth

    const styles = [...new Array(number)].map(() => ({
      '--angle': `${angle}deg`,
      bottom: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
      animationDuration: `${
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration)
      }s`,
    }))

    setMeteorStyles(styles)
  }, [angle, maxDelay, maxDuration, minDelay, minDuration, number])

  if (meteorStyles.length === 0) return null

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={{
            ...style,
            backgroundColor: BRAND_RED_80,
            boxShadow: `0 0 10px 1px ${BRAND_RED_40}`,
          }}
          className={cn(
            'animate-meteor-rise pointer-events-none absolute h-px w-28 rotate-(--angle) rounded-full md:w-36',
            className,
          )}
        >
          <span
            className="pointer-events-none absolute top-1/2 left-0 h-px w-full -translate-y-1/2"
            style={{
              background: `linear-gradient(to right, ${BRAND_RED_80}, ${BRAND_RED_35}, transparent)`,
            }}
          />
        </span>
      ))}
    </>
  )
}
