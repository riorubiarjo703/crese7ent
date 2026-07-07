'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollWordRevealOptions {
  enabled?: boolean
  scrub?: number | boolean
  start?: string
  end?: string
  stagger?: number
}

export function useScrollWordReveal(
  containerRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    scrub = 0.6,
    start = 'top 82%',
    end = 'top 48%',
    stagger = 0.028,
  }: UseScrollWordRevealOptions = {},
) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const words = containerRef.current.querySelectorAll<HTMLElement>('[data-scroll-word]')
    if (words.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(words, {
        yPercent: 115,
        clipPath: 'inset(100% 0 0 0)',
      })

      gsap.to(words, {
        yPercent: 0,
        clipPath: 'inset(0% 0 0 0)',
        ease: 'none',
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, enabled, end, scrub, stagger, start])
}
