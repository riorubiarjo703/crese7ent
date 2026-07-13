'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseOrisaClosingBannerEffectsOptions {
  enabled?: boolean
  reducedMotion?: boolean
}

/**
 * Orisa main.js §23 — scale-up-img: parallax background (data-speed 0.4) + scroll scale to 1.15.
 */
export function useOrisaClosingBannerEffects(
  sectionRef: RefObject<HTMLElement | null>,
  { enabled = true, reducedMotion = false }: UseOrisaClosingBannerEffectsOptions,
) {
  useEffect(() => {
    if (!enabled || reducedMotion || !sectionRef.current) return

    const section = sectionRef.current
    const image = section.querySelector<HTMLElement>('[data-closing-banner-image]')
    if (!image) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: 0, scale: 1 },
        {
          yPercent: 12,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom center',
            scrub: 1,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [enabled, reducedMotion, sectionRef])
}
