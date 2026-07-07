'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'

import { OrisaHoverArrow } from '@/components/orisa/OrisaHoverArrow'
import { OrisaHoverRotate } from '@/components/orisa/OrisaHoverRotate'
import { OrisaRotatingLink } from '@/components/orisa/OrisaRotatingLink'
import { motionTokens } from '@/components/motion/motion-tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useOrisaHeroImageEffects } from '@/hooks/useOrisaHeroImageEffects'
import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import type { Page, Media as MediaType } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

function getMediaUrl(resource: MediaType | string | null | undefined): string | undefined {
  if (!resource || typeof resource === 'string') return undefined
  return resource.url ?? undefined
}

export const HeroOrisaCreative01: React.FC<
  Page['hero'] & { publicContext: PublicContextProps }
> = ({
  tagline,
  headlineLines,
  sideText,
  links,
  images,
  backgroundVideo,
  backgroundPoster,
  videoLink,
  talkBadgeLink,
  publicContext,
}) => {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)

  const textureUrl = getMediaUrl(
    images && typeof images[0] === 'object' ? (images[0] as MediaType) : undefined,
  )
  const layerUrl = getMediaUrl(
    images && typeof images[1] === 'object' ? (images[1] as MediaType) : undefined,
  )
  const posterUrl = getMediaUrl(
    typeof backgroundPoster === 'object' ? backgroundPoster : textureUrl,
  )
  const videoUrl = getMediaUrl(typeof backgroundVideo === 'object' ? backgroundVideo : undefined)

  const lines =
    headlineLines
      ?.map((item) => item.line?.trim())
      .filter((line): line is string => Boolean(line)) ?? []

  const primaryLinks = links?.slice(0, 2) ?? []

  const talkBadgeHref =
    talkBadgeLink &&
    resolveCmsLinkHref({
      type: talkBadgeLink.type,
      url: talkBadgeLink.url,
      reference: talkBadgeLink.reference,
      section: talkBadgeLink.section,
      publicContext,
    })

  const videoHref = videoLink
    ? resolveCmsLinkHref({
        type: videoLink.type,
        url: videoLink.url,
        reference: videoLink.reference,
        section: videoLink.section,
        publicContext,
      })
    : null

  useOrisaHeroImageEffects({
    enabled: !reducedMotion && Boolean(layerUrl),
    sectionRef,
    heroBgRef,
  })

  const lineVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: motionTokens.duration.slow, ease: motionTokens.ease },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="bg-primary relative z-[1] overflow-hidden bg-cover bg-bottom bg-no-repeat pt-[250px] pb-[70px] text-white md:pt-[300px] lg:pt-[395px]"
      style={textureUrl ? { backgroundImage: `url(${textureUrl})` } : undefined}
    >
      {layerUrl && (
        <div
          ref={heroBgRef}
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 -z-[1] flex h-full w-full translate-y-[50px] justify-center will-change-transform"
        >
          <img
            className="layer h-full object-cover max-md:-mb-[50px] max-md:h-auto max-md:w-[600px]"
            src={layerUrl}
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      )}

      <div className="relative z-10 px-4 md:px-8">
        {talkBadgeHref && talkBadgeLink?.label && (
          <Link
            href={talkBadgeHref}
            className="group absolute bottom-[calc(100%-180px)] left-5 z-20 hidden lg:left-8 lg:block xl:bottom-[calc(100%-220px)]"
          >
            <span className="relative inline-flex size-28 items-center justify-center lg:size-[132px]">
              <Image
                src="/seed/orisa/creative/icons/badge-1.svg"
                alt=""
                width={132}
                height={132}
                aria-hidden
                loading="eager"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center">
                <OrisaHoverArrow className="ml-0 text-white" />
                <OrisaHoverRotate>
                  <span className="text-xs font-bold text-white">{talkBadgeLink.label}</span>
                </OrisaHoverRotate>
              </span>
            </span>
          </Link>
        )}

        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-2">
            {videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionTokens.duration.normal, ease: motionTokens.ease }}
                className="max-w-[220px]"
              >
                <div className="rounded-[14px] bg-white/30 p-[11px] pb-0 backdrop-blur-[2px]">
                  <div className="overflow-hidden rounded-lg">
                    <video
                      autoPlay
                      className="aspect-[16/10] w-full object-cover"
                      loop
                      muted
                      playsInline
                      poster={posterUrl}
                      preload="metadata"
                    >
                      <source src={videoUrl} />
                    </video>
                  </div>
                  {videoHref && videoLink?.label && (
                    <OrisaRotatingLink
                      href={videoHref}
                      label={videoLink.label}
                      newTab={videoLink.newTab}
                      className="mt-0 border-0 bg-transparent px-0 pt-2 pb-3 text-white hover:text-white/80"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2 xl:col-span-3">
            {sideText && (
              <motion.div
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.1,
                  duration: motionTokens.duration.normal,
                  ease: motionTokens.ease,
                }}
                className="border-b border-white/50 ps-3 pb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  aria-hidden
                  className="mb-2.5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30 20H20V30L20 40H10L0 30L10 20H0V0H10L20 10V0L30 0L40 10L30 20ZM20 10V20H10L20 10Z"
                    fill="white"
                  />
                  <path d="M30 20H40V40H30L20 30L30 20Z" fill="white" />
                </svg>
                <p className="max-w-xs text-base leading-[1.6] font-medium tracking-tight text-white md:text-lg">
                  {sideText}
                </p>
              </motion.div>
            )}
          </div>

          <div className="ms-auto lg:col-span-5 lg:col-start-8 xl:col-span-5 xl:col-start-8">
            {tagline && (
              <motion.p
                className="mb-2.5 inline-block text-base font-medium tracking-tight text-white italic"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionTokens.duration.normal, ease: motionTokens.ease }}
              >
                {tagline}
              </motion.p>
            )}

            {lines.length > 0 && (
              <motion.h1
                className="font-[family-name:var(--font-dm-sans)] text-[35px] leading-[0.95] font-semibold tracking-[-0.05em] text-white uppercase sm:text-[42px] md:text-6xl lg:text-7xl xl:text-[80px]"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reducedMotion ? 0 : motionTokens.stagger,
                      delayChildren: reducedMotion ? 0 : 0.15,
                    },
                  },
                }}
              >
                {lines.map((line, index) => (
                  <motion.span key={`${line}-${index}`} className="block" variants={lineVariants}>
                    {line}
                  </motion.span>
                ))}
              </motion.h1>
            )}

            {primaryLinks.length > 0 && (
              <motion.div
                className="mt-5 flex flex-wrap gap-2 pt-5"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : lines.length * motionTokens.stagger + 0.25,
                  duration: motionTokens.duration.normal,
                  ease: motionTokens.ease,
                }}
              >
                {primaryLinks.map(({ link }, index) => {
                  const href = resolveCmsLinkHref({
                    type: link.type,
                    url: link.url,
                    reference: link.reference,
                    section: link.section,
                    publicContext,
                  })

                  if (!href || !link.label) return null

                  return (
                    <OrisaRotatingLink
                      key={index}
                      href={href}
                      label={link.label}
                      newTab={link.newTab}
                      className={
                        index === 0
                          ? 'rounded-none bg-white px-[25px] py-[17px] text-neutral-950 hover:bg-white/90'
                          : 'rounded-none border border-white bg-transparent px-[25px] py-[17px] text-white hover:bg-white/10'
                      }
                    />
                  )
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroOrisaCreative01
