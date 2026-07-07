'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { Media } from '@/components/Media'
import { motionTokens } from '@/components/motion/motion-tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Page } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

export const HeroOrisaPage01: React.FC<Page['hero'] & { publicContext: PublicContextProps }> = ({
  tagline,
  headlineLines,
  pageHero,
}) => {
  const reducedMotion = useReducedMotion()
  const intro = pageHero?.intro
  const bannerImage = pageHero?.bannerImage

  const lines =
    headlineLines?.map((item) => item.line?.trim()).filter((line): line is string => Boolean(line)) ??
    []

  return (
    <>
      {typeof bannerImage === 'object' && bannerImage && (
        <section className="overflow-hidden pt-28 md:pt-32">
          <div className="relative aspect-[21/9] min-h-[220px] w-full md:min-h-[320px]">
            <Media
              resource={bannerImage}
              fill
              priority
              size="100vw"
              imgClassName="object-cover"
            />
          </div>
        </section>
      )}

      <section className="bg-background py-16 md:py-20">
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {tagline && (
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-neutral-950 uppercase">
                  {tagline}
                </p>
              )}
              {lines.length > 0 && (
                <motion.h1
                  className="font-display text-4xl leading-[1.05] font-medium tracking-tight md:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: motionTokens.duration.slow, ease: motionTokens.ease }}
                >
                  {lines.map((line, index) => (
                    <span key={`${line}-${index}`} className="block">
                      {line}
                    </span>
                  ))}
                </motion.h1>
              )}
            </div>
            {intro && (
              <motion.p
                className="text-base text-neutral-500 md:text-lg lg:col-span-4 lg:col-start-9"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.15,
                  duration: motionTokens.duration.normal,
                  ease: motionTokens.ease,
                }}
              >
                {intro}
              </motion.p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroOrisaPage01
