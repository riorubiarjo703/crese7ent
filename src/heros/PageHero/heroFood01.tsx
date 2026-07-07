'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { motionTokens } from '@/components/motion/motion-tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Page, Media as MediaType } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

function getMediaUrl(resource: MediaType | string | null | undefined): string | undefined {
  if (!resource || typeof resource === 'string') return undefined
  return resource.url ?? undefined
}

export const HeroFood01: React.FC<Page['hero'] & { publicContext: PublicContextProps }> = ({
  badge,
  headlineLines,
  subheadline,
  links,
  images,
  showScrollIndicator,
  publicContext,
}) => {
  const reducedMotion = useReducedMotion()
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false)

  const imageUrl = getMediaUrl(
    images && typeof images[0] === 'object' ? (images[0] as MediaType) : undefined,
  )

  const lines =
    headlineLines?.map((item) => item.line?.trim()).filter((line): line is string => Boolean(line)) ??
    []

  useEffect(() => {
    if (!showScrollIndicator) return

    function dismiss() {
      setHideScrollIndicator(true)
    }

    window.addEventListener('wheel', dismiss, { once: true, passive: true })
    window.addEventListener('touchmove', dismiss, { once: true, passive: true })
    window.addEventListener('keydown', dismiss, { once: true })

    return () => {
      window.removeEventListener('wheel', dismiss)
      window.removeEventListener('touchmove', dismiss)
      window.removeEventListener('keydown', dismiss)
    }
  }, [showScrollIndicator])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : motionTokens.stagger,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-[#f4efe6] text-neutral-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_80%_10%,rgba(196,30,58,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(249,115,22,0.1),transparent_50%)]"
      />

      <div className="container relative z-10 grid min-h-[min(92vh,56rem)] items-center gap-12 py-28 lg:grid-cols-2 lg:gap-16 lg:py-32">
        <div>
          {badge && (
            <motion.p
              className="mb-4 font-mono text-xs tracking-[0.25em] text-neutral-500 uppercase"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.ease }}
            >
              {badge}
            </motion.p>
          )}

          {lines.length > 0 && (
            <motion.h1
              className="max-w-2xl font-display text-5xl leading-[1.02] font-medium tracking-tight md:text-6xl lg:text-7xl"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {lines.map((line, index) => (
                <motion.span key={`${line}-${index}`} className="block" variants={lineVariants}>
                  {line}
                </motion.span>
              ))}
            </motion.h1>
          )}

          {subheadline && (
            <motion.div
              className="mt-6 max-w-lg"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0 : lines.length * motionTokens.stagger + 0.15,
                duration: motionTokens.duration.normal,
                ease: motionTokens.ease,
              }}
            >
              <RichText
                publicContext={publicContext}
                content={subheadline}
                withWrapper={false}
                overrideStyle={{
                  p: 'text-base leading-relaxed text-neutral-600 md:text-lg',
                }}
              />
            </motion.div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0 : lines.length * motionTokens.stagger + 0.3,
                duration: motionTokens.duration.normal,
                ease: motionTokens.ease,
              }}
            >
              {links.map(({ link }, index) => (
                <CMSLink
                  key={index}
                  publicContext={publicContext}
                  className="w-full sm:w-auto"
                  {...link}
                />
              ))}
            </motion.div>
          )}
        </div>

        {imageUrl && (
          <motion.div
            className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
            animate={
              reducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1, y: [0, -10, 0] }
            }
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
            transition={{
              opacity: { duration: 0.6, ease: motionTokens.ease },
              scale: { duration: 0.6, ease: motionTokens.ease },
              y: reducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#c41e3a]/15 to-transparent" />
            <Image
              src={imageUrl}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center drop-shadow-2xl"
            />
          </motion.div>
        )}
      </div>

      {showScrollIndicator && !hideScrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-500"
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="size-4" />
        </motion.div>
      )}
    </section>
  )
}

export default HeroFood01
