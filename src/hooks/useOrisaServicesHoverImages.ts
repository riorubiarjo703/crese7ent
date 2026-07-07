'use client'

import gsap from 'gsap'
import { useEffect, type RefObject } from 'react'

interface UseOrisaServicesHoverImagesOptions {
  enabled?: boolean
  activeIndex: number
  sectionRef: RefObject<HTMLElement | null>
  onActiveIndex: (index: number) => void
}

function showImage(images: HTMLElement[], index: number) {
  images.forEach((image, imageIndex) => {
    if (imageIndex === index) {
      gsap.to(image, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        zIndex: 2,
      })
    } else {
      gsap.to(image, {
        opacity: 0,
        y: 200,
        duration: 0.8,
        zIndex: 1,
        scale: 0.8,
      })
    }
  })
}

export function useOrisaServicesHoverImages({
  enabled = true,
  activeIndex,
  sectionRef,
  onActiveIndex,
}: UseOrisaServicesHoverImagesOptions) {
  useEffect(() => {
    if (!enabled || !sectionRef.current) return

    const section = sectionRef.current
    const images = Array.from(section.querySelectorAll<HTMLElement>('[data-hover-image]'))

    if (!images.length) return

    gsap.set(images, { opacity: 0, y: 50, scale: 1 })
    gsap.set(images[0], { opacity: 1, y: 0, zIndex: 2 })

    const items = section.querySelectorAll('[data-service-item]')

    const cleanups: Array<() => void> = []

    items.forEach((item, index) => {
      function handleEnter() {
        items.forEach((node) => node.classList.remove('is-active'))
        item.classList.add('is-active')
        onActiveIndex(index)
        showImage(images, index)
      }

      item.addEventListener('mouseenter', handleEnter)
      cleanups.push(() => item.removeEventListener('mouseenter', handleEnter))
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [enabled, onActiveIndex, sectionRef])

  useEffect(() => {
    if (!enabled || !sectionRef.current) return

    const images = Array.from(sectionRef.current.querySelectorAll<HTMLElement>('[data-hover-image]'))
    if (!images.length) return

    showImage(images, activeIndex)
  }, [activeIndex, enabled, sectionRef])
}
