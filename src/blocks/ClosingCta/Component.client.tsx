'use client'

import React, { useRef } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollFade } from '@/hooks/useScrollFade'
import { useScrollParallax } from '@/hooks/useScrollParallax'
import type { ClosingCtaBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

export function ClosingCtaClient({
  headline,
  supportingText,
  backgroundImage,
  primaryCta,
  secondaryCta,
  publicContext,
  ...rest
}: ClosingCtaBlock & { publicContext: PublicContextProps }) {
  const legacySupportingText =
    supportingText ?? (rest as { subheadline?: string | null }).subheadline ?? null
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const hasPrimaryCta = primaryCta && (primaryCta.label || primaryCta.url || primaryCta.reference)
  const hasSecondaryCta =
    secondaryCta && (secondaryCta.label || secondaryCta.url || secondaryCta.reference)

  useScrollParallax(backgroundRef, {
    enabled: !reducedMotion,
    yPercent: 18,
    trigger: sectionRef,
    scrub: 0.9,
  })

  useScrollParallax(contentRef, {
    enabled: !reducedMotion,
    yPercent: -8,
    trigger: sectionRef,
    scrub: 0.9,
  })

  useScrollFade(contentRef, { enabled: !reducedMotion, y: 48, scrub: 0.75 })

  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden md:min-h-[80vh]"
      ref={sectionRef}
    >
      <div className="absolute inset-0 overflow-hidden" ref={backgroundRef}>
        {backgroundImage && typeof backgroundImage === 'object' ? (
          <Media
            resource={backgroundImage}
            fill
            imgClassName="object-cover scale-110"
            loading="lazy"
            priority={false}
          />
        ) : (
          <div className="bg-muted absolute inset-0" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-2xl will-change-transform" ref={contentRef}>
          {headline && (
            <RichText
              publicContext={publicContext}
              content={headline}
              withWrapper={false}
              overrideStyle={{
                h2: 'text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl',
                h3: 'text-3xl font-semibold tracking-tight md:text-4xl',
              }}
            />
          )}
          {legacySupportingText && (
            <p className="text-muted-foreground mt-6 text-lg md:text-xl">{legacySupportingText}</p>
          )}
          {(hasPrimaryCta || hasSecondaryCta) && (
            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              data-scroll-reveal="up"
              data-scroll-distance="32"
              data-scroll-start="top 80%"
            >
              {hasPrimaryCta && (
                <CMSLink publicContext={publicContext} className="w-full sm:w-auto" {...primaryCta} />
              )}
              {hasSecondaryCta && (
                <CMSLink
                  publicContext={publicContext}
                  appearance="outline"
                  className="w-full sm:w-auto"
                  {...secondaryCta}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
