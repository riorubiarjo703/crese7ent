'use client'

import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'

import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useOrisaTestimonialEffects } from '@/hooks/useOrisaTestimonialEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { TestimonialBlock } from '@/payload-types'
import { cn } from '@/utilities'
import { extractPlainText } from '@/utilities/richtext'
import { splitRichText } from '@/utilities/richtext'
import type { PublicContextProps } from '@/utilities/publicContextProps'

const DEMO_TESTIMONIALS = [
  {
    quote:
      'They delivered not just a design, but a complete brand experience. Strategic, creative, and incredibly detail-oriented.',
    authorName: 'Amelia Wright',
    authorDescription: 'Head of Marketing',
    authorLocation: 'London United Kingdom',
    rating: 5,
  },
  {
    quote:
      'The collaboration was seamless from start to finish. Their UX decisions significantly improved our product engagement.',
    authorName: 'Lucas Moreno',
    authorDescription: 'Product Manager',
    authorLocation: 'Barcelona, Spain',
    rating: 4,
  },
  {
    quote:
      'A rare combination of technical expertise and artistic vision. The final result felt premium and purposeful.',
    authorName: 'Hannah Lee',
    authorDescription: 'Creative Director',
    authorLocation: 'Studio Kinetic',
    rating: 5,
  },
] as const

function OrisaTestimonialMark() {
  return (
    <svg
      className="fill-primary mb-5"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="42"
      viewBox="0 0 40 42"
      fill="none"
      aria-hidden
    >
      <path d="M16 14L12 7L16 0H24L28 7H20L16 14Z" />
      <path d="M36 21L32 14H24L28 7H36L40 14L36 21Z" />
      <path d="M28 35H36L40 28L36 21H28L32 28L28 35Z" />
      <path d="M12 35H20L24 28L28 35L24 42H16L12 35Z" />
      <path d="M4 21H12L8 14L12 7H4L0 14L4 21Z" />
      <path d="M4 21L0 28L4 35H12L16 28H8L4 21Z" />
    </svg>
  )
}

function NavArrow({ direction }: { direction: 'prev' | 'next' }) {
  if (direction === 'prev') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden>
        <path
          d="M11.3481 7.47314L5.25879 13.2856L11.3481 19.0981"
          stroke="currentColor"
          strokeWidth="1.66071"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.3124 13.2856H5.53564"
          stroke="currentColor"
          strokeWidth="1.66071"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden>
      <path
        d="M15.2234 7.47314L21.3126 13.2856L15.2234 19.0981"
        stroke="currentColor"
        strokeWidth="1.66071"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.259 13.2856H21.0358"
        stroke="currentColor"
        strokeWidth="1.66071"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M7.90625 6.87488L4.80188 9.91088L5.535 14.1989C5.5507 14.2908 5.5405 14.3853 5.5054 14.4717C5.4704 14.5581 5.4119 14.633 5.3367 14.6879C5.2615 14.7427 5.1725 14.7753 5.0797 14.782C4.987 14.7887 4.8942 14.7693 4.8119 14.7259L0.97358 12.7013L-2.86425 14.7253C-2.94655 14.7688 -3.03932 14.7882 -3.13206 14.7815C-3.2248 14.7748 -3.31382 14.7421 -3.38905 14.6873C-3.46428 14.6325 -3.52272 14.5577 -3.55777 14.4713C-3.59282 14.3849 -3.60307 14.2903 -3.58736 14.1983L-2.85428 9.91035L-5.95904 6.87488C-6.02568 6.80974 -6.07281 6.72714 -6.0951 6.63654C-6.11739 6.54591 -6.11396 6.45083 -6.08517 6.36206C-6.05639 6.27329 -6.00341 6.19438 -5.93224 6.13426C-5.86107 6.07414 -5.77454 6.0352 -5.68245 6.02187L-1.39211 5.39687L0.52653 1.49587C0.6945 1.15437 1.25266 1.15437 1.42058 1.49587L3.33922 5.39687L7.62956 6.02187C7.72145 6.03556 7.8078 6.07468 7.8787 6.13484C7.9496 6.19501 8.0024 6.27383 8.0312 6.36245C8.0599 6.45107 8.0634 6.54598 8.0413 6.6365C8.0193 6.72701 7.9725 6.80954 7.90625 6.87488Z"
        fill={filled ? '#FFB618' : '#585959'}
        transform="translate(3.09 0)"
      />
    </svg>
  )
}

function StarRating({ rating }: { rating: number }) {
  const safeRating = Math.min(5, Math.max(0, Math.round(rating)))

  return (
    <div className="flex items-center gap-0.5" aria-label={`${safeRating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} filled={index < safeRating} />
      ))}
    </div>
  )
}

type TestimonialItem = NonNullable<TestimonialBlock['testimonial']>[number]

type ResolvedTestimonial = {
  quote: string
  authorName: string
  authorDescription: string
  authorLocation: string
  rating: number
  authorAvatar?: TestimonialItem['authorAvatar']
  icon?: TestimonialItem['icon']
  id?: string | null
}

function resolveTestimonials(
  items: TestimonialBlock['testimonial'],
): ResolvedTestimonial[] {
  const source = items?.length ? items : []

  if (!source.length) {
    return DEMO_TESTIMONIALS.map((item) => ({ ...item }))
  }

  return source.map((item, index) => {
    const fallback = DEMO_TESTIMONIALS[index % DEMO_TESTIMONIALS.length]
    const quote = item?.text ? extractPlainText(item.text) : fallback.quote

    return {
      quote: quote || fallback.quote,
      authorName: item?.authorName?.trim() || fallback.authorName,
      authorDescription: item?.authorDescription?.trim() || fallback.authorDescription,
      authorLocation: item?.authorLocation?.trim() || fallback.authorLocation,
      rating: item?.rating ?? fallback.rating,
      authorAvatar: item?.authorAvatar,
      icon: item?.icon,
      id: item?.id,
    }
  })
}

function TestimonialCard({
  item,
  isActive,
}: {
  item: ResolvedTestimonial
  isActive: boolean
}) {
  const avatar = item.authorAvatar
  const logo = item.icon

  return (
    <div
      className={cn(
        'testimonial-cart-wrap group relative rounded-2xl border border-neutral-700 bg-neutral-800 p-3 md:p-5 lg:p-8 xl:p-10',
      )}
    >
      <div
        className={cn(
          'rectangular pointer-events-none absolute -bottom-3 left-1/2 z-[-2] h-[50px] w-[90%] -translate-x-1/2 overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 transition-all duration-300',
          isActive && 'after:absolute after:bottom-[-12px] after:left-1/2 after:z-[-1] after:h-[99px] after:w-[99px] after:-translate-x-1/2 after:rounded-full after:bg-primary after:opacity-100 after:blur-[125px]',
          !isActive && 'after:opacity-0',
        )}
        aria-hidden
      />

      <div className="testimonial-top mb-[45px] flex items-center justify-between">
        <div className="testimonial-top-left-img size-[85px] shrink-0 overflow-hidden rounded-2xl">
          {avatar && (
            <Media resource={avatar} imgClassName="size-full object-cover" />
          )}
        </div>
        <div className="testimonial-top-right-logo ms-5 shrink-0">
          {logo && (
            <Media resource={logo} imgClassName="h-8 w-auto max-w-[120px] object-contain object-right" />
          )}
        </div>
      </div>

      <div className="testimonial-bottom-wrap">
        <div className="testimonial-content">
          <p className="testimonial-content-text mb-0 line-clamp-4 text-[28px] leading-[1.35] font-normal tracking-[-0.03em] text-white md:text-[32px]">
            {item.quote.startsWith('“') ? item.quote : `“${item.quote}”`}
          </p>

          <div className="testimonial-content-rating mt-3">
            <StarRating rating={item.rating} />
          </div>

          <div className="testimonial-content-author relative mt-20 before:absolute before:top-[-20px] before:left-0 before:h-px before:w-[57px] before:bg-neutral-500 before:transition-all before:duration-300 group-hover:before:w-[100px] group-hover:before:bg-primary">
            <h3 className="testimonial-content-author-name mb-0 text-base font-semibold text-white">
              {item.authorName}
            </h3>
            <p className="testimonial-content-author-position m-0 text-neutral-500">
              {item.authorDescription}
            </p>
            <p className="testimonial-content-author-company m-0 text-neutral-500">
              {item.authorLocation}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrisaClientStoriesBadge({
  href,
  newTab,
  badgeRef,
  badgeTextRef,
}: {
  href: string
  newTab?: boolean | null
  badgeRef: RefObject<HTMLImageElement | null>
  badgeTextRef: RefObject<HTMLSpanElement | null>
}) {
  const linkProps = newTab ? { rel: 'noopener noreferrer' as const, target: '_blank' as const } : {}

  return (
    <div className="relative z-[1] pt-[50px] text-center">
      <Link
        href={href}
        className="relative inline-flex bg-transparent"
        {...linkProps}
      >
        <img
          ref={badgeRef}
          src="/seed/orisa/creative/icons/badge-2.svg"
          alt=""
          width={141}
          height={141}
          className="badge-zoon-in"
          aria-hidden
        />
        <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-visible">
          <span ref={badgeTextRef} className="badge-text-zoom-in mt-2 overflow-visible text-wrap">
            <span className="text-center text-sm leading-tight font-bold text-white uppercase">
              Client
              <br />
              Stories
            </span>
          </span>
        </span>
      </Link>
    </div>
  )
}

export function TestimonialOrisa01Client({
  headline,
  testimonial,
  link,
  publicContext,
}: TestimonialBlock & { publicContext: PublicContextProps }) {
  const carouselRowRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLImageElement>(null)
  const badgeTextRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const plugins = useMemo(
    () => (reducedMotion ? undefined : [Autoplay({ delay: 5000, stopOnInteraction: false })]),
    [reducedMotion],
  )

  const items = useMemo(() => resolveTestimonials(testimonial), [testimonial])

  const { firstNode, rest } = splitRichText(headline, {
    splitOn: ['h2', 'h3', 'heading'],
    takeFirst: true,
  })

  useOrisaTestimonialEffects(carouselRowRef, {
    enabled: !reducedMotion,
    reducedMotion,
    badgeRef,
    badgeTextRef,
  })

  const badgeHref =
    resolveCmsLinkHref({
      type: link?.type ?? 'custom',
      url: link?.url ?? 'mailto:hello@orisa.com',
      reference: link?.reference,
      section: link?.section,
      publicContext,
    }) ?? 'mailto:hello@orisa.com'

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())

    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  if (!items.length) return null

  return (
    <section className="sec-6-home-1-wrapper mx-auto max-w-[2200px]">
      <div className="sec-6-home-1 mx-2 overflow-hidden rounded-[20px] bg-black pt-[100px] pb-[100px] lg:mx-3">
        <div className="w-full px-4">
          <div className="relative z-[2] mb-[50px] grid items-end gap-3 md:grid-cols-12">
            <div className="md:col-span-8">
              <OrisaTestimonialMark />
              {firstNode ? (
                <RichText
                  content={firstNode}
                  publicContext={publicContext}
                  withWrapper={false}
                  overrideStyle={{
                    h2: 'mb-2.5 text-[42px] leading-none font-semibold tracking-[-0.05em] text-white md:text-[56px] lg:text-[64px]',
                    h3: 'mb-2.5 text-[42px] leading-none font-semibold tracking-[-0.05em] text-white',
                    p: 'mb-0 text-lg leading-[1.5] tracking-[-0.03em] text-white',
                  }}
                />
              ) : (
                <h2 className="mb-2.5 text-[42px] leading-none font-semibold tracking-[-0.05em] text-white md:text-[56px] lg:text-[64px]">
                  Trusted by Clients
                </h2>
              )}
              {rest ? (
                <RichText
                  content={rest}
                  publicContext={publicContext}
                  withWrapper={false}
                  overrideStyle={{
                    p: 'mb-0 text-lg leading-[1.5] tracking-[-0.03em] text-white',
                  }}
                />
              ) : (
                <p className="mb-0 text-lg leading-[1.5] tracking-[-0.03em] text-white">
                  Real client experiences that speak to the strength of our work.
                </p>
              )}
            </div>

            <div className="flex justify-end md:col-span-4 lg:col-span-2 lg:col-start-11">
              <div className="swiper-button-wrapper flex gap-2.5">
                <button
                  type="button"
                  className="swiper-btn-prev flex size-[50px] items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-white transition-colors duration-300 hover:border-white/30 hover:bg-neutral-700"
                  onClick={() => api?.scrollPrev()}
                  aria-label="Previous testimonial"
                >
                  <NavArrow direction="prev" />
                </button>
                <button
                  type="button"
                  className="swiper-btn-next flex size-[50px] items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-white transition-colors duration-300 hover:border-white/30 hover:bg-neutral-700"
                  onClick={() => api?.scrollNext()}
                  aria-label="Next testimonial"
                >
                  <NavArrow direction="next" />
                </button>
              </div>
            </div>
          </div>

          <div ref={carouselRowRef} className="scroll-move-up2 relative z-[2]">
            <Carousel
              className="slider-testimonial pb-3"
              opts={{ loop: true, align: 'center' }}
              plugins={plugins}
              setApi={setApi}
            >
              <CarouselContent className="-ml-[35px]">
                {items.map((item, index) => (
                  <CarouselItem
                    key={item.id ?? `testimonial-${index}`}
                    className="basis-full pl-[35px] sm:basis-1/2 lg:basis-1/3"
                  >
                    <TestimonialCard item={item} isActive={index === selectedIndex} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <OrisaClientStoriesBadge
            href={badgeHref}
            newTab={link?.newTab}
            badgeRef={badgeRef}
            badgeTextRef={badgeTextRef}
          />
        </div>
      </div>
    </section>
  )
}

export default TestimonialOrisa01Client
