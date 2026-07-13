'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { Media } from '@/components/Media'
import { OrisaHoverArrow } from '@/components/orisa/OrisaHoverArrow'
import { OrisaHoverRotate } from '@/components/orisa/OrisaHoverRotate'
import { useOrisaClosingBannerEffects } from '@/hooks/useOrisaClosingBannerEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ClosingCtaBlock, Media as MediaType } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'

const BACKGROUND_FALLBACK = '/seed/orisa/creative/pages/img-22.webp'
const LOGO_FALLBACK = '/seed/orisa/creative/template/logo/favicon-dark.svg'

const DEMO_HEADLINE_LINES = ["Let's Create", 'Meaning Together'] as const

const DEMO_DESCRIPTION =
  '[ A creative studio crafting bold, user-focused digital experiences. At Orisa, we blend strategy, design, and innovation to help brands stand out and grow. ]'

function isPopulatedMedia(
  resource: MediaType | string | null | undefined,
): resource is MediaType {
  return Boolean(resource && typeof resource === 'object' && resource.url)
}

function formatLocalTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
}

function LocalTimeBadge() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => setTime(formatLocalTime(new Date()))
    update()
    const intervalId = window.setInterval(update, 60_000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <span className="rounded-full border border-white/30 bg-transparent px-3 py-1 text-[20px] leading-none font-medium tracking-[-0.04em] text-white">
      Local time: {time || '--:--'}
    </span>
  )
}

function OrisaBorderButton({
  href,
  label,
  newTab,
}: {
  href: string
  label: string
  newTab?: boolean | null
}) {
  const newTabProps = newTab ? { rel: 'noopener noreferrer' as const, target: '_blank' as const } : {}

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border border-white/30 bg-white/25 px-6 py-3 text-base font-semibold tracking-[-0.05em] text-white transition-colors hover:bg-white/35"
      {...newTabProps}
    >
      <OrisaHoverRotate>{label}</OrisaHoverRotate>
      <OrisaHoverArrow className="text-white" />
    </Link>
  )
}

export function ClosingCtaOrisa01Client({
  headlineLines,
  hoursCaption,
  descriptionLine,
  brandName,
  showLocalTime,
  backgroundImage,
  primaryCta,
  publicContext,
}: ClosingCtaBlock & { publicContext: PublicContextProps }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useOrisaClosingBannerEffects(sectionRef, {
    enabled: !reducedMotion,
    reducedMotion,
  })

  const ctaHref =
    resolveCmsLinkHref({
      type: primaryCta?.type ?? 'custom',
      url: primaryCta?.url ?? '/contact',
      reference: primaryCta?.reference,
      section: primaryCta?.section,
      publicContext,
    }) ?? '/contact'
  const ctaLabel = primaryCta?.label?.trim() || 'Book A Call Now'

  const lines = (headlineLines?.length
    ? headlineLines.map((entry) => entry.line?.trim()).filter(Boolean)
    : [...DEMO_HEADLINE_LINES]) as string[]

  const hoursText = hoursCaption?.trim() || '[ From 8:00 To 16:30 ]'
  const description = descriptionLine?.trim() || DEMO_DESCRIPTION
  const brand = brandName?.trim() || 'Orisa'

  return (
    <section
      ref={sectionRef}
      className="at-banner-thumb scale-up-img relative hidden h-[800px] w-full overflow-hidden lg:block xl:h-[800px]"
      aria-label="Closing call to action"
    >
      <div className="absolute inset-0 overflow-hidden">
        {isPopulatedMedia(backgroundImage) ? (
          <div
            data-closing-banner-image
            className="scale-up absolute inset-0 h-full w-full will-change-transform"
          >
            <Media
              resource={backgroundImage}
              fill
              className="h-full w-full"
              imgClassName="img-cover object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            data-closing-banner-image
            src={BACKGROUND_FALLBACK}
            alt=""
            className="scale-up img-cover absolute inset-0 h-[115%] w-full object-cover will-change-transform"
          />
        )}
      </div>

      <div className="absolute inset-0">
        <div className="flex h-full flex-col">
          <div className="w-full px-4">
            <div className="flex items-center justify-between pt-[100px]">
              <div className="at-header-logo flex items-center">
                <Link href="/" className="inline-flex items-center gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOGO_FALLBACK} alt="" width={30} height={30} className="h-[30px] w-[30px]" />
                  <span className="mb-0 text-2xl font-bold text-white">{brand}</span>
                </Link>
              </div>
              {showLocalTime !== false && <LocalTimeBadge />}
            </div>
          </div>

          <div className="mt-auto w-full px-4 pb-16">
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="mb-0 text-[48px] leading-[1.05] font-semibold tracking-[-0.05em] text-white md:text-[56px]">
                  {lines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h2>

                <div className="flex flex-wrap items-center gap-4 pt-[30px]">
                  <OrisaBorderButton
                    href={ctaHref}
                    label={ctaLabel}
                    newTab={primaryCta?.newTab}
                  />
                  <span className="text-sm font-medium tracking-[-0.04em] text-white">
                    {hoursText}
                  </span>
                </div>
              </div>

              <div className="text-end lg:col-span-4 lg:col-start-9">
                <p className="mb-0 text-[20px] leading-[1.5] font-medium tracking-[-0.04em] text-white">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClosingCtaOrisa01Client
