'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseOrisaPortfolioEffectsOptions {
  enabled?: boolean
  reducedMotion?: boolean
}

export function useOrisaPortfolioEffects(
  sectionRef: RefObject<HTMLElement | null>,
  pinRef: RefObject<HTMLElement | null>,
  { enabled = true, reducedMotion = false }: UseOrisaPortfolioEffectsOptions,
) {
  useEffect(() => {
    if (!enabled || reducedMotion || !sectionRef.current || !pinRef.current) {
      return
    }

    const section = sectionRef.current
    const pinEl = pinRef.current

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1199px)', () => {
        ScrollTrigger.create({
          trigger: pinEl,
          start: 'top 5%',
          endTrigger: section,
          end: 'bottom 90%',
          pin: pinEl,
          pinSpacing: false,
          anticipatePin: 1,
        })
      })

      const zoomItems = section.querySelectorAll<HTMLElement>('[data-portfolio-zoom]')
      zoomItems.forEach((zoomEl) => {
        const wrap = zoomEl.closest('[data-portfolio-zoom-wrap]')
        if (!wrap) return

        gsap.from(zoomEl, {
          autoAlpha: 0,
          scale: 1.2,
          duration: 2,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: wrap,
            start: 'top 100%',
            once: true,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [enabled, reducedMotion, pinRef, sectionRef])
}
