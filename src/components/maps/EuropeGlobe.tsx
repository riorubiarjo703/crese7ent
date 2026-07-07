'use client'

import { type COBEOptions } from 'cobe'
import { useCallback, useMemo } from 'react'

import { Globe } from '@/components/magicui/globe'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BRAND_RED_RGB } from '@/utilities/brand-colors'
import { EUROPE_COUNTRY_COORDS } from '@/utilities/europe-country-coords'
import { cn } from '@/utilities'

interface EuropeGlobeProps {
  highlightedCodes: string[]
  hoveredCode?: string | null
  className?: string
  variant?: 'default' | 'background'
}

export function EuropeGlobe({
  highlightedCodes,
  hoveredCode,
  className,
  variant = 'default',
}: EuropeGlobeProps) {
  const reducedMotion = useReducedMotion()
  const highlightedSet = useMemo(
    () => new Set(highlightedCodes.map((code) => code.toUpperCase())),
    [highlightedCodes],
  )

  const getMarkers = useCallback((): COBEOptions['markers'] => {
    const activeCode = hoveredCode?.toUpperCase() ?? null

    return Object.entries(EUROPE_COUNTRY_COORDS)
      .filter(([code]) => highlightedSet.has(code))
      .map(([code, location]) => ({
        location,
        size: activeCode === code ? 0.045 : 0.03,
      }))
  }, [highlightedSet, hoveredCode])

  const config = useMemo(
    (): COBEOptions => ({
      width: 800,
      height: 800,
      devicePixelRatio: 2,
      phi: 0.9,
      theta: 0.25,
      dark: 0,
      diffuse: 0.55,
      mapSamples: 16000,
      mapBrightness: 1.1,
      baseColor: [0.92, 0.92, 0.94],
      markerColor: hoveredCode ? BRAND_RED_RGB : [BRAND_RED_RGB[0] * 0.55, BRAND_RED_RGB[1] * 0.55, BRAND_RED_RGB[2] * 0.55],
      glowColor: [0.95, 0.95, 0.97],
      markerElevation: 0,
      markers: [],
    }),
    [hoveredCode],
  )

  const isBackground = variant === 'background'

  return (
    <div
      className={cn(
        'relative flex w-full items-center justify-center',
        isBackground ? 'aspect-auto h-full min-h-[22rem]' : 'aspect-square',
        className,
      )}
      role="img"
      aria-label="Interactive globe showing European investment markets"
    >
      <Globe
        autoRotate={!reducedMotion}
        className={cn(
          isBackground ? 'absolute inset-0 h-full w-full' : 'relative inset-auto',
        )}
        config={config}
        getMarkers={getMarkers}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          isBackground
            ? 'bg-[radial-gradient(circle_at_50%_50%,transparent_35%,var(--background)_78%)]'
            : 'bg-[radial-gradient(circle_at_50%_60%,transparent_40%,var(--background)_85%)]',
        )}
      />
    </div>
  )
}
