'use client'

import { useEffect, useRef, useState } from 'react'

import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { OrisaStatsBarBlock } from '@/payload-types'

const DEFAULT_STATS = [
  { value: '10', suffix: 'K+', label: 'Years of Creative Practice' },
  { value: '50', suffix: 'K+', label: 'Projects Carefully Crafted' },
  { value: '16', suffix: 'K+', label: 'Brands Collaborated With' },
  { value: '20', suffix: 'M+', label: 'Total Funding Supported' },
  { value: '98', suffix: '%', label: 'Client satisfaction rate' },
] as const

export function OrisaStatsBarClient({
  sectionId,
  stats,
}: OrisaStatsBarBlock & { publicContext: unknown }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [countersActive, setCountersActive] = useState(false)

  const items = (stats?.length ? stats : DEFAULT_STATS).slice(0, 6).map((stat, index) => ({
    value: stat.value ?? DEFAULT_STATS[index]?.value ?? '0',
    suffix: stat.suffix ?? DEFAULT_STATS[index]?.suffix ?? '',
    label: stat.label ?? DEFAULT_STATS[index]?.label ?? '',
  }))

  useEffect(() => {
    if (reducedMotion) {
      setCountersActive(true)
      return
    }

    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCountersActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-50px 0px', threshold: 0.2 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id={sectionId || 'stats-bar'}
      className="at-sec8-area-wrapper mx-auto max-w-[2200px]"
    >
      <div className="at-sec8-area mx-2 mt-10 rounded-[20px] bg-neutral-50 py-[90px] lg:mx-3">
        <div className="w-full px-4">
          <div className="flex flex-wrap items-center justify-around gap-8 lg:justify-between">
            {items.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="text-center lg:text-start">
                <h2 className="mb-0 text-[clamp(2.5rem,5vw,4rem)] leading-none font-semibold tracking-[-0.05em] text-neutral-950">
                  <AnimatedCounter
                    active={countersActive}
                    value={stat.value}
                    suffix={stat.suffix}
                    className="whitespace-nowrap"
                    duration={1.5}
                  />
                </h2>
                <p className="mt-2 mb-0 text-sm leading-snug font-medium tracking-[-0.02em] text-neutral-600 md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrisaStatsBarClient
