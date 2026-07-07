'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { CMSLink } from '@/components/Link'
import { Particles } from '@/components/magicui/particles'
import RichText from '@/components/RichText'
import { motionTokens } from '@/components/motion/motion-tokens'
import { HeroMistCanvasGate } from '@/heros/PageHero/HeroMistCanvasGate'
import { useHeroMistScroll } from '@/hooks/useHeroMistScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Page, Media as MediaType } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

function getMediaUrl(resource: MediaType | string | null | undefined): string | undefined {
  if (!resource || typeof resource === 'string') return undefined
  return resource.url ?? undefined
}

function HeroBackground({
  backgroundType,
  backgroundVideo,
  backgroundPoster,
  images,
  reducedMotion,
}: {
  backgroundType?: Page['hero']['backgroundType']
  backgroundVideo?: Page['hero']['backgroundVideo']
  backgroundPoster?: Page['hero']['backgroundPoster']
  images?: Page['hero']['images']
  reducedMotion: boolean
}) {
  const posterUrl = getMediaUrl(
    typeof backgroundPoster === 'object' ? backgroundPoster : undefined,
  )
  const videoUrl = getMediaUrl(typeof backgroundVideo === 'object' ? backgroundVideo : undefined)
  const imageUrl = getMediaUrl(
    images && typeof images[0] === 'object' ? (images[0] as MediaType) : undefined,
  )

  const particleLayer =
    !reducedMotion && (
      <Particles
        className="absolute inset-0"
        color="#737373"
        ease={60}
        quantity={80}
        staticity={40}
      />
    )

  if (backgroundType === 'particles') {
    return <div className="bg-background absolute inset-0">{particleLayer}</div>
  }

  if (backgroundType === 'images' && imageUrl) {
    return (
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        {particleLayer}
      </div>
    )
  }

  if (backgroundType === 'video' && videoUrl) {
    return (
      <video
        autoPlay
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted
        playsInline
        poster={posterUrl}
        preload="metadata"
      >
        <source src={videoUrl} />
      </video>
    )
  }

  return <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-background" />
}

function MistHeroBackground({
  imageUrl,
  reducedMotion,
  scrollProgress,
  imageRef,
  mistRef,
}: {
  imageUrl?: string
  reducedMotion: boolean
  scrollProgress: number
  imageRef: React.RefObject<HTMLDivElement | null>
  mistRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="absolute inset-0 h-screen min-h-screen w-full overflow-hidden bg-background">
      <div
        ref={imageRef}
        className="relative h-full min-h-screen w-full will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="scale-105 object-cover object-center grayscale"
          />
        ) : (
          <div className="from-muted/60 to-background absolute inset-0 bg-gradient-to-b" />
        )}
      </div>
      <div ref={mistRef} className="absolute inset-0 z-[2] will-change-transform">
        <HeroMistCanvasGate animate={!reducedMotion} scrollProgress={scrollProgress} />
      </div>
    </div>
  )
}

function ScrollIndicator({ align }: { align?: 'left' | 'center' }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={
        align === 'left'
          ? 'absolute bottom-8 left-6 z-10 flex flex-col items-start gap-2 text-muted-foreground md:left-10'
          : 'absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground'
      }
      animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
      <ChevronDown className="size-4" />
    </motion.div>
  )
}

export const HeroCorp01: React.FC<Page['hero'] & { publicContext: PublicContextProps }> = ({
  headlineLines,
  subheadline,
  links,
  backgroundType,
  backgroundVideo,
  backgroundPoster,
  images,
  showScrollIndicator,
  publicContext,
}) => {
  const reducedMotion = useReducedMotion()
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isMistHero = backgroundType === 'mist'

  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const imageUrl = getMediaUrl(
    images && typeof images[0] === 'object' ? (images[0] as MediaType) : undefined,
  )

  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress)
  }, [])

  useHeroMistScroll({
    enabled: isMistHero && !reducedMotion,
    sectionRef,
    imageRef,
    mistRef,
    contentRef,
    onProgress: handleScrollProgress,
  })

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
        delayChildren: reducedMotion ? 0 : 0.15,
      },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 32 },
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
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
    >
      {isMistHero ? (
        <MistHeroBackground
          imageRef={imageRef}
          imageUrl={imageUrl}
          mistRef={mistRef}
          reducedMotion={reducedMotion}
          scrollProgress={scrollProgress}
        />
      ) : (
        <HeroBackground
          backgroundPoster={backgroundPoster}
          backgroundType={backgroundType}
          backgroundVideo={backgroundVideo}
          images={images}
          reducedMotion={reducedMotion}
        />
      )}
      <div
        className={
          isMistHero
            ? 'pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/20 to-transparent'
            : 'absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20'
        }
      />

      <div
        ref={contentRef}
        className={
          isMistHero
            ? 'container relative z-10 grid min-h-screen grid-rows-[1fr_auto] pt-32 pb-28 will-change-transform'
            : 'container relative z-10 flex min-h-screen flex-col justify-end pb-28 pt-32'
        }
      >
        {lines.length > 0 && (
          <motion.h1
            className={
              isMistHero
                ? 'max-w-5xl self-center font-display text-6xl leading-[0.98] font-normal tracking-tight md:text-8xl lg:text-[7.5rem]'
                : 'max-w-5xl font-display text-6xl leading-[0.98] font-normal tracking-tight md:text-8xl lg:text-[7.5rem]'
            }
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {lines.map((line, index) => (
              <motion.span
                key={`${line}-${index}`}
                className="block"
                variants={lineVariants}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>
        )}

        {(subheadline || (Array.isArray(links) && links.length > 0)) && (
          <div className={isMistHero ? 'flex flex-col items-end gap-6 text-right md:ml-auto md:max-w-md' : ''}>
            {subheadline && (
              <motion.div
                className={isMistHero ? 'max-w-md' : 'mt-6 max-w-xl'}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : lines.length * motionTokens.stagger + 0.2,
                  duration: motionTokens.duration.normal,
                  ease: motionTokens.ease,
                }}
              >
                <RichText
                  publicContext={publicContext}
                  content={subheadline}
                  withWrapper={false}
                  overrideStyle={{
                    p: 'text-base text-muted-foreground md:text-lg',
                  }}
                />
              </motion.div>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <motion.div
                className={
                  isMistHero
                    ? 'flex flex-col items-end gap-3'
                    : 'mt-8 flex flex-col gap-3 sm:flex-row'
                }
                initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : lines.length * motionTokens.stagger + 0.35,
                  duration: motionTokens.duration.normal,
                  ease: motionTokens.ease,
                }}
              >
                {links.map(({ link }, index) => (
                  <CMSLink
                    key={index}
                    publicContext={publicContext}
                    className={isMistHero ? '' : 'w-full sm:w-auto'}
                    {...link}
                  />
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>

      {showScrollIndicator && !hideScrollIndicator && (
        <ScrollIndicator align={isMistHero ? 'left' : 'center'} />
      )}
    </section>
  )
}

export default HeroCorp01
