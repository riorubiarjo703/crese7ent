'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Link from 'next/link'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface UseOrisaMeetTeamEffectsOptions {
  enabled?: boolean
  reducedMotion?: boolean
}

export function useOrisaMeetTeamEffects(
  sectionRef: RefObject<HTMLElement | null>,
  { enabled = true, reducedMotion = false }: UseOrisaMeetTeamEffectsOptions,
) {
  useEffect(() => {
    if (!enabled || reducedMotion || !sectionRef.current) return

    const section = sectionRef.current
    const splits: SplitText[] = []

    const ctx = gsap.context(() => {
      const headlineEl = section.querySelector<HTMLElement>('[data-meet-headline]')
      if (headlineEl) {
        const split = SplitText.create(headlineEl, { type: 'chars, words' })
        splits.push(split)
        gsap.set(headlineEl, { perspective: 300 })
        gsap.from(split.chars, {
          duration: 1,
          delay: 0.15,
          x: 60,
          autoAlpha: 0,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineEl,
            start: 'top 90%',
            once: true,
          },
        })
      }

      section.querySelectorAll<HTMLElement>('[data-meet-zoom-wrap]').forEach((wrap) => {
        const zoomEl = wrap.querySelector<HTMLElement>('.anim-zoomin')
        if (!zoomEl) return

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

    return () => {
      splits.forEach((split) => split.revert())
      ctx.revert()
    }
  }, [enabled, reducedMotion, sectionRef])
}
