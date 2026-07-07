'use client'

import React, { useCallback, useMemo, useRef, useState } from 'react'

import { CMSLink } from '@/components/Link'
import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import { ScrollWordReveal } from '@/components/motion/ScrollWordReveal'
import RichText from '@/components/RichText'
import { useCredibilityMetricsScroll } from '@/hooks/useCredibilityMetricsScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { CredibilityStripBlock } from '@/payload-types'
import { cn } from '@/utilities'
import { getRichTextPlainText } from '@/utilities/richtext'
import { PublicContextProps } from '@/utilities/publicContextProps'

const METRIC_CARD_HEIGHT = 'min-h-[19.5rem] md:min-h-[21.5rem] lg:min-h-[23.5rem]'

interface MetricCardProps {
  active: boolean
  animate: boolean
  metric: NonNullable<CredibilityStripBlock['metrics']>[number]
}

function MetricCard({ active, animate, metric }: MetricCardProps) {
  return (
    <article
      className={cn(
        'border-border bg-background flex flex-col justify-between border p-5 md:p-7',
        METRIC_CARD_HEIGHT,
      )}
    >
      <p className="font-display text-primary text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
        {animate ? (
          <AnimatedCounter
            active={active}
            prefix={metric.prefix}
            suffix={metric.suffix}
            value={metric.value}
          />
        ) : (
          <>
            {metric.prefix}
            {metric.value}
            {metric.suffix}
          </>
        )}
      </p>
      {metric.label ? (
        <p className="text-muted-foreground mt-4 text-xs font-medium md:text-sm">{metric.label}</p>
      ) : (
        <span aria-hidden className="mt-4 block" />
      )}
    </article>
  )
}

export function CredibilityStripClient({
  sectionId,
  eyebrow,
  headline,
  body,
  cta,
  metrics,
  animateCounters,
  publicContext,
}: CredibilityStripBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const shouldAnimateCounters = animateCounters !== false && !reducedMotion
  const [metricsActive, setMetricsActive] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)

  const bodyPlainText = useMemo(() => getRichTextPlainText(body), [body])

  const { leftMetrics, rightMetrics } = useMemo(() => {
    if (!metrics?.length) {
      return { leftMetrics: [], rightMetrics: [] }
    }

    const midpoint = Math.ceil(metrics.length / 2)
    return {
      leftMetrics: metrics.slice(0, midpoint),
      rightMetrics: metrics.slice(midpoint),
    }
  }, [metrics])

  const handleMetricsEnter = useCallback(() => {
    setMetricsActive(true)
  }, [])

  useCredibilityMetricsScroll({
    enabled: !reducedMotion && Boolean(metrics?.length),
    sectionRef,
    leftColumnRef,
    rightColumnRef,
    onEnter: handleMetricsEnter,
  })

  return (
    <section className="overflow-hidden py-24 md:py-32" id={sectionId || 'about'} ref={sectionRef}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className="max-w-xl will-change-transform lg:sticky lg:top-32 lg:self-start"
            data-scroll-parallax
            data-scroll-direction="down"
            data-scroll-speed="8"
            data-scroll-reveal="up"
            data-scroll-distance="44"
            ref={copyRef}
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
                  h2: 'text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl',
                  h3: 'text-2xl font-semibold tracking-tight md:text-3xl',
                  p: 'text-muted-foreground text-lg',
                }}
              />
            )}
            {bodyPlainText ? (
              <div className="mt-6">
                <ScrollWordReveal enabled={!reducedMotion} text={bodyPlainText} />
              </div>
            ) : body ? (
              <div className="mt-6">
                <RichText
                  publicContext={publicContext}
                  content={body}
                  withWrapper={false}
                  overrideStyle={{
                    p: 'text-muted-foreground text-base leading-relaxed md:text-lg',
                  }}
                />
              </div>
            ) : null}
            {cta && (cta.label || cta.url || cta.reference) && (
              <div className="mt-8">
                <CMSLink publicContext={publicContext} appearance="text" {...cta} />
              </div>
            )}
          </div>

          {metrics && metrics.length > 0 && (
            <div
              className="relative grid grid-cols-2 gap-0"
              data-scroll-stagger="up"
              data-scroll-distance="36"
              data-scroll-stagger-delay="0.1"
            >
              <div className="flex flex-col will-change-transform" ref={leftColumnRef}>
                {leftMetrics.map((metric, index) => (
                  <div data-scroll-stagger-item key={metric.id ?? `${metric.label}-left-${index}`}>
                    <MetricCard
                      active={metricsActive}
                      animate={shouldAnimateCounters}
                      metric={metric}
                    />
                  </div>
                ))}
              </div>

              <div
                className="flex flex-col pt-14 will-change-transform md:pt-20 lg:pt-24"
                ref={rightColumnRef}
              >
                {rightMetrics.map((metric, index) => (
                  <div data-scroll-stagger-item key={metric.id ?? `${metric.label}-right-${index}`}>
                    <MetricCard
                      active={metricsActive}
                      animate={shouldAnimateCounters}
                      metric={metric}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
