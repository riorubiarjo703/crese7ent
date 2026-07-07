'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseCredibilityMetricsScrollOptions {
  enabled?: boolean
  sectionRef: RefObject<HTMLElement | null>
  leftColumnRef: RefObject<HTMLElement | null>
  rightColumnRef: RefObject<HTMLElement | null>
  onEnter?: () => void
}

/** Two-column parallax for credibility metrics (right column shifts up on scroll). */
export function useCredibilityMetricsScroll({
  enabled = true,
  sectionRef,
  leftColumnRef,
  rightColumnRef,
  onEnter,
}: UseCredibilityMetricsScrollOptions) {
  useEffect(() => {
    if (!enabled || !sectionRef.current || !rightColumnRef.current) return

    const onEnterRef = { called: false }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          if (!onEnterRef.called) {
            onEnterRef.called = true
            onEnter?.()
          }
        },
      })

      if (leftColumnRef.current) {
        gsap.fromTo(
          leftColumnRef.current,
          { y: 32 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.85,
            },
          },
        )
      }

      gsap.fromTo(
        rightColumnRef.current,
        { y: 0 },
        {
          y: -118,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.85,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [enabled, leftColumnRef, onEnter, rightColumnRef, sectionRef])
}
