'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseGsapScrollPinOptions {
  enabled?: boolean
  end?: string
  reducedMotion?: boolean
}

export function useGsapScrollPin(
  ref: RefObject<HTMLElement | null>,
  { enabled = false, end = '+=100%', reducedMotion = false }: UseGsapScrollPinOptions = {},
) {
  useEffect(() => {
    if (!enabled || reducedMotion || !ref.current) return

    const section = ref.current

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [enabled, end, reducedMotion, ref])
}
