'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseOrisaTestimonialEffectsOptions {
  enabled?: boolean
  reducedMotion?: boolean
  badgeRef?: RefObject<HTMLElement | null>
  badgeTextRef?: RefObject<HTMLElement | null>
}

export function useOrisaTestimonialEffects(
  carouselRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    reducedMotion = false,
    badgeRef,
    badgeTextRef,
  }: UseOrisaTestimonialEffectsOptions,
) {
  useEffect(() => {
    if (!enabled || reducedMotion || !carouselRef.current) {
      return
    }

    const item = carouselRef.current
    const badge = badgeRef?.current
    const badgeText = badgeTextRef?.current

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
          },
        })
      })

      if (badge) {
        gsap.to(badge, {
          scale: 25,
          rotation: 180,
          duration: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: badge,
            start: 'top 60%',
            end: 'bottom 0%',
            scrub: 1,
          },
        })
      }

      if (badgeText) {
        gsap.to(badgeText, {
          scale: 8,
          duration: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: badgeText,
            start: 'top 70%',
            end: 'bottom 0%',
            scrub: 1,
          },
        })
      }
    }, item)

    return () => ctx.revert()
  }, [badgeRef, badgeTextRef, carouselRef, enabled, reducedMotion])
}
