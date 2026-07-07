'use client'

import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import React, { useEffect, useState } from 'react'

import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import RichText from '@/components/RichText'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ImpactHighlightsBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities'

function formatSlideIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}

export function ImpactHighlightsClient({
  sectionId,
  eyebrow,
  headline,
  highlights,
  autoplay,
  publicContext,
}: ImpactHighlightsBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const items = highlights ?? []
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [counterActive, setCounterActive] = useState(false)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
      setCounterActive(true)
    }

    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  if (!items.length) return null

  const carouselPlugins =
    reducedMotion === true
      ? undefined
      : autoplay !== false
        ? [Fade(), Autoplay({ delay: 6000, stopOnInteraction: true })]
        : [Fade()]

  return (
    <section
      className="relative overflow-hidden bg-neutral-950 py-24 text-white md:py-32"
      id={sectionId || 'impact'}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(165,25,23,0.18),transparent_60%)]"
      />

      <div className="container relative z-10">
        <div
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
          data-scroll-reveal="up"
          data-scroll-distance="44"
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
                h2: 'font-display text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl',
                h3: 'font-display text-2xl font-medium tracking-tight md:text-3xl',
              }}
            />
          )}
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div
            className="mb-8 flex items-center justify-between text-sm tracking-[0.2em] text-white/45 uppercase"
            data-scroll-reveal="up"
            data-scroll-distance="28"
          >
            <span>
              {formatSlideIndex(activeIndex)} • {formatSlideIndex(items.length - 1)}
            </span>
            <div className="flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to highlight ${index + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500',
                    index === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50',
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>

          <Carousel className="w-full" opts={{ loop: true }} plugins={carouselPlugins} setApi={setApi}>
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem key={item.id ?? `highlight-${index}`}>
                  <article className="flex min-h-[18rem] flex-col justify-center px-2 md:min-h-[22rem] md:px-8">
                    <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
                      <p className="font-display text-[clamp(4rem,14vw,9rem)] leading-none font-medium tracking-tight text-white">
                        {reducedMotion ? (
                          <>
                            {item.prefix}
                            {item.value}
                            {item.suffix}
                          </>
                        ) : (
                          <AnimatedCounter
                            active={counterActive && activeIndex === index}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            value={item.value}
                          />
                        )}
                      </p>
                      {item.label && (
                        <p className="pb-3 text-lg font-medium text-white/70 md:text-xl">
                          {item.label}
                        </p>
                      )}
                    </div>
                    {item.description && (
                      <div className="mt-8 max-w-2xl">
                        <RichText
                          publicContext={publicContext}
                          content={item.description}
                          withWrapper={false}
                          overrideStyle={{
                            p: 'text-lg leading-relaxed text-white/75 md:text-xl md:leading-relaxed',
                          }}
                        />
                      </div>
                    )}
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
