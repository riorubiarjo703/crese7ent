'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseHomepageScrollEffectsOptions {
  enabled?: boolean
}

function applyParallax(selector: string, defaultY: number) {
  const targets = gsap.utils.toArray<HTMLElement>(selector)
  targets.forEach((element) => {
    const speed = Number(element.dataset.scrollSpeed ?? defaultY)
    const yPercent = element.dataset.scrollDirection === 'down' ? Math.abs(speed) : -Math.abs(speed)

    gsap.to(element, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: element.dataset.scrollTrigger
          ? document.querySelector<HTMLElement>(element.dataset.scrollTrigger) ?? element
          : element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.85,
      },
    })
  })
}

function getRevealFromVars(variant: string, distance: number): gsap.TweenVars {
  switch (variant) {
    case 'down':
      return { opacity: 0, y: -distance }
    case 'right':
      return { opacity: 0, x: distance }
    case 'left':
      return { opacity: 0, x: -distance }
    case 'up':
    default:
      return { opacity: 0, y: distance }
  }
}

function applyScrollReveals() {
  gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]').forEach((element) => {
    const variant = element.dataset.scrollReveal ?? 'up'
    const distance = Number(element.dataset.scrollDistance ?? 48)
    const from = getRevealFromVars(variant, distance)

    gsap.fromTo(
      element,
      from,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: Number(element.dataset.scrollDuration ?? 0.85),
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: element.dataset.scrollStart ?? 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  })
}

function applyScrollStaggers() {
  gsap.utils.toArray<HTMLElement>('[data-scroll-stagger]').forEach((container) => {
    const variant = container.dataset.scrollStagger ?? 'up'
    const distance = Number(container.dataset.scrollDistance ?? 40)
    const itemSelector = container.dataset.scrollStaggerItem ?? '[data-scroll-stagger-item]'
    const items = container.querySelectorAll<HTMLElement>(itemSelector)
    if (!items.length) return

    const from = getRevealFromVars(variant, distance)

    gsap.set(items, from)
    gsap.to(items, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: Number(container.dataset.scrollDuration ?? 0.72),
      stagger: Number(container.dataset.scrollStaggerDelay ?? 0.09),
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: container.dataset.scrollStart ?? 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  })
}

/** Lenis-linked parallax + declarative scroll reveals for homepage sections */
export function useHomepageScrollEffects({ enabled = true }: UseHomepageScrollEffectsOptions) {
  useEffect(() => {
    if (!enabled) return

    const hasParallax =
      document.querySelector('[data-home-parallax], [data-scroll-parallax]') !== null
    const hasReveals =
      document.querySelector('[data-scroll-reveal], [data-scroll-stagger]') !== null

    if (!hasParallax && !hasReveals) return

    const ctx = gsap.context(() => {
      if (hasParallax) {
        applyParallax('[data-home-parallax]', 12)
        applyParallax('[data-scroll-parallax]', 12)
      }
      if (hasReveals) {
        applyScrollReveals()
        applyScrollStaggers()
      }
    })

    return () => ctx.revert()
  }, [enabled])
}
