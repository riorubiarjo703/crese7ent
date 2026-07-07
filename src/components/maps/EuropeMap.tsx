'use client'

import React, { useState } from 'react'

import { cn } from '@/utilities'

interface EuropeMapProps {
  highlightedCodes: string[]
  hoveredCode?: string | null
  onCountryHover?: (code: string | null) => void
  className?: string
}

/** Simplified Europe landmass silhouette (decorative background). */
const EUROPE_SILHOUETTE =
  'M 95 95 L 125 78 L 165 72 L 205 82 L 245 75 L 285 88 L 325 105 L 355 135 L 365 175 L 355 215 L 335 255 L 310 295 L 285 330 L 255 355 L 220 365 L 185 355 L 155 335 L 130 305 L 110 270 L 95 235 L 88 195 L 85 155 L 90 120 Z'

interface CountryNode {
  x: number
  y: number
  label: string
}

const COUNTRY_NODES: Record<string, CountryNode> = {
  ES: { x: 118, y: 300, label: 'Spain' },
  PT: { x: 88, y: 308, label: 'Portugal' },
  FR: { x: 168, y: 278, label: 'France' },
  GB: { x: 148, y: 218, label: 'United Kingdom' },
  IE: { x: 122, y: 228, label: 'Ireland' },
  DE: { x: 238, y: 248, label: 'Germany' },
  IT: { x: 238, y: 318, label: 'Italy' },
  NL: { x: 208, y: 232, label: 'Netherlands' },
  BE: { x: 198, y: 252, label: 'Belgium' },
  CH: { x: 222, y: 278, label: 'Switzerland' },
  AT: { x: 258, y: 278, label: 'Austria' },
  PL: { x: 288, y: 248, label: 'Poland' },
  SE: { x: 268, y: 168, label: 'Sweden' },
  NO: { x: 238, y: 128, label: 'Norway' },
  DK: { x: 228, y: 218, label: 'Denmark' },
  FI: { x: 318, y: 138, label: 'Finland' },
}

export function EuropeMap({
  highlightedCodes,
  hoveredCode,
  onCountryHover,
  className,
}: EuropeMapProps) {
  const [internalHover, setInternalHover] = useState<string | null>(null)
  const activeHover = hoveredCode ?? internalHover
  const highlightedSet = new Set(highlightedCodes.map((code) => code.toUpperCase()))

  function handleHover(code: string | null) {
    setInternalHover(code)
    onCountryHover?.(code)
  }

  return (
    <svg
      viewBox="60 60 320 320"
      className={cn('h-auto w-full max-w-xl', className)}
      role="img"
      aria-label="Map of Europe showing investment markets"
    >
      <path d={EUROPE_SILHOUETTE} className="fill-muted/50 stroke-border stroke-1" />

      {Object.entries(COUNTRY_NODES).map(([code, { x, y, label }]) => {
        const isHighlighted = highlightedSet.has(code)
        const isHovered = activeHover === code
        const isActive = isHighlighted || isHovered
        const radius = isActive ? 10 : isHighlighted ? 8 : 0

        if (!isHighlighted && !isHovered) return null

        return (
          <g
            key={code}
            role="button"
            tabIndex={0}
            aria-label={label}
            className="cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onMouseEnter={() => handleHover(code)}
            onMouseLeave={() => handleHover(null)}
            onFocus={() => handleHover(code)}
            onBlur={() => handleHover(null)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleHover(code)
              }
            }}
          >
            {isActive && (
              <circle
                cx={x}
                cy={y}
                r={radius + 8}
                className="fill-primary/15 pointer-events-none"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={radius || 8}
              className={cn(
                'stroke-background pointer-events-none stroke-2 transition-all duration-300',
                isActive ? 'fill-primary' : 'fill-muted-foreground/40',
              )}
            />
            {isActive && (
              <text
                x={x}
                y={y - 16}
                textAnchor="middle"
                className="fill-foreground pointer-events-none text-[11px] font-medium"
              >
                {label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
