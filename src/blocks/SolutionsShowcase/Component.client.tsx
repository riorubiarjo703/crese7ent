'use client'

import React, { useCallback, useMemo, useRef, useState } from 'react'

import { AbstractOrbsCanvasGate } from '@/components/webgl/AbstractOrbsCanvasGate'
import { InteractiveHoverLink } from '@/components/ui/interactive-hover-link'
import { RisingMeteors } from '@/components/magicui/rising-meteors'
import { ShineBorder } from '@/components/ui/shine-border'
import Text3DFlip from '@/components/ui/text-3d-flip'
import RichText from '@/components/RichText'
import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { useHorizontalScrollScrub } from '@/hooks/useHorizontalScrollScrub'
import { useStrategyCardReveal } from '@/hooks/useStrategyCardReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { SolutionsShowcaseBlock } from '@/payload-types'
import { cn } from '@/utilities'
import { getRichTextPlainText } from '@/utilities/richtext'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { BRAND_RED_12, BRAND_RED_14, BRAND_RED_80 } from '@/utilities/brand-colors'

function StrategyCard({
  strategy,
  publicContext,
  reducedMotion,
  className,
  ...articleProps
}: {
  strategy: NonNullable<SolutionsShowcaseBlock['strategies']>[number]
  publicContext: PublicContextProps
  reducedMotion: boolean
  className?: string
} & React.ComponentPropsWithoutRef<'article'>) {
  const description = getRichTextPlainText(strategy.description)
  const ctaHref = useMemo(
    () =>
      strategy.cta
        ? resolveCmsLinkHref({
            type: strategy.cta.type,
            url: strategy.cta.url,
            reference: strategy.cta.reference,
            section: strategy.cta.section,
            publicContext,
          })
        : null,
    [publicContext, strategy.cta],
  )
  const ctaLabel = strategy.cta?.label ?? 'Know more'
  const ctaNewTab = strategy.cta?.newTab

  return (
    <article
      data-strategy-card
      {...articleProps}
      className={cn(
        'group/card relative h-[min(70vh,42rem)] w-[88vw] shrink-0 overflow-hidden rounded-none bg-transparent md:w-[40rem] lg:w-[44rem]',
        className,
      )}
    >
      <ShineBorder
        borderWidth={1}
        duration={12}
        shineColor={[BRAND_RED_80, 'rgba(255,255,255,0.35)', BRAND_RED_80]}
      />
      <div
        data-strategy-card-inner
        className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12"
      >
        <div>
          {strategy.title &&
            (reducedMotion ? (
              <h3 className="font-display text-3xl font-medium tracking-[0.06em] text-white uppercase transition-colors duration-500 group-hover/card:text-[rgba(165,25,23,0.8)] md:text-4xl lg:text-5xl">
                {strategy.title}
              </h3>
            ) : (
              <Text3DFlip
                as="h3"
                className="font-display text-3xl font-medium tracking-[0.06em] uppercase [perspective:800px] md:text-4xl lg:text-5xl"
                flipTextClassName="text-[rgba(165,25,23,0.8)]"
                rotateDirection="top"
                staggerDuration={0.03}
                staggerFrom="first"
                textClassName="text-white"
              >
                {strategy.title}
              </Text3DFlip>
            ))}
          {description ? (
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/85 md:text-xl md:leading-relaxed">
              {description}
            </p>
          ) : strategy.description ? (
            <div className="mt-8 max-w-lg text-lg text-white/85 md:text-xl">
              <RichText
                publicContext={publicContext}
                content={strategy.description}
                withWrapper={false}
                overrideStyle={{
                  p: 'text-lg leading-relaxed md:text-xl',
                }}
              />
            </div>
          ) : null}
          {strategy.metrics && strategy.metrics.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-white/90 md:text-base">
              {strategy.metrics.map((metric, index) => (
                <div key={metric.id ?? `${metric.label}-${index}`} className="flex flex-col gap-1">
                  <span className="text-white/55">{metric.label}</span>
                  <span className="text-lg font-medium text-white">{metric.value}</span>
                </div>
              ))}
            </dl>
          )}
        </div>
        {ctaHref && (
          <div className="mt-10">
            <InteractiveHoverLink
              href={ctaHref}
              {...(ctaNewTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {})}
            >
              {ctaLabel}
            </InteractiveHoverLink>
          </div>
        )}
      </div>
    </article>
  )
}

export function SolutionsShowcaseClient({
  sectionId,
  eyebrow,
  headline,
  intro,
  strategies,
  pinOnScroll,
  publicContext,
}: SolutionsShowcaseBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const items = useMemo(() => strategies ?? [], [strategies])
  const horizontalScrollEnabled = Boolean(pinOnScroll) && !reducedMotion && items.length > 1

  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress)
  }, [])

  useHorizontalScrollScrub({
    enabled: horizontalScrollEnabled,
    sectionRef,
    trackRef,
    endPadding: 96,
    scrub: 0.9,
    revealItems: !reducedMotion,
    revealDistance: 72,
    onProgress: handleScrollProgress,
  })

  useStrategyCardReveal({
    enabled: !horizontalScrollEnabled && !reducedMotion,
    containerRef: stackRef,
    revealDistance: 72,
  })

  if (!items.length) return null

  return (
    <section
      className="relative overflow-hidden bg-neutral-950 text-white"
      id={sectionId || 'solutions'}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-neutral-950 will-change-transform"
        data-home-parallax
        data-scroll-speed="16"
      />
      <div
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 90% 70% at 65% 35%, ${BRAND_RED_14}, transparent 60%)`,
        }}
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        data-home-parallax
        data-scroll-speed="28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_85%,rgba(255,255,255,0.05),transparent_55%)] will-change-transform"
        data-home-parallax
        data-scroll-speed="22"
      />

      <div className="relative z-10">
        <div className="container py-20 md:py-28">
          <div
            className="mx-auto max-w-3xl text-center"
            data-scroll-reveal="up"
            data-scroll-distance="52"
          >
            {eyebrow && (
              <p className="mb-4 text-sm tracking-[0.2em] text-white/50 uppercase">{eyebrow}</p>
            )}
            {headline && (
              <RichText
                publicContext={publicContext}
                content={headline}
                withWrapper={false}
                overrideStyle={{
                  h2: 'font-display text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl',
                  h3: 'font-display text-2xl font-medium tracking-tight text-white md:text-3xl',
                }}
              />
            )}
            {intro && (
              <div className="mt-6 text-white/65">
                <RichText
                  publicContext={publicContext}
                  content={intro}
                  withWrapper={false}
                  overrideStyle={{
                    p: 'text-base leading-relaxed md:text-lg',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {horizontalScrollEnabled ? (
          <div className="relative h-svh min-h-[32rem] overflow-hidden" ref={sectionRef}>
            <AbstractOrbsCanvasGate
              animate={!reducedMotion}
              className="z-[1] opacity-80 mix-blend-screen"
              scrollProgress={scrollProgress}
            />
            {!reducedMotion && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-60"
              >
                <RisingMeteors angle={120} number={48} />
              </div>
            )}
            <div
              aria-hidden
              style={{
                background: `radial-gradient(ellipse 80% 60% at 70% 40%, ${BRAND_RED_12}, transparent 55%)`,
              }}
              className="pointer-events-none absolute inset-0 z-0"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(255,255,255,0.04),transparent_50%)]"
            />

            <div className="relative z-10 flex h-full items-center">
              <div
                className="flex gap-5 pl-5 will-change-transform md:gap-8 md:pl-10 lg:pl-16"
                ref={trackRef}
              >
                {items.map((strategy, index) => (
                  <StrategyCard
                    key={strategy.id ?? `${strategy.title}-${index}`}
                    publicContext={publicContext}
                    reducedMotion={reducedMotion}
                    strategy={strategy}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {!reducedMotion && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
              >
                <RisingMeteors angle={88} number={24} />
              </div>
            )}
            <div className="relative z-10 container space-y-6 pb-20 md:pb-28" ref={stackRef}>
              {items.map((strategy, index) => (
                <StrategyCard
                  key={strategy.id ?? `${strategy.title}-${index}`}
                  className="w-full"
                  publicContext={publicContext}
                  reducedMotion={reducedMotion}
                  strategy={strategy}
                />
              ))}
            </div>
            <div
              aria-hidden
              className="to-background pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent via-neutral-950/50 md:h-48"
            />
          </div>
        )}
      </div>
    </section>
  )
}
