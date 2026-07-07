'use client'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface UseOrisaAboutEffectsOptions {
  enabled?: boolean
  teamCountValue?: string | null
  sectionRef: RefObject<HTMLElement | null>
  eyebrowRef: RefObject<HTMLElement | null>
  headlineRef: RefObject<HTMLElement | null>
  ctaRef: RefObject<HTMLElement | null>
  leftColRef: RefObject<HTMLElement | null>
  logoRef: RefObject<HTMLElement | null>
  taglineRef: RefObject<HTMLElement | null>
  avatarsRef: RefObject<HTMLElement | null>
  teamCountRef: RefObject<HTMLElement | null>
  decorRef: RefObject<HTMLElement | null>
  centerThumbRef: RefObject<HTMLElement | null>
  centerZoomRef: RefObject<HTMLElement | null>
  centerParallaxRef: RefObject<HTMLElement | null>
  centerTextRef: RefObject<HTMLElement | null>
  rightThumbRef: RefObject<HTMLElement | null>
  rightZoomRef: RefObject<HTMLElement | null>
  rightParallaxRef: RefObject<HTMLElement | null>
  rightTextRef: RefObject<HTMLElement | null>
}

function animateCharTitle(element: HTMLElement, splits: SplitText[]) {
  const split = SplitText.create(element, { type: 'chars, words' })
  splits.push(split)

  gsap.set(element, { perspective: 300 })

  gsap.from(split.chars, {
    duration: 1,
    delay: 0.5,
    x: 100,
    autoAlpha: 0,
    stagger: 0.05,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  })
}

function animateFadeParagraphs(container: HTMLElement, start = 'top 90%') {
  const paragraphs = container.querySelectorAll('p')
  const targets = paragraphs.length ? paragraphs : [container]

  gsap.fromTo(
    targets,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      },
    },
  )
}

function animateZoomIn(
  wrapRef: HTMLElement,
  zoomRef: HTMLElement,
  parallaxRef: HTMLElement,
  parallaxYPercent: number,
) {
  gsap.from(zoomRef, {
    autoAlpha: 0,
    scale: 1.2,
    duration: 2,
    ease: 'power2.out',
    clearProps: 'all',
    scrollTrigger: {
      trigger: wrapRef,
      start: 'top 100%',
      once: true,
    },
  })

  gsap.fromTo(
    parallaxRef,
    { yPercent: 0 },
    {
      yPercent: parallaxYPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapRef,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
}

function animateDecorSvg(decorRef: HTMLElement) {
  gsap.to(decorRef, {
    transformOrigin: 'top',
    y: -500,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: decorRef,
      start: 'top center',
      scrub: 1,
    },
  })

  const svgLeft = decorRef.querySelector('svg:nth-child(1)')
  const svgCenter = decorRef.querySelector('svg:nth-child(2)')
  const svgRight = decorRef.querySelector('svg:nth-child(3)')

  if (svgLeft) {
    gsap.from(svgLeft, {
      transformOrigin: 'left center',
      duration: 1,
      ease: 'power2.out',
      x: -100,
      scrollTrigger: {
        trigger: decorRef,
        start: 'top 90%',
        end: 'bottom center',
        scrub: 1,
      },
    })
  }

  if (svgCenter) {
    gsap.from(svgCenter, {
      transformOrigin: 'center center',
      duration: 1,
      ease: 'power2.out',
      y: -100,
      scrollTrigger: {
        trigger: decorRef,
        start: 'top 90%',
        end: 'bottom center',
        scrub: 1,
      },
    })
  }

  if (svgRight) {
    gsap.from(svgRight, {
      transformOrigin: 'right center',
      duration: 1,
      ease: 'power2.out',
      x: 100,
      scrollTrigger: {
        trigger: decorRef,
        start: 'top 90%',
        end: 'bottom center',
        scrub: 1,
      },
    })
  }
}

function animateTeamCount(
  teamCountRef: HTMLElement,
  teamCountValue: string,
  timeline: gsap.core.Timeline,
) {
  const match = teamCountValue.match(/(\d+)/)
  const target = match ? Number.parseInt(match[1], 10) : 0
  const suffix = teamCountValue.replace(/\d+/, '')

  gsap.set(teamCountRef, { opacity: 0 })

  const counter = { value: 0 }

  timeline.to(
    teamCountRef,
    {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    },
    '-=0.1',
  )

  timeline.to(
    counter,
    {
      value: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        teamCountRef.textContent = `${Math.round(counter.value)}${suffix}`
      },
    },
    '<',
  )
}

export function useOrisaAboutEffects({
  enabled = true,
  teamCountValue,
  sectionRef,
  eyebrowRef,
  headlineRef,
  ctaRef,
  leftColRef,
  logoRef,
  taglineRef,
  avatarsRef,
  teamCountRef,
  decorRef,
  centerThumbRef,
  centerZoomRef,
  centerParallaxRef,
  centerTextRef,
  rightThumbRef,
  rightZoomRef,
  rightParallaxRef,
  rightTextRef,
}: UseOrisaAboutEffectsOptions) {
  useEffect(() => {
    if (!enabled || !sectionRef.current) return

    const splits: SplitText[] = []

    const ctx = gsap.context(() => {
      const headerTrigger = eyebrowRef.current ?? headlineRef.current ?? sectionRef.current

      if (headerTrigger) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerTrigger,
            start: 'top 85%',
            once: true,
          },
        })

        if (eyebrowRef.current) {
          gsap.set(eyebrowRef.current, { opacity: 0, y: 20 })
          headerTl.to(eyebrowRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          })
        }

        if (headlineRef.current) {
          headerTl.from(
            headlineRef.current,
            {
              y: 28,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
            },
            eyebrowRef.current ? '-=0.05' : 0,
          )
        }

        if (ctaRef.current) {
          gsap.set(ctaRef.current, { opacity: 0, scale: 0.85 })
          headerTl.to(
            ctaRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.35',
          )
        }
      }

      if (leftColRef.current) {
        const leftTl = gsap.timeline({
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 88%',
            once: true,
          },
        })

        if (logoRef.current) {
          gsap.set(logoRef.current, { opacity: 0 })
          leftTl.to(logoRef.current, { opacity: 1, duration: 0.45, ease: 'power2.out' })
        }

        if (taglineRef.current) {
          gsap.set(taglineRef.current, { opacity: 0, y: 18 })
          leftTl.to(
            taglineRef.current,
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
            logoRef.current ? '-=0.15' : 0,
          )
        }

        if (avatarsRef.current) {
          const avatarEls = avatarsRef.current.querySelectorAll('[data-orisa-about-avatar]')
          if (avatarEls.length) {
            gsap.set(avatarEls, { opacity: 0, scale: 0 })
            leftTl.to(
              avatarEls,
              {
                opacity: 1,
                scale: 1,
                duration: 0.45,
                stagger: 0.06,
                ease: 'back.out(1.6)',
              },
              '-=0.1',
            )
          }
        }

        if (teamCountRef.current && teamCountValue) {
          animateTeamCount(teamCountRef.current, teamCountValue, leftTl)
        } else if (teamCountRef.current) {
          gsap.set(teamCountRef.current, { opacity: 0 })
          leftTl.to(
            teamCountRef.current,
            { opacity: 1, duration: 0.4, ease: 'power2.out' },
            '-=0.1',
          )
        }
      }

      if (decorRef.current) {
        animateDecorSvg(decorRef.current)
      }

      if (centerThumbRef.current && centerZoomRef.current && centerParallaxRef.current) {
        animateZoomIn(
          centerThumbRef.current,
          centerZoomRef.current,
          centerParallaxRef.current,
          -12,
        )
      }

      if (centerTextRef.current) {
        const centerTitle = centerTextRef.current.querySelector('.orisa-about-char-title')
        if (centerTitle instanceof HTMLElement) {
          animateCharTitle(centerTitle, splits)
        }
        animateFadeParagraphs(centerTextRef.current)
      }

      if (rightThumbRef.current && rightZoomRef.current && rightParallaxRef.current) {
        animateZoomIn(
          rightThumbRef.current,
          rightZoomRef.current,
          rightParallaxRef.current,
          -8,
        )
      }

      if (rightTextRef.current) {
        const rightTitle = rightTextRef.current.querySelector('.orisa-about-char-title')
        if (rightTitle instanceof HTMLElement) {
          animateCharTitle(rightTitle, splits)
        }
        animateFadeParagraphs(rightTextRef.current)
      }
    }, sectionRef)

    return () => {
      splits.forEach((split) => split.revert())
      ctx.revert()
    }
  }, [
    avatarsRef,
    centerParallaxRef,
    centerTextRef,
    centerThumbRef,
    centerZoomRef,
    ctaRef,
    decorRef,
    enabled,
    eyebrowRef,
    headlineRef,
    leftColRef,
    logoRef,
    rightParallaxRef,
    rightTextRef,
    rightThumbRef,
    rightZoomRef,
    sectionRef,
    taglineRef,
    teamCountRef,
    teamCountValue,
  ])
}
