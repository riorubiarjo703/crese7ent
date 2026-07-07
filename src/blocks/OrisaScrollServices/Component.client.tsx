'use client'

import { ArrowRight } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { OrisaScrollServicesBlock } from '@/payload-types'
import { cn } from '@/utilities'
import { PublicContextProps } from '@/utilities/publicContextProps'

function ServicePanel({
  service,
  index,
  publicContext,
}: {
  service: NonNullable<OrisaScrollServicesBlock['services']>[number]
  index: number
  publicContext: PublicContextProps
}) {
  const number = String(index + 1).padStart(2, '0')
  const bullets = service.bullets?.filter((b) => b.item?.trim()) ?? []

  const panel = (
    <div className="rounded-2xl bg-neutral-50 p-6 md:p-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <span className="font-mono text-sm text-neutral-400">[{number}]</span>
          {service.summary && (
            <h3 className="mt-4 font-display text-2xl leading-snug font-normal text-neutral-950 md:text-3xl">
              {service.summary}
            </h3>
          )}
          {bullets.length > 0 && (
            <ul className="mt-6 list-disc space-y-2 pl-5 text-neutral-700">
              {bullets.map((bullet, bulletIndex) => (
                <li key={bullet.id ?? `${bullet.item}-${bulletIndex}`}>{bullet.item}</li>
              ))}
            </ul>
          )}
        </div>
        {typeof service.image === 'object' && service.image && (
          <div className="overflow-hidden rounded-xl">
            <Media resource={service.image} imgClassName="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
        )}
      </div>
    </div>
  )

  if (service.link?.label) {
    return (
      <CMSLink publicContext={publicContext} {...service.link} className="block">
        {panel}
      </CMSLink>
    )
  }

  return panel
}

export function OrisaScrollServicesClient({
  sectionId,
  eyebrow,
  introHeadline,
  cta,
  pinOnScroll,
  services,
  publicContext,
}: OrisaScrollServicesBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const items = services ?? []
  const navPinned = Boolean(pinOnScroll) && !reducedMotion && items.length > 1

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const nodes = sectionRef.current?.querySelectorAll('[data-scroll-service-panel]')

    nodes?.forEach((node, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index)
        },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
      )
      observer.observe(node)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [items.length])

  const scrollToPanel = useCallback((index: number) => {
    const node = sectionRef.current?.querySelector(
      `[data-scroll-service-panel-index="${index}"]`,
    )
    node?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setActiveIndex(index)
  }, [])

  if (!items.length) return null

  return (
    <section ref={sectionRef} className="bg-background py-20 md:py-28" id={sectionId || 'services'}>
      <div className="container">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            {eyebrow && (
              <span className="text-xs font-semibold tracking-[0.2em] text-neutral-950 uppercase">
                {eyebrow}
              </span>
            )}
            {introHeadline && (
              <h2 className="mt-4 max-w-4xl font-display text-3xl leading-tight font-normal text-neutral-950 md:text-4xl lg:text-5xl">
                {introHeadline}
              </h2>
            )}
          </div>
          {cta?.label && (
            <CMSLink
              publicContext={publicContext}
              {...cta}
              className="inline-flex items-center gap-2 rounded-none bg-neutral-950 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            />
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <nav
            className={cn(
              'lg:col-span-3',
              navPinned && 'lg:sticky lg:top-24 lg:self-start',
            )}
            aria-label="Services"
          >
            <ul className="space-y-2">
              {items.map((service, index) => (
                <li key={service.id ?? `${service.title}-${index}`}>
                  <button
                    type="button"
                    onClick={() => scrollToPanel(index)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors',
                      index === activeIndex
                        ? 'bg-neutral-950 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100',
                    )}
                  >
                    <span className="font-mono text-xs opacity-70">
                      [{String(index + 1).padStart(2, '0')}]
                    </span>
                    <span className="flex-1 text-sm font-medium">{service.title}</span>
                    <ArrowRight className="size-4 shrink-0 opacity-70" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8 lg:col-span-8 lg:col-start-5">
            {items.map((service, index) => (
              <div
                key={service.id ?? `panel-${service.title}-${index}`}
                className={cn(navPinned && 'min-h-[60vh] content-center')}
                data-scroll-service-panel
                data-scroll-service-panel-index={index}
              >
                <ServicePanel index={index} publicContext={publicContext} service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrisaScrollServicesClient
