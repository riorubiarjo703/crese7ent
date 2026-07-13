'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { Media } from '@/components/Media'
import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import { OrisaRotatingLink } from '@/components/orisa/OrisaRotatingLink'
import { useOrisaServicesHoverImages } from '@/hooks/useOrisaServicesHoverImages'
import { useOrisaServicesScrollPin } from '@/hooks/useOrisaServicesScrollPin'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Media as MediaType, OrisaServicesPinBlock } from '@/payload-types'
import { cn } from '@/utilities'
import { PublicContextProps } from '@/utilities/publicContextProps'

function getMediaUrl(resource: MediaType | string | null | undefined): string | undefined {
  if (!resource || typeof resource === 'string') return undefined
  return resource.url ?? undefined
}

function ServiceItem({
  index,
  service,
  isActive,
  publicContext,
}: {
  index: number
  service: NonNullable<OrisaServicesPinBlock['services']>[number]
  isActive: boolean
  publicContext: PublicContextProps
}) {
  const number = String(index + 1).padStart(2, '0')
  const thumbUrl = getMediaUrl(
    typeof service.thumbnail === 'object' ? service.thumbnail : undefined,
  )
  const href = service.link
    ? resolveCmsLinkHref({
        type: service.link.type,
        url: service.link.url,
        reference: service.link.reference,
        section: service.link.section,
        publicContext,
      })
    : null

  const row = (
    <div
      data-service-item
      className={cn(
        'group service-item grid items-center gap-x-[30px] gap-y-4 border-b border-neutral-100 py-[21px] pb-[29px] max-[575px]:grid-cols-1 sm:grid-cols-[70px_1fr_190px] lg:grid-cols-[100px_1fr_280px]',
        isActive && 'is-active',
      )}
    >
      <span
        className={cn(
          'service-number text-[36px] leading-none font-semibold tracking-[-0.05em] text-neutral-500 transition-all duration-500',
          'group-hover:text-primary opacity-30 group-hover:opacity-100',
          'group-[.is-active]:text-primary group-[.is-active]:opacity-100',
        )}
      >
        [{number}]
      </span>

      <div className="min-w-0">
        {service.title && (
          <h3
            className={cn(
              'service-title mb-0 text-[42px] leading-[42px] font-semibold tracking-[-0.05em] text-neutral-950 transition-all duration-500 xl:text-[50px]',
              'opacity-30 group-hover:opacity-100 group-[.is-active]:opacity-100',
            )}
          >
            {service.title}
          </h3>
        )}
        {service.description && (
          <p
            className={cn(
              'service-text mb-0 max-w-[370px] overflow-hidden text-base leading-[1.62] tracking-[-0.05em] text-neutral-950 transition-all duration-500',
              'max-h-0 opacity-0 group-hover:max-h-[100px] group-hover:opacity-100',
              'group-[.is-active]:max-h-[100px] group-[.is-active]:opacity-100',
            )}
          >
            {service.description}
          </p>
        )}
      </div>

      {thumbUrl && (
        <div className="service-thumb text-right max-[575px]:hidden">
          <div className="ms-auto w-full max-w-[190px] overflow-hidden rounded-lg transition-all duration-500 group-hover:max-w-[284px] group-[.is-active]:max-w-[284px]">
            <Image
              src={thumbUrl}
              alt=""
              width={284}
              height={190}
              className="aspect-[284/190] w-full object-cover"
              sizes="(min-width: 1024px) 284px, 190px"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block text-inherit no-underline">
        {row}
      </Link>
    )
  }

  return row
}

export function OrisaServicesPinClient({
  sectionId,
  eyebrow,
  sinceLabel,
  projectCount,
  projectCountLabel,
  panelImages,
  pinOnScroll,
  services,
  cta,
  publicContext,
}: OrisaServicesPinBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [counterActive, setCounterActive] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const items = services ?? []
  const images = panelImages?.length
    ? panelImages
    : items.map((item) => item.thumbnail).filter(Boolean)
  const pinEnabled = Boolean(pinOnScroll) && !reducedMotion && items.length > 1 && isDesktop
  const hoverEnabled = !reducedMotion && isDesktop && images.length > 0

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1200px)')
    function update() {
      setIsDesktop(mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = counterRef.current
    if (!node || reducedMotion) {
      setCounterActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCounterActive(true)
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  const handleActiveIndex = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  useOrisaServicesScrollPin(sectionRef, pinRef, listRef, {
    enabled: pinEnabled,
    reducedMotion,
    itemCount: items.length,
    onActiveIndex: handleActiveIndex,
  })

  useOrisaServicesHoverImages({
    enabled: hoverEnabled,
    activeIndex,
    sectionRef,
    onActiveIndex: handleActiveIndex,
  })

  useEffect(() => {
    if (pinEnabled || hoverEnabled) return

    const observers: IntersectionObserver[] = []
    const nodes = sectionRef.current?.querySelectorAll('[data-service-item]')

    nodes?.forEach((node, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      )
      observer.observe(node)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [hoverEnabled, pinEnabled, items.length])

  if (!items.length) return null

  const ctaLabel = cta?.label?.trim() || 'Get a free quote'
  const ctaHref =
    resolveCmsLinkHref({
      type: cta?.type ?? 'custom',
      url: cta?.url ?? '/contact',
      reference: cta?.reference,
      section: cta?.section,
      publicContext,
    }) ?? '/contact'

  return (
    <section
      ref={sectionRef}
      className="at-panel-pin-area bg-white py-[120px] text-neutral-950"
      id={sectionId || 'services'}
    >
      <div className="mx-auto w-full max-w-[1750px] px-4">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-6">
          {eyebrow && (
            <OrisaRotatingLink
              href={`#${sectionId || 'services'}`}
              label={eyebrow}
              showArrow
              className="mb-2.5 border-0 bg-transparent p-0 text-base font-semibold tracking-[-0.05em] text-neutral-950 uppercase"
            />
          )}
          {sinceLabel && (
            <span className="text-base font-medium tracking-[-0.05em] text-neutral-950 underline decoration-neutral-300">
              {sinceLabel}
            </span>
          )}
        </div>

        <div className="grid gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div ref={pinRef} className="at-panel-pin mt-5 pe-[60px]">
              <div className="relative h-[300px] overflow-hidden rounded-t-2xl sm:h-[440px] lg:h-[450px]">
                {images.map((image, index) => (
                  <div
                    key={typeof image === 'object' && image && 'id' in image ? image.id : index}
                    data-hover-image
                    className={cn(
                      'hover-image absolute inset-0 size-full overflow-hidden rounded-t-2xl',
                      !hoverEnabled &&
                        (index === activeIndex ? 'z-[2] opacity-100' : 'z-[1] opacity-0'),
                    )}
                  >
                    {typeof image === 'object' && image ? (
                      <Media
                        resource={image}
                        fill
                        className="size-full"
                        imgClassName="size-full rounded-t-2xl object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                ))}
                {!images.length && (
                  <div className="flex h-full items-center justify-center text-neutral-400">
                    No image
                  </div>
                )}
              </div>

              {projectCount && (
                <div ref={counterRef} className="mt-2.5">
                  <p className="mb-0 text-xl font-semibold tracking-[-0.05em] text-neutral-950">
                    {!reducedMotion ? (
                      <AnimatedCounter active={counterActive} value={projectCount} suffix="+" />
                    ) : (
                      `${projectCount}+`
                    )}
                  </p>
                  {projectCountLabel && (
                    <span className="text-lg font-medium tracking-[-0.05em] text-neutral-500">
                      {projectCountLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div ref={listRef} className="lg:col-span-7 lg:col-start-6">
            {items.map((service, index) => (
              <ServiceItem
                key={service.id ?? `${service.title}-${index}`}
                index={index}
                isActive={index === activeIndex}
                publicContext={publicContext}
                service={service}
              />
            ))}

            <div className="at-service-btn pt-[30px] pl-0 sm:pl-[100px] lg:pl-[130px]">
              <OrisaRotatingLink
                href={ctaHref}
                label={ctaLabel}
                newTab={cta?.newTab}
                className="rounded-full bg-neutral-950 px-[25px] py-[17px] text-base font-semibold tracking-[-0.05em] text-white capitalize hover:bg-neutral-800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrisaServicesPinClient
