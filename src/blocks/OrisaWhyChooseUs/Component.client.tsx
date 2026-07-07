'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { Media } from '@/components/Media'
import { OrisaRotatingLink } from '@/components/orisa/OrisaRotatingLink'
import RichText from '@/components/RichText'
import { useOrisaWhyChooseUsEffects } from '@/hooks/useOrisaWhyChooseUsEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Media as MediaType, OrisaWhyChooseUsBlock } from '@/payload-types'
import { extractPlainText } from '@/utilities/richtext'
import type { PublicContextProps } from '@/utilities/publicContextProps'

const DEMO_IMAGE_SRCS = [
  '/seed/orisa/creative/pages/img-15.webp',
  '/seed/orisa/creative/pages/img-16.webp',
] as const

const DEMO_WATERMARK_SRC = '/seed/orisa/creative/template/logo/logo-w-lg.png'

function getMediaSrc(resource: MediaType | string | null | undefined): string | undefined {
  if (!resource || typeof resource === 'string') return undefined
  return resource.url ?? undefined
}

function isPopulatedMedia(
  resource: MediaType | string | null | undefined,
): resource is MediaType {
  return Boolean(resource && typeof resource === 'object' && resource.url)
}
const DEFAULT_HEADLINE =
  'Delivering measurable results through a strong balance of design excellence and functional performance.'

const DEFAULT_INTRO =
  'Orisa™ goes beyond aesthetics—bringing clarity through motion, flexible structure, and practical tools that help you move faster without defining your identity.'

const DEFAULT_IMAGE_CARDS = [
  {
    tag: 'Creative',
    overlayText: '',
  },
  {
    tag: '',
    overlayText: 'Great digital experiences begin with a conversation. Let’s talk.',
  },
] as const

const DEFAULT_STAT_COLUMNS = [
  {
    compactPosition: 'top' as const,
    compactValue: '1.8M',
    compactSuffix: '+',
    featureTitle: 'Active\nlive cases',
    featureDescription:
      'We always provide people a complete solution upon focused of any business',
    featureIcon: 'active-cases' as const,
  },
  {
    compactPosition: 'bottom' as const,
    compactValue: '16K',
    compactSuffix: '+',
    featureTitle: 'Trusted\nPartners',
    featureDescription:
      'Because sometimes the best design is the one you don’t have to think about.',
    featureIcon: 'trusted-partners' as const,
  },
]

function DecorDiamonds() {
  return (
    <div className="at-about-svg-wrap relative -translate-y-[100px]" data-why-decor aria-hidden>
      <svg
        data-why-decor-facet="left"
        className="absolute top-[34px] left-0"
        xmlns="http://www.w3.org/2000/svg"
        width="57"
        height="91"
        viewBox="0 0 57 91"
        fill="none"
      >
        <path opacity="0.1" d="M0 0L56.4024 33.572V90.336L0 56.46V0Z" fill="#515151" />
      </svg>
      <svg
        data-why-decor-facet="center"
        xmlns="http://www.w3.org/2000/svg"
        width="113"
        height="68"
        viewBox="0 0 113 68"
        fill="none"
      >
        <path
          opacity="0.3"
          d="M0 33.876L56.4024 0L112.805 33.876V34.1294L56.4024 68.0054L0 34.1294V33.876Z"
          fill="#515151"
        />
      </svg>
      <svg
        data-why-decor-facet="right"
        className="absolute top-[34px] left-14"
        xmlns="http://www.w3.org/2000/svg"
        width="57"
        height="91"
        viewBox="0 0 57 91"
        fill="none"
      >
        <path opacity="0.2" d="M56.4009 0L8.7738e-05 33.5367V90.2413L56.4009 56.4008V0Z" fill="#515151" />
      </svg>
    </div>
  )
}

function FeatureIcon({ type }: { type: 'active-cases' | 'trusted-partners' }) {
  if (type === 'trusted-partners') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden>
        <path d="M38 12L31 19L19 7L26 0H38V12Z" fill="currentColor" />
        <path d="M7 19L19 7L12 0H0V12L7 19Z" fill="currentColor" />
        <path d="M19 31L12 38H0V26L7 19V31H19Z" fill="currentColor" />
        <path d="M19 31H31V19L38 26V38H26L19 31Z" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 20H20V30L20 40H10L0 30L10 20H0V0H10L20 10V1.90735e-06L30 0L40 10L30 20ZM20 10V20H10L20 10Z"
        fill="currentColor"
      />
      <path d="M30 20H40V40H30L20 30L30 20Z" fill="currentColor" />
    </svg>
  )
}

function CompactMetricCard({ value, suffix }: { value: string; suffix: string }) {
  return (
    <div className="rounded-2xl bg-white px-5 py-3">
      <h4 className="mb-0 flex items-center justify-between text-3xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-4xl">
        <span>{value}</span>
        <span>{suffix}</span>
      </h4>
    </div>
  )
}

function FeatureStatCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: 'active-cases' | 'trusted-partners'
}) {
  const titleLines = title.split('\n')

  return (
    <div className="rounded-2xl bg-white p-5">
      <h5 className="mb-0 text-end text-base leading-tight font-semibold tracking-[-0.03em] text-neutral-950">
        {titleLines.map((line, index) => (
          <span key={`${line}-${index}`} className="block">
            {line}
          </span>
        ))}
      </h5>
      <div className="pt-[100px] text-neutral-500 md:pt-[150px]">
        <FeatureIcon type={icon} />
        <p className="mt-3 mb-0 text-lg leading-[1.5] tracking-[-0.03em] text-neutral-950">
          {description}
        </p>
      </div>
    </div>
  )
}

function StatColumn({
  compactPosition,
  compactValue,
  compactSuffix,
  featureTitle,
  featureDescription,
  featureIcon,
}: {
  compactPosition: 'top' | 'bottom'
  compactValue: string
  compactSuffix: string
  featureTitle: string
  featureDescription: string
  featureIcon: 'active-cases' | 'trusted-partners'
}) {
  const compact = <CompactMetricCard value={compactValue} suffix={compactSuffix} />
  const feature = (
    <FeatureStatCard title={featureTitle} description={featureDescription} icon={featureIcon} />
  )

  return (
    <div className="hover-unborder flex flex-col gap-2">
      {compactPosition === 'top' ? (
        <>
          {compact}
          {feature}
        </>
      ) : (
        <>
          {feature}
          {compact}
        </>
      )}
    </div>
  )
}

function ImageCard({
  image,
  imageFallbackSrc,
  tag,
  tagHref,
  watermark,
  watermarkFallbackSrc,
  overlayText,
}: {
  image: NonNullable<OrisaWhyChooseUsBlock['imageCards']>[number]['image']
  imageFallbackSrc: string
  tag?: string | null
  tagHref?: string | null
  watermark?: NonNullable<OrisaWhyChooseUsBlock['imageCards']>[number]['watermark']
  watermarkFallbackSrc?: string
  overlayText?: string | null
}) {
  const tagClassName =
    'inline-block rounded-full border border-white/40 bg-transparent px-3 py-1 text-xs font-semibold tracking-[-0.03em] text-white uppercase'

  const imageSrc = getMediaSrc(image) ?? imageFallbackSrc
  const watermarkSrc = getMediaSrc(watermark) ?? watermarkFallbackSrc
  const imageClassName = 'zoom-blur-image block w-full object-cover'

  return (
    <div className="at-image-hover relative overflow-hidden rounded-2xl">
      <div className="anim-zoomin-wrap overflow-hidden" data-why-zoom-wrap>
        <div className="anim-zoomin">
          {isPopulatedMedia(image) ? (
            <Media resource={image} imgClassName={imageClassName} />
          ) : (
            <img src={imageSrc} alt="" className={imageClassName} />
          )}
        </div>
      </div>

      {(watermarkSrc || isPopulatedMedia(watermark)) && (
        <div className="absolute start-4 bottom-4 z-[2]">
          {isPopulatedMedia(watermark) ? (
            <Media resource={watermark} imgClassName="h-8 w-auto max-w-[120px] object-contain" />
          ) : (
            <img
              src={watermarkSrc}
              alt=""
              className="h-8 w-auto max-w-[120px] object-contain"
            />
          )}
        </div>
      )}

      {tag && (
        <div className="content absolute end-4 top-4 z-[2]">
          {tagHref ? (
            <Link href={tagHref} className={tagClassName}>
              {tag}
            </Link>
          ) : (
            <span className={tagClassName}>{tag}</span>
          )}
        </div>
      )}

      {overlayText && (
        <div className="content z-[2]">
          <h4 className="absolute start-4 bottom-4 m-0 max-w-[85%] text-base leading-snug font-semibold text-white md:text-lg">
            {overlayText}
          </h4>
        </div>
      )}
    </div>
  )
}

export function OrisaWhyChooseUsClient({
  sectionId,
  eyebrow,
  eyebrowLink,
  headline,
  intro,
  imageCards,
  statColumns,
  publicContext,
}: OrisaWhyChooseUsBlock & { publicContext: PublicContextProps }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useOrisaWhyChooseUsEffects(sectionRef, {
    enabled: !reducedMotion,
    reducedMotion,
  })

  const eyebrowLabel = eyebrow?.trim() || 'Why choose us'
  const eyebrowHref =
    resolveCmsLinkHref({
      type: eyebrowLink?.type ?? 'custom',
      url: eyebrowLink?.url ?? '/about',
      reference: eyebrowLink?.reference,
      section: eyebrowLink?.section,
      publicContext,
    }) ?? '/about'

  const headlineText = headline ? extractPlainText(headline) : DEFAULT_HEADLINE
  const introText = intro ? extractPlainText(intro) : DEFAULT_INTRO

  const cards = (imageCards?.length ? imageCards : DEFAULT_IMAGE_CARDS).slice(0, 2)
  const columns = (statColumns?.length ? statColumns : DEFAULT_STAT_COLUMNS).slice(0, 2).map(
    (column, index) => ({
      compactPosition: (column.compactPosition as 'top' | 'bottom') ?? DEFAULT_STAT_COLUMNS[index]?.compactPosition ?? 'top',
      compactValue: column.compactValue ?? DEFAULT_STAT_COLUMNS[index]?.compactValue ?? '1.8M',
      compactSuffix: column.compactSuffix ?? DEFAULT_STAT_COLUMNS[index]?.compactSuffix ?? '+',
      featureTitle: column.featureTitle ?? DEFAULT_STAT_COLUMNS[index]?.featureTitle ?? '',
      featureDescription:
        column.featureDescription ?? DEFAULT_STAT_COLUMNS[index]?.featureDescription ?? '',
      featureIcon:
        (column.featureIcon as 'active-cases' | 'trusted-partners') ??
        DEFAULT_STAT_COLUMNS[index]?.featureIcon ??
        'active-cases',
    }),
  )

  return (
    <section
      ref={sectionRef}
      id={sectionId || 'why-choose-us'}
      className="at-sec7-area-wrapper mx-auto max-w-[2200px]"
    >
      <div className="at-sec7-area mx-2 mt-10 rounded-[20px] bg-neutral-50 pt-[120px] pb-[120px] lg:mx-3">
        <div className="w-full px-4">
          <div className="mb-8 grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <OrisaRotatingLink
                href={eyebrowHref}
                label={eyebrowLabel}
                className="mb-10 bg-transparent p-0 text-neutral-950 uppercase"
                newTab={eyebrowLink?.newTab}
              />
              {headline ? (
                <div data-why-headline>
                  <RichText
                    content={headline}
                    publicContext={publicContext}
                    withWrapper={false}
                    overrideStyle={{
                      h2: 'reveal-text mb-20 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:mb-[80px] lg:text-[48px]',
                      h3: 'reveal-text mb-20 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:mb-[80px] lg:text-[48px]',
                      h4: 'reveal-text mb-20 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 lg:mb-[80px]',
                      p: 'reveal-text mb-20 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:mb-[80px] lg:text-[48px]',
                    }}
                  />
                </div>
              ) : (
                <h3
                  data-why-headline-fallback
                  className="reveal-text mb-20 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:mb-[80px] lg:text-[48px]"
                >
                  {headlineText}
                </h3>
              )}
            </div>
            <div className="hidden md:col-span-3 md:col-start-10 md:block lg:col-span-2 lg:col-start-11">
              <DecorDiamonds />
            </div>
          </div>

          <div className="grid items-end gap-y-6 lg:grid-cols-12">
            <div className="flex flex-col gap-2 lg:col-span-4">
              {cards.map((card, index) => {
                const fallback = DEFAULT_IMAGE_CARDS[index]
                const tagHref = card.tagLink
                  ? resolveCmsLinkHref({
                      type: card.tagLink.type,
                      url: card.tagLink.url,
                      reference: card.tagLink.reference,
                      section: card.tagLink.section,
                      publicContext,
                    })
                  : null

                return (
                  <ImageCard
                    key={card.id ?? `why-image-${index}`}
                    image={card.image}
                    imageFallbackSrc={DEMO_IMAGE_SRCS[index] ?? DEMO_IMAGE_SRCS[0]}
                    tag={card.tag ?? fallback?.tag}
                    tagHref={tagHref}
                    watermark={card.watermark}
                    watermarkFallbackSrc={index === 0 ? DEMO_WATERMARK_SRC : undefined}
                    overlayText={card.overlayText ?? fallback?.overlayText}
                  />
                )
              })}
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid gap-2 lg:grid-cols-12">
                <div className="md:max-w-md lg:col-span-7" data-why-intro>
                  {intro ? (
                    <RichText
                      content={intro}
                      publicContext={publicContext}
                      withWrapper={false}
                      overrideStyle={{
                        h4: 'reveal-text mb-[60px] text-base leading-[1.5] font-semibold tracking-[-0.03em] text-neutral-800 md:text-lg',
                        p: 'reveal-text mb-[60px] text-base leading-[1.5] font-semibold tracking-[-0.03em] text-neutral-800 md:text-lg',
                      }}
                    />
                  ) : (
                    <h4 className="reveal-text mb-[60px] text-base leading-[1.5] font-semibold tracking-[-0.03em] text-neutral-800 md:text-lg">
                      {introText}
                    </h4>
                  )}
                </div>

                <div className="grid gap-2 sm:grid-cols-2 lg:col-span-12">
                  {columns.map((column, index) => (
                    <StatColumn key={`why-stat-${index}`} {...column} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrisaWhyChooseUsClient
