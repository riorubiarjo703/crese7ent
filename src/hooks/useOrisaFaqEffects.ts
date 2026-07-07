'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface UseOrisaFaqEffectsOptions {
  enabled?: boolean
  reducedMotion?: boolean
}

export function useOrisaFaqEffects(
  sectionRef: RefObject<HTMLElement | null>,
  { enabled = true, reducedMotion = false }: UseOrisaFaqEffectsOptions,
) {
  useEffect(() => {
    if (!enabled || reducedMotion || !sectionRef.current) return

    const section = sectionRef.current
    const splits: SplitText[] = []

    const ctx = gsap.context(() => {
      const headlineEl = section.querySelector<HTMLElement>('[data-faq-headline]')
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

      section.querySelectorAll<HTMLElement>('[data-faq-zoom-wrap]').forEach((wrap) => {
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

      section.querySelectorAll<HTMLElement>('[data-faq-item]').forEach((item, index) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
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
