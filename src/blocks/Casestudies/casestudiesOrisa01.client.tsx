'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { Media } from '@/components/Media'
import { OrisaBtnGroup } from '@/components/orisa/OrisaBtnGroup'
import RichText from '@/components/RichText'
import { useOrisaPortfolioEffects } from '@/hooks/useOrisaPortfolioEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { CasestudiesBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities'

const DEFAULT_PORTFOLIO_TAGS = ['Branding', 'Web Design', 'Web development']

function OrisaPortfolioLogo() {
  return (
    <svg
      className="fill-primary mb-2.5"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <path d="M17 18L30 5H43V18L30 31V18H17Z" />
      <path d="M30 31H43V44H30V31Z" />
      <path d="M17 18L4 31V44H17L30 31H17V18Z" />
      <path d="M17 18H4V5H17V18Z" />
    </svg>
  )
}

function PortfolioItem({
  item,
  publicContext,
}: {
  item: CasestudiesBlock['slides'][number]
  publicContext: PublicContextProps
}) {
  const href = resolveCmsLinkHref({
    type: item.link?.type,
    url: item.link?.url,
    reference: item.link?.reference,
    section: item.link?.section,
    publicContext,
  })

  const tags =
    item.tags?.map((tag) => tag.label?.trim()).filter((label): label is string => Boolean(label)) ??
    DEFAULT_PORTFOLIO_TAGS

  const image = item.images?.[0]?.src

  return (
    <article className="mg-portfolio-item group mb-[55px] overflow-hidden rounded-[10px] last:mb-0">
      <div
        className="mg-portfolio-thumb overflow-hidden rounded-[10px]"
        data-portfolio-zoom-wrap
      >
        {href ? (
          <Link href={href} className="block overflow-hidden rounded-[10px]" data-portfolio-zoom>
            {image && (
              <Media
                resource={image}
                imgClassName="w-full rounded-[10px] object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
              />
            )}
          </Link>
        ) : (
          image && (
            <div data-portfolio-zoom>
              <Media
                resource={image}
                imgClassName="w-full rounded-[10px] object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
              />
            </div>
          )
        )}
      </div>

      <div className="mg-portfolio-content flex flex-wrap items-center justify-between gap-4 pt-[23px] md:flex-nowrap">
        <div className="min-w-0 md:w-[60%]">
          <h3 className="cs-portfolio-title mb-0 text-lg font-semibold tracking-[-0.05em] text-neutral-950">
            {href ? (
              <Link href={href} className="text-neutral-950 hover:text-neutral-700">
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </h3>
          {item.content && (
            <p className="mb-0 text-lg tracking-[-0.03em] text-neutral-500">{item.content}</p>
          )}
        </div>

        {tags.length > 0 && (
          <ul className="cs-portfolio-tag m-0 flex w-full list-none flex-wrap justify-start gap-1.5 p-0 md:w-[40%] md:justify-end">
            {tags.map((tag, index) => (
              <li key={`${tag}-${index}`}>
                <span className="inline-block rounded-full border border-neutral-100 px-[19px] py-2 text-xs font-semibold tracking-[-0.05em] text-neutral-950 transition-colors duration-300 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export function CasestudiesOrisa01Client({
  richText,
  slides,
  cta,
  publicContext,
}: CasestudiesBlock & { publicContext: PublicContextProps }) {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1199px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const items = (slides || []).slice(0, 4)
  const ctaLabel = cta?.label?.trim() || 'View latest projects'
  const ctaHref =
    resolveCmsLinkHref({
      type: cta?.type ?? 'custom',
      url: cta?.url ?? '/portfolio',
      reference: cta?.reference,
      section: cta?.section,
      publicContext,
    }) ?? '/portfolio'

  useOrisaPortfolioEffects(sectionRef, pinRef, {
    enabled: isDesktop && items.length > 0,
    reducedMotion,
  })

  if (!items.length) return null

  return (
    <section
      ref={sectionRef}
      className="mg-portfolio-area bg-white pt-[145px] pb-[65px] text-neutral-950"
    >
      <div className="mx-auto w-full max-w-[1750px] px-4">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div
              ref={pinRef}
              className="mg-portfolio-title-wrap mg-portfolio-pin mb-8 lg:mb-0 lg:self-start"
            >
              <OrisaPortfolioLogo />
              {richText && (
                <div className="mb-8">
                  <RichText
                    content={richText}
                    publicContext={publicContext}
                    withWrapper={false}
                    overrideStyle={{
                      h2: 'mb-[30px] text-[42px] leading-none font-semibold tracking-[-0.05em] text-neutral-950 md:text-[56px] lg:text-[64px]',
                      h3: 'mb-[30px] text-[42px] leading-none font-semibold tracking-[-0.05em] text-neutral-950',
                      p: 'mg-portfolio-dec mb-[50px] max-w-md text-lg leading-[1.5] tracking-[-0.03em] text-neutral-950',
                    }}
                  />
                </div>
              )}
              <OrisaBtnGroup href={ctaHref} label={ctaLabel} newTab={cta?.newTab} />
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className={cn('mg-portfolio-item-wrap mb-10 lg:mb-10', 'lg:ms-[130px]')}>
              {items.map((item, index) => (
                <PortfolioItem
                  key={item.id ?? `${item.name}-${index}`}
                  item={item}
                  publicContext={publicContext}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CasestudiesOrisa01Client
