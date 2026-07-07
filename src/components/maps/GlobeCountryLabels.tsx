'use client'

import { useMemo } from 'react'

import {
  getCountryLabelName,
  spreadCountryLabelAngles,
} from '@/utilities/europe-country-coords'
import { cn } from '@/utilities'

interface GlobeCountry {
  id?: string | null
  name: string
  code?: string | null
  highlighted?: boolean | null
}

interface GlobeCountryLabelsProps {
  countries: GlobeCountry[]
  hoveredCode: string | null
  onHover: (code: string | null) => void
  className?: string
}

/** Static geographic labels on the globe rim — collision-spaced upper arc only */
export function GlobeCountryLabels({
  countries,
  hoveredCode,
  onHover,
  className,
}: GlobeCountryLabelsProps) {
  const items = useMemo(() => {
    const angleByCode = spreadCountryLabelAngles(countries)

    return countries
      .map((country) => {
        const code = country.code?.toUpperCase() ?? ''
        const angle = angleByCode.get(code)
        if (angle === undefined) return null

        const radians = (angle * Math.PI) / 180
        const radius = 50
        const x = 50 + Math.sin(radians) * radius
        const y = 50 - Math.cos(radians) * radius

        return {
          ...country,
          code,
          angle,
          x,
          y,
          label: getCountryLabelName(code, country.name),
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  }, [countries])

  if (!items.length) return null

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)}>
      {items.map((country) => {
        const isActive = hoveredCode === country.code

        return (
          <button
            key={country.id ?? `${country.code}-${country.name}`}
            type="button"
            className={cn(
              'pointer-events-auto absolute z-10 text-[0.65rem] font-medium tracking-wide whitespace-nowrap transition-all duration-300 md:text-xs',
              isActive
                ? 'text-primary z-20 scale-110 font-semibold'
                : 'text-foreground/75 hover:text-foreground',
            )}
            style={{
              left: `${country.x}%`,
              top: `${country.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => onHover(country.code || null)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(country.code || null)}
            onBlur={() => onHover(null)}
          >
            {country.label}
          </button>
        )
      })}
    </div>
  )
}
