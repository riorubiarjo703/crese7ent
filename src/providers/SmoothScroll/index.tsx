'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import React, { useEffect } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.08,
      duration: 1.35,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 1,
    })

    function onScroll() {
      ScrollTrigger.update()
    }

    lenis.on('scroll', onScroll)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [reducedMotion])

  return <>{children}</>
}
