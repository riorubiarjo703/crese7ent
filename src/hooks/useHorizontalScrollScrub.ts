'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface UseHorizontalScrollScrubOptions {
  enabled?: boolean
  sectionRef: RefObject<HTMLElement | null>
  trackRef: RefObject<HTMLElement | null>
  endPadding?: number
  scrub?: number
  revealItems?: boolean
  revealDistance?: number
  onProgress?: (progress: number) => void
}

function updateHorizontalCardReveals(cards: HTMLElement[], revealDistance: number) {
  const viewportWidth = window.innerWidth
  const revealZone = Math.max(viewportWidth * 0.42, 320)

  cards.forEach((card) => {
    const inner = card.querySelector<HTMLElement>('[data-strategy-card-inner]')
    if (!inner) return

    const rect = card.getBoundingClientRect()
    const progress = gsap.utils.clamp(0, 1, (viewportWidth - rect.left) / revealZone)

    gsap.set(inner, {
      opacity: progress,
      x: -revealDistance * (1 - progress),
    })
  })
}

export function useHorizontalScrollScrub({
  enabled = true,
  sectionRef,
  trackRef,
  endPadding = 48,
  scrub = 0.85,
  revealItems = false,
  revealDistance = 56,
  onProgress,
}: UseHorizontalScrollScrubOptions) {
  useEffect(() => {
    if (!enabled || !sectionRef.current || !trackRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const cards = revealItems
        ? Array.from(track.querySelectorAll<HTMLElement>('[data-strategy-card]'))
        : []

      const ctx = gsap.context(() => {
        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + endPadding)

        const syncReveals = () => {
          if (revealItems && cards.length) {
            updateHorizontalCardReveals(cards, revealDistance)
          }
        }

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              syncReveals()
              onProgress?.(self.progress)
            },
            onRefresh: (self) => {
              syncReveals()
              onProgress?.(self.progress)
            },
          },
        })

        syncReveals()
        requestAnimationFrame(syncReveals)
      }, section)

      const onResize = () => {
        if (revealItems && cards.length) {
          updateHorizontalCardReveals(cards, revealDistance)
        }
      }

      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        ctx.revert()
      }
    })

    return () => mm.revert()
  }, [enabled, endPadding, onProgress, revealDistance, revealItems, scrub, sectionRef, trackRef])
}

