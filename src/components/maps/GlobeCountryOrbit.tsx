'use client'

import { useEffect, useMemo, useState } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getCountryOrbitAngle } from '@/utilities/europe-country-coords'
import { cn } from '@/utilities'

interface GlobeCountry {
  id?: string | null
  name: string
  code?: string | null
}

interface GlobeCountryOrbitProps {
  countries: GlobeCountry[]
  hoveredCode: string | null
  onHover: (code: string | null) => void
  className?: string
}

/** Orbit radius as fraction of the shared globe frame (matches sphere edge) */
const ORBIT_RADIUS = '46%'
const ROTATION_PERIOD_MS = 56000

export function GlobeCountryOrbit({
  countries,
  hoveredCode,
  onHover,
  className,
}: GlobeCountryOrbitProps) {
  const reducedMotion = useReducedMotion()
  const [rotation, setRotation] = useState(0)

  const items = useMemo(
    () =>
      countries.map((country, index) => ({
        ...country,
        code: country.code?.toUpperCase() ?? '',
        baseAngle: getCountryOrbitAngle(country.code ?? '', index, countries.length),
      })),
    [countries],
  )

  useEffect(() => {
    if (reducedMotion || items.length === 0) return

    let frame = 0
    const startedAt = performance.now()

    function tick(now: number) {
      setRotation(((now - startedAt) / ROTATION_PERIOD_MS) * 360)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [items.length, reducedMotion])

  if (!items.length) return null

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-visible', className)}>
      <div className="absolute top-1/2 left-1/2 size-0">
        <div
          className="absolute top-0 left-0 origin-center will-change-transform"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {items.map((country) => {
            const worldAngle = (country.baseAngle + rotation + 360) % 360
            const distanceFromTop = Math.min(
              Math.abs(worldAngle - 270),
              360 - Math.abs(worldAngle - 270),
            )
            const isNearTop = distanceFromTop < 50
            const isActive = hoveredCode === country.code
            const emphasis = isActive ? 1 : isNearTop ? 0.95 : Math.max(0.18, 1 - distanceFromTop / 85)
            const labelTilt = (worldAngle - 270) * 0.28

            return (
              <div
                key={country.id ?? `${country.code}-${country.name}`}
                className="pointer-events-auto absolute top-0 left-0"
                style={{
                  transform: `rotate(${country.baseAngle}deg) translateY(calc(-1 * ${ORBIT_RADIUS})) rotate(${-country.baseAngle - rotation + labelTilt}deg)`,
                  opacity: emphasis,
                }}
              >
                <button
                  type="button"
                  className={cn(
                    'text-muted-foreground cursor-default text-xs font-medium tracking-wide whitespace-nowrap transition-colors duration-300 md:text-sm',
                    isNearTop && 'md:text-base',
                    isActive && 'text-primary font-semibold',
                    isNearTop && !isActive && 'text-foreground/85',
                  )}
                  onMouseEnter={() => onHover(country.code || null)}
                  onMouseLeave={() => onHover(null)}
                  onFocus={() => onHover(country.code || null)}
                  onBlur={() => onHover(null)}
                >
                  {country.name}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
