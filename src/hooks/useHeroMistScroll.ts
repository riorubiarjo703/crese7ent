'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseHeroMistScrollOptions {
  enabled?: boolean
  sectionRef: RefObject<HTMLElement | null>
  imageRef: RefObject<HTMLElement | null>
  mistRef: RefObject<HTMLElement | null>
  contentRef: RefObject<HTMLElement | null>
  onProgress?: (progress: number) => void
}

export function useHeroMistScroll({
  enabled = true,
  sectionRef,
  imageRef,
  mistRef,
  contentRef,
  onProgress,
}: UseHeroMistScrollOptions) {
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  useEffect(() => {
    if (!enabled || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          onUpdate: (self) => onProgressRef.current?.(self.progress),
        },
      })

      if (imageRef.current) {
        timeline.fromTo(
          imageRef.current,
          { scale: 1, yPercent: 0 },
          { scale: 1.2, yPercent: -10, ease: 'none' },
          0,
        )
      }

      if (mistRef.current) {
        timeline.fromTo(
          mistRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: -8, opacity: 0.9, ease: 'none' },
          0,
        )
      }

      if (contentRef.current) {
        timeline.fromTo(
          contentRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: -22, opacity: 0, ease: 'none' },
          0,
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [contentRef, enabled, imageRef, mistRef, sectionRef])
}
