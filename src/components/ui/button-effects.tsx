'use client'

import { type CSSProperties, type MouseEvent, useEffect, useState } from 'react'

import { cn } from '@/utilities/index'

interface ButtonEffectsProps {
  shimmerColor?: string
  showShimmer?: boolean
  shimmerDuration?: string
}

function useRipples(duration: string) {
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([])

  function createRipple(event: MouseEvent<HTMLElement>) {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    setRipples((prev) => [...prev, { x, y, size, key: Date.now() }])
  }

  useEffect(() => {
    if (ripples.length === 0) return

    const lastRipple = ripples[ripples.length - 1]
    const timeout = setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.key !== lastRipple.key))
    }, parseInt(duration, 10))

    return () => clearTimeout(timeout)
  }, [duration, ripples])

  return { ripples, createRipple }
}

export function ButtonEffects({
  shimmerColor = 'hsl(var(--primary-foreground) / 0.65)',
  showShimmer = true,
  shimmerDuration = '3s',
}: ButtonEffectsProps) {
  return (
    <>
      {showShimmer && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          style={
            {
              '--spread': '90deg',
              '--shimmer-color': shimmerColor,
              '--speed': shimmerDuration,
            } as CSSProperties
          }
        >
          <div className="@container-[size] absolute inset-0">
            <div className="animate-shimmer-slide absolute inset-0 aspect-square h-[100cqh] [mask:none]">
              <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function useButtonRipples(duration = '600ms') {
  return useRipples(duration)
}

export function ButtonRipples({
  ripples,
  rippleColor = 'hsl(var(--primary-foreground) / 0.25)',
  duration = '600ms',
}: {
  ripples: Array<{ x: number; y: number; size: number; key: number }>
  rippleColor?: string
  duration?: string
}) {
  if (ripples.length === 0) return null

  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className="animate-rippling absolute rounded-full"
          style={
            {
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              top: `${ripple.y}px`,
              left: `${ripple.x}px`,
              backgroundColor: rippleColor,
              transform: 'scale(0)',
              '--duration': duration,
            } as CSSProperties
          }
        />
      ))}
    </span>
  )
}

export const buttonEffectsClassName = 'group relative overflow-hidden'

export function getButtonEffectColors(variant?: string | null) {
  switch (variant) {
    case 'outline':
    case 'secondary':
    case 'ghost':
      return {
        shimmer: 'hsl(var(--primary) / 0.35)',
        ripple: 'hsl(var(--primary) / 0.12)',
      }
    case 'destructive':
      return {
        shimmer: 'hsl(var(--destructive-foreground) / 0.55)',
        ripple: 'hsl(var(--destructive-foreground) / 0.2)',
      }
    default:
      return {
        shimmer: 'hsl(var(--primary-foreground) / 0.85)',
        ripple: 'hsl(var(--primary-foreground) / 0.35)',
      }
  }
}

export function shouldUseButtonEffects(variant?: string | null) {
  return variant !== 'link' && variant !== 'ghost'
}
