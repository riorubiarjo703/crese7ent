'use client'

import gsap from 'gsap'
import { useEffect, type RefObject } from 'react'

interface UseOrisaHeroImageEffectsOptions {
  enabled?: boolean
  sectionRef: RefObject<HTMLElement | null>
  heroBgRef: RefObject<HTMLElement | null>
}

export function useOrisaHeroImageEffects({
  enabled = true,
  sectionRef,
  heroBgRef,
}: UseOrisaHeroImageEffectsOptions) {
  useEffect(() => {
    if (!enabled || !sectionRef.current || !heroBgRef.current) return

    const section = sectionRef.current
    const heroBg = heroBgRef.current
    const layerImg = heroBg.querySelector('img.layer')

    if (!layerImg) return

    const ctx = gsap.context(() => {
      // Orisa .at_fade_anim — opacity only; translate-y-[50px] stays in CSS
      gsap.fromTo(
        heroBg,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.75,
          delay: 0.4,
          ease: 'bounce.out',
        },
      )
    }, section)

    // Orisa .scene parallax — img.layer data-depth="0.8"
    const quickX = gsap.quickTo(layerImg, 'x', { duration: 0.6, ease: 'power2.out' })
    const quickY = gsap.quickTo(layerImg, 'y', { duration: 0.6, ease: 'power2.out' })

    function onMouseMove(event: MouseEvent) {
      const rect = section.getBoundingClientRect()
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height

      quickX(x * 16)
      quickY(y * 10)
    }

    function onMouseLeave() {
      quickX(0)
      quickY(0)
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      ctx.revert()
    }
  }, [enabled, heroBgRef, sectionRef])
}
