'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { motionTokens } from '@/components/motion/motion-tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Page } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

export const HeroOrisaMarketing01: React.FC<
  Page['hero'] & { publicContext: PublicContextProps }
> = ({ tagline, headlineLines, marketingHero, links, publicContext }) => {
  const reducedMotion = useReducedMotion()
  const mh = marketingHero

  const lines =
    headlineLines?.map((item) => item.line?.trim()).filter((line): line is string => Boolean(line)) ??
    []

  const traits = mh?.traitLabels?.filter((t) => t.label?.trim()) ?? []
  const primaryLinks = links?.slice(0, 2) ?? []

  const lineVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: motionTokens.duration.slow, ease: motionTokens.ease },
    },
  }

  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid grid-cols-4 opacity-[0.07] md:grid-cols-7"
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="border-r border-neutral-900/20" />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {mh?.testimonialQuote && (
            <motion.div
              className="order-2 lg:col-span-3 lg:order-1"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.ease }}
            >
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                {typeof mh.testimonialCardImage === 'object' && mh.testimonialCardImage && (
                  <Media resource={mh.testimonialCardImage} imgClassName="aspect-[4/3] w-full object-cover" loading="lazy" />
                )}
                <div className="p-4">
                  <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
                    {mh.testimonialQuote}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    {typeof mh.testimonialAuthorAvatar === 'object' && mh.testimonialAuthorAvatar && (
                      <Media
                        resource={mh.testimonialAuthorAvatar}
                        imgClassName="size-8 rounded-lg object-cover"
                        loading="lazy"
                      />
                    )}
                    <div>
                      {mh.testimonialAuthorName && (
                        <p className="text-sm font-semibold text-neutral-950">{mh.testimonialAuthorName}</p>
                      )}
                      {mh.testimonialAuthorRole && (
                        <p className="text-xs text-neutral-500">{mh.testimonialAuthorRole}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="order-1 lg:col-span-5 lg:order-2 lg:col-start-4">
            {tagline && (
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-neutral-950 uppercase">
                {tagline}
              </p>
            )}

            {lines.length > 0 && (
              <motion.h1
                className="font-display text-4xl leading-[1.05] font-black tracking-tight md:text-6xl lg:text-7xl"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reducedMotion ? 0 : motionTokens.stagger,
                    },
                  },
                }}
              >
                {lines.map((line, index) => (
                  <motion.span key={`${line}-${index}`} className="block" variants={lineVariants}>
                    {line}
                    {index === lines.length - 1 && mh?.accentWord && (
                      <>
                        {' '}
                        <span className="text-primary">{mh.accentWord}</span>
                      </>
                    )}
                  </motion.span>
                ))}
              </motion.h1>
            )}

            {mh?.intro && (
              <motion.p
                className="mt-6 max-w-lg text-base text-neutral-500 md:text-lg"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.3, duration: motionTokens.duration.normal }}
              >
                {mh.intro}
              </motion.p>
            )}

            {primaryLinks.length > 0 && (
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.4, duration: motionTokens.duration.normal }}
              >
                {primaryLinks.map(({ link }, index) => (
                  <CMSLink
                    key={index}
                    publicContext={publicContext}
                    {...link}
                    className={
                      index === 0
                        ? 'inline-flex items-center gap-2 rounded-none bg-neutral-950 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800'
                        : 'inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-sm font-semibold tracking-wide text-neutral-950 uppercase'
                    }
                  />
                ))}
              </motion.div>
            )}
          </div>

          {typeof mh?.featureImage === 'object' && mh.featureImage && (
            <motion.div
              className="order-3 lg:col-span-4 lg:order-3"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.2, duration: motionTokens.duration.normal }}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Media
                  resource={mh.featureImage}
                  imgClassName="aspect-[4/5] w-full object-cover"
                  priority
                  size="(max-width: 1024px) 100vw, 33vw"
                />
                {(mh.clientCount || mh.clientCountLabel) && (
                  <div className="absolute right-4 bottom-4 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                    {mh.clientCount && (
                      <p className="font-display text-3xl font-extrabold text-neutral-950">
                        {mh.clientCount}
                        {mh.clientCountSuffix}
                      </p>
                    )}
                    {mh.clientCountLabel && (
                      <p className="text-sm text-neutral-600">{mh.clientCountLabel}</p>
                    )}
                    {mh.clientAvatars && mh.clientAvatars.length > 0 && (
                      <div className="mt-3 flex -space-x-2">
                        {mh.clientAvatars.map((avatar, index) =>
                          typeof avatar === 'object' && avatar ? (
                            <Media
                              key={avatar.id ?? index}
                              resource={avatar}
                              imgClassName="size-8 rounded-full border-2 border-white object-cover"
                              loading="lazy"
                            />
                          ) : null,
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {traits.length > 0 && (
          <motion.ul
            className="mt-16 flex flex-wrap justify-center gap-4 border-t border-neutral-200 pt-10 md:justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.5 }}
          >
            {traits.map((trait, index) => (
              <li
                key={trait.id ?? `${trait.label}-${index}`}
                className="flex items-center gap-2 text-sm font-medium text-neutral-900"
              >
                <span className="text-neutral-400">[</span>
                {trait.label}
                <span className="text-neutral-400">]</span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  )
}

export default HeroOrisaMarketing01
