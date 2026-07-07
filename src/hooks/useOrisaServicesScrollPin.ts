'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseOrisaServicesScrollPinOptions {
  enabled?: boolean
  reducedMotion?: boolean
  itemCount: number
  onActiveIndex: (index: number) => void
}

export function useOrisaServicesScrollPin(
  sectionRef: RefObject<HTMLElement | null>,
  pinRef: RefObject<HTMLElement | null>,
  listRef: RefObject<HTMLElement | null>,
  { enabled = true, reducedMotion = false, itemCount, onActiveIndex }: UseOrisaServicesScrollPinOptions,
) {
  const onActiveIndexRef = useRef(onActiveIndex)
  onActiveIndexRef.current = onActiveIndex

  useEffect(() => {
    if (!enabled || reducedMotion || !sectionRef.current || !pinRef.current) {
      return
    }

    const section = sectionRef.current
    const pinEl = pinRef.current

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinEl,
        start: 'top 5%',
        endTrigger: section,
        end: 'bottom 90%',
        pin: pinEl,
        pinSpacing: false,
        anticipatePin: 1,
      })

      const nodes = section.querySelectorAll('[data-service-item]')
      nodes.forEach((node, index) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => onActiveIndexRef.current(index),
          onEnterBack: () => onActiveIndexRef.current(index),
        })
      })
    }, section)

    return () => ctx.revert()
  }, [enabled, itemCount, reducedMotion, pinRef, listRef, sectionRef])
}
