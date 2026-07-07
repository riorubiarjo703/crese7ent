'use client'

import React from 'react'

import RichText from '@/components/RichText'
import { ScrollWordReveal } from '@/components/motion/ScrollWordReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { BrandStoryBlock } from '@/payload-types'
import { getRichTextPlainText } from '@/utilities/richtext'
import { PublicContextProps } from '@/utilities/publicContextProps'

function formatStepNumber(index: number): string {
  return String(index + 1).padStart(2, '0')
}

export function BrandStoryClient({
  sectionId,
  headline,
  intro,
  steps,
  publicContext,
}: BrandStoryBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const items = steps ?? []
  const introPlain = getRichTextPlainText(intro)

  return (
    <section className="bg-[#f4efe6] py-20 md:py-28" id={sectionId || 'story'}>
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div
            className="lg:sticky lg:top-32 lg:self-start"
            data-scroll-reveal="up"
            data-scroll-distance="44"
          >
            {headline && (
              <RichText
                publicContext={publicContext}
                content={headline}
                withWrapper={false}
                overrideStyle={{
                  h2: 'font-display text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl',
                  h3: 'font-display text-2xl font-medium tracking-tight md:text-3xl',
                  p: 'text-muted-foreground mt-6 text-base leading-relaxed md:text-lg',
                }}
              />
            )}
            {introPlain ? (
              <div className="mt-6">
                <ScrollWordReveal enabled={!reducedMotion} text={introPlain} />
              </div>
            ) : intro ? (
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
            ) : null}
          </div>

          {items.length > 0 && (
            <div
              className="space-y-0 divide-y divide-neutral-300/80 border-y border-neutral-300/80"
              data-scroll-stagger="up"
              data-scroll-distance="36"
              data-scroll-stagger-delay="0.12"
            >
              {items.map((step, index) => (
                <article
                  className="grid grid-cols-[4rem_1fr] gap-6 py-10 md:grid-cols-[5rem_1fr] md:gap-8 md:py-12"
                  data-scroll-stagger-item
                  key={step.id ?? `${step.title}-${index}`}
                >
                  <p className="font-display text-4xl font-medium text-[#c41e3a] md:text-5xl">
                    {formatStepNumber(index)}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="text-muted-foreground mt-3 text-base leading-relaxed md:text-lg">
                        {step.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
