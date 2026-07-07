'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollStaggerRevealOptions {
  enabled?: boolean
  selector?: string
  y?: number
  x?: number
  stagger?: number
  start?: string
  duration?: number
}

export function useScrollStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    selector = '[data-scroll-stagger-item]',
    y = 0,
    x = 0,
    stagger = 0.12,
    start = 'top 85%',
    duration = 0.75,
  }: UseScrollStaggerRevealOptions = {},
) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const items = containerRef.current.querySelectorAll<HTMLElement>(selector)
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y, x })

      gsap.to(items, {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, duration, enabled, selector, stagger, start, x, y])
}
