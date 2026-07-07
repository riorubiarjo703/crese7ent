'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ProductSpotlightBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities'

export function ProductSpotlightClient({
  sectionId,
  productCode,
  headline,
  description,
  primaryCta,
  variants,
  publicContext,
}: ProductSpotlightBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const items = variants ?? []
  const [activeIndex, setActiveIndex] = useState(0)

  const active = items[activeIndex]
  const hasPrimaryCta = primaryCta && (primaryCta.label || primaryCta.url || primaryCta.reference)

  const activeImage = useMemo(() => {
    if (!active?.image || typeof active.image !== 'object') return null
    return active.image
  }, [active?.image])

  if (!items.length) return null

  return (
    <section
      className="relative overflow-hidden bg-[#f4efe6] py-16 text-neutral-950 md:py-24"
      id={sectionId || 'hero-product'}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(196,30,58,0.08),transparent_55%)]"
      />

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-scroll-reveal="up" data-scroll-distance="48">
            {productCode && (
              <p className="mb-4 font-mono text-xs tracking-[0.25em] text-neutral-500 uppercase">
                {productCode}
              </p>
            )}
            {headline && (
              <RichText
                publicContext={publicContext}
                content={headline}
                withWrapper={false}
                overrideStyle={{
                  h1: 'font-display text-4xl leading-[1.02] font-medium tracking-tight md:text-6xl lg:text-7xl',
                  h2: 'font-display text-3xl leading-tight font-medium tracking-tight md:text-5xl',
                }}
              />
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {items.map((variant, index) => (
                <button
                  key={variant.id ?? `${variant.name}-${index}`}
                  type="button"
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                    index === activeIndex
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : 'border-neutral-300 bg-white/70 text-neutral-700 hover:border-neutral-950',
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  {variant.name}
                </button>
              ))}
            </div>

            {description && (
              <div className="mt-8 max-w-lg">
                <RichText
                  publicContext={publicContext}
                  content={description}
                  withWrapper={false}
                  overrideStyle={{
                    p: 'text-base leading-relaxed text-neutral-600 md:text-lg',
                  }}
                />
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {hasPrimaryCta && (
                <CMSLink publicContext={publicContext} {...primaryCta} />
              )}
              {active?.price && (
                <span className="text-lg font-semibold tabular-nums">{active.price}</span>
              )}
            </div>
          </div>

          <div
            className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
            data-scroll-reveal="right"
            data-scroll-distance="56"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#c41e3a]/10 to-transparent" />
            <AnimatePresence mode="wait">
              {activeImage && (
                <motion.div
                  key={active?.id ?? activeIndex}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="relative h-full w-full"
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.96, y: 12 }
                  }
                  initial={
                    reducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 1.04, y: -16 }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Media
                    resource={activeImage}
                    fill
                    imgClassName="object-contain object-center drop-shadow-2xl"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
