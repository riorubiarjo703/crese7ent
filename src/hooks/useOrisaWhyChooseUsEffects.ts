'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface UseOrisaWhyChooseUsEffectsOptions {
  enabled?: boolean
  reducedMotion?: boolean
}

function animateRevealTitle(element: HTMLElement, splits: SplitText[]) {
  const split = SplitText.create(element, { type: 'chars, words' })
  splits.push(split)

  gsap.set(element, { perspective: 300 })

  gsap.from(split.chars, {
    duration: 1,
    delay: 0.2,
    x: 80,
    autoAlpha: 0,
    stagger: 0.04,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      once: true,
    },
  })
}

function animateRevealIntro(container: HTMLElement) {
  const targets = container.querySelectorAll('p')
  const elements = targets.length ? targets : [container]

  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 90%',
        once: true,
      },
    },
  )
}

/**
 * Orisa main.js §28 — each cube facet assembles independently on scroll (scrub).
 */
function animateDecorDiamonds(decorRef: HTMLElement) {
  const svgLeft = decorRef.querySelector<SVGElement>('[data-why-decor-facet="left"]')
  const svgCenter = decorRef.querySelector<SVGElement>('[data-why-decor-facet="center"]')
  const svgRight = decorRef.querySelector<SVGElement>('[data-why-decor-facet="right"]')

  const scrollTriggerBase = {
    trigger: decorRef,
    start: 'top 90%',
    end: 'bottom center',
    scrub: 1,
  }

  if (svgLeft) {
    gsap.from(svgLeft, {
      transformOrigin: 'left center',
      ease: 'power2.out',
      x: -100,
      scrollTrigger: { ...scrollTriggerBase },
    })
  }

  if (svgCenter) {
    gsap.from(svgCenter, {
      transformOrigin: 'center center',
      ease: 'power2.out',
      y: -100,
      scrollTrigger: { ...scrollTriggerBase },
    })
  }

  if (svgRight) {
    gsap.from(svgRight, {
      transformOrigin: 'right center',
      ease: 'power2.out',
      x: 100,
      scrollTrigger: { ...scrollTriggerBase },
    })
  }
}

export function useOrisaWhyChooseUsEffects(
  sectionRef: RefObject<HTMLElement | null>,
  { enabled = true, reducedMotion = false }: UseOrisaWhyChooseUsEffectsOptions,
) {
  useEffect(() => {
    if (!enabled || reducedMotion || !sectionRef.current) {
      return
    }

    const section = sectionRef.current
    const splits: SplitText[] = []

    const ctx = gsap.context(() => {
      const headlineWrap = section.querySelector<HTMLElement>('[data-why-headline]')
      const headlineEl =
        headlineWrap?.querySelector('h2, h3, h4') ??
        headlineWrap?.querySelector('[data-why-headline-fallback]')

      if (headlineEl instanceof HTMLElement) {
        animateRevealTitle(headlineEl, splits)
      }

      const introWrap = section.querySelector<HTMLElement>('[data-why-intro]')
      if (introWrap) {
        animateRevealIntro(introWrap)
      }

      const decor = section.querySelector<HTMLElement>('[data-why-decor]')
      if (decor) {
        animateDecorDiamonds(decor)
      }

      const zoomWraps = section.querySelectorAll<HTMLElement>('[data-why-zoom-wrap]')

      zoomWraps.forEach((wrap) => {
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
