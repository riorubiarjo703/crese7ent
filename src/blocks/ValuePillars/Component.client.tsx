'use client'

import React from 'react'

import { CMSLink } from '@/components/Link'
import { SectionReveal } from '@/components/motion/SectionReveal'
import RichText from '@/components/RichText'
import { MagicCard } from '@/components/ui/magic-card'
import { ShimmerLink } from '@/components/ui/shimmer-link'
import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ValuePillarsBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { BRAND_RED, BRAND_RED_80 } from '@/utilities/brand-colors'
import { cn } from '@/utilities'

function PillarCard({
  pillar,
  publicContext,
  className,
}: {
  pillar: NonNullable<ValuePillarsBlock['pillars']>[number]
  publicContext: PublicContextProps
  className?: string
}) {
  const ctaHref = pillar.cta
    ? resolveCmsLinkHref({
        type: pillar.cta.type,
        url: pillar.cta.url,
        reference: pillar.cta.reference,
        section: pillar.cta.section,
        publicContext,
      })
    : null

  return (
    <MagicCard
      className={cn('h-full rounded-xl', className)}
      gradientFrom={BRAND_RED_80}
      gradientTo="rgba(255,255,255,0.2)"
      gradientSize={280}
    >
      <div className="flex h-full min-h-[16rem] flex-col justify-between p-8 md:min-h-[18rem] md:p-10">
        <div>
          <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {pillar.title}
          </h3>
          {pillar.description && (
            <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
              {pillar.description}
            </p>
          )}
        </div>
        {ctaHref && (
          <div className="mt-8">
            <ShimmerLink href={ctaHref} shimmerColor={BRAND_RED}>
              {pillar.cta?.label ?? 'Start'}
            </ShimmerLink>
          </div>
        )}
      </div>
    </MagicCard>
  )
}

export function ValuePillarsClient({
  sectionId,
  eyebrow,
  headline,
  intro,
  journeyCard,
  pillars,
  publicContext,
}: ValuePillarsBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const items = pillars ?? []

  const journeyHref =
    journeyCard?.cta && journeyCard.enabled !== false
      ? resolveCmsLinkHref({
          type: journeyCard.cta.type,
          url: journeyCard.cta.url,
          reference: journeyCard.cta.reference,
          section: journeyCard.cta.section,
          publicContext,
        })
      : null

  if (!items.length && journeyCard?.enabled === false) return null

  function renderJourneyContent() {
    return (
      <div
        className="flex h-full min-h-[20rem] flex-col justify-between p-8 md:min-h-[24rem] md:p-10"
        data-scroll-reveal="left"
        data-scroll-distance="48"
      >
        <div>
          <p className="text-muted-foreground mb-3 text-xs tracking-[0.2em] uppercase">
            Immersive journey
          </p>
          <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
            {journeyCard?.title ?? 'Your personalized journey starts here.'}
          </h3>
          {journeyCard?.description && (
            <p className="text-muted-foreground mt-6 text-base leading-relaxed md:text-lg">
              {journeyCard.description}
            </p>
          )}
        </div>
        {journeyHref && journeyCard?.cta && (
          <div className="mt-8">
            <CMSLink publicContext={publicContext} appearance="default" {...journeyCard.cta} />
          </div>
        )}
      </div>
    )
  }

  return (
    <SectionReveal>
      <section className="overflow-hidden py-24 md:py-32" id={sectionId || 'journey'}>
        <div className="container">
          <div
            className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
            data-scroll-reveal="up"
            data-scroll-distance="44"
          >
            {eyebrow && (
              <p className="text-muted-foreground mb-4 text-sm tracking-[0.2em] uppercase">
                {eyebrow}
              </p>
            )}
            {headline && (
              <RichText
                publicContext={publicContext}
                content={headline}
                withWrapper={false}
                overrideStyle={{
                  h2: 'font-display text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl',
                  h3: 'font-display text-2xl font-medium tracking-tight md:text-3xl',
                }}
              />
            )}
            {intro && (
              <div className="mt-6">
                <RichText
                  publicContext={publicContext}
                  content={intro}
                  withWrapper={false}
                  overrideStyle={{
                    p: 'text-muted-foreground text-base leading-relaxed md:text-lg',
                  }}
                />
              </div>
            )}
          </div>

          <div
            className={cn(
              'grid gap-6',
              journeyCard?.enabled !== false && items.length > 0
                ? 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-8'
                : items.length === 3
                  ? 'md:grid-cols-3'
                  : 'md:grid-cols-2',
            )}
          >
            {journeyCard?.enabled !== false &&
              (reducedMotion ? (
                <MagicCard
                  className="rounded-xl lg:row-span-full"
                  gradientFrom={BRAND_RED}
                  gradientTo="#f97316"
                  gradientSize={320}
                >
                  {renderJourneyContent()}
                </MagicCard>
              ) : (
                <MagicCard
                  className="rounded-xl lg:row-span-full"
                  glowFrom={BRAND_RED}
                  glowTo="#ea580c"
                  gradientFrom={BRAND_RED}
                  gradientTo="#f97316"
                  gradientSize={320}
                  mode="orb"
                >
                  {renderJourneyContent()}
                </MagicCard>
              ))}

            {items.length > 0 && (
              <div
                className={cn(
                  'grid gap-6',
                  journeyCard?.enabled !== false ? 'sm:grid-cols-1' : 'md:grid-cols-3',
                )}
                data-scroll-stagger="up"
                data-scroll-distance="36"
                data-scroll-stagger-delay="0.12"
              >
                {items.map((pillar, index) => (
                  <div data-scroll-stagger-item key={pillar.id ?? `${pillar.title}-${index}`}>
                    <PillarCard pillar={pillar} publicContext={publicContext} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
