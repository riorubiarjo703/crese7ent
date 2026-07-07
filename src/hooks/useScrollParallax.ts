'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollParallaxOptions {
  enabled?: boolean
  yPercent?: number
  scrub?: number | boolean
  start?: string
  end?: string
  trigger?: RefObject<HTMLElement | null>
  transformOrigin?: string
  scaleFrom?: number
}

export function useScrollParallax(
  ref: RefObject<HTMLElement | null>,
  {
    enabled = true,
    yPercent = -12,
    scrub = 0.85,
    start = 'top bottom',
    end = 'bottom top',
    trigger,
    transformOrigin,
    scaleFrom,
  }: UseScrollParallaxOptions = {},
) {
  useEffect(() => {
    if (!enabled || !ref.current) return

    const triggerEl = trigger?.current ?? ref.current

    const ctx = gsap.context(() => {
      if (transformOrigin) {
        gsap.set(ref.current, { transformOrigin })
      }

      gsap.fromTo(
        ref.current,
        {
          yPercent: 0,
          ...(scaleFrom !== undefined ? { scale: scaleFrom } : {}),
        },
        {
          yPercent,
          ...(scaleFrom !== undefined ? { scale: 1 } : {}),
          ease: 'none',
          scrollTrigger: {
            trigger: triggerEl,
            start,
            end,
            scrub,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [enabled, end, ref, scaleFrom, scrub, start, transformOrigin, trigger, yPercent])
}
