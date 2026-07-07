'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseStrategyCardRevealOptions {
  enabled?: boolean
  containerRef: RefObject<HTMLElement | null>
  revealDistance?: number
}

/** Fade/slide strategy cards in from the left when scrolling vertically (stacked layout). */
export function useStrategyCardReveal({
  enabled = true,
  containerRef,
  revealDistance = 72,
}: UseStrategyCardRevealOptions) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const cards = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('[data-strategy-card-inner]'),
    )
    if (!cards.length) return

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -revealDistance },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, enabled, revealDistance])
}
