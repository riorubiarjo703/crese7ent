'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollFadeOptions {
  enabled?: boolean
  y?: number
  scrub?: number | boolean
  start?: string
  end?: string
}

export function useScrollFade(
  ref: RefObject<HTMLElement | null>,
  {
    enabled = true,
    y = 32,
    scrub = 0.7,
    start = 'top 88%',
    end = 'top 58%',
  }: UseScrollFadeOptions = {},
) {
  useEffect(() => {
    if (!enabled || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [enabled, end, ref, scrub, start, y])
}
