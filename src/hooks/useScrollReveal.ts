'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollRevealOptions {
  enabled?: boolean
  y?: number
  x?: number
  start?: string
  duration?: number
  once?: boolean
}

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  {
    enabled = true,
    y = 0,
    x = 0,
    start = 'top 85%',
    duration = 0.85,
    once = true,
  }: UseScrollRevealOptions = {},
) {
  useEffect(() => {
    if (!enabled || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [duration, enabled, once, ref, start, x, y])
}
