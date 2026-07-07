'use client'

import { ArrowUp } from 'lucide-react'
import Link from 'next/link'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Footer } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

function MarqueeTags({
  tags,
}: {
  tags?: { label?: string | null; id?: string | null }[] | null
}) {
  if (!tags?.length) return null

  const items = tags.filter((t) => t.label)
  const loop = [...items, ...items]

  return (
    <div className="overflow-hidden border-t border-white/10 pt-6">
      <ul className="animate-orisa-marquee flex w-max gap-8 whitespace-nowrap">
        {loop.map((tag, index) => (
          <li
            key={`${tag.id ?? tag.label}-${index}`}
            className="flex items-center gap-2 text-sm text-white/50"
          >
            <span>{tag.label}</span>
            <ArrowUp aria-hidden className="size-2.5 shrink-0" strokeWidth={2} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const Footer9Client: React.FC<{ footer: Footer; publicContext: PublicContextProps }> = ({
  footer,
  publicContext,
}) => {
  const orisa = footer.orisaFooter

  return (
    <footer className="mx-2 mt-16 mb-2 font-[family-name:var(--font-dm-sans)] lg:mx-3">
      <div className="bg-neutral-950 rounded-[1.25rem] px-6 py-12 text-white md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="flex flex-wrap items-start gap-4">
            {footer.logo && (
              <Media
                resource={footer.logo}
                className="mt-1 size-12 shrink-0"
                imgClassName="size-full object-contain brightness-0 invert"
              />
            )}
            <div>
              {orisa?.headline && (
                <h2 className="text-2xl leading-tight font-semibold md:text-3xl">{orisa.headline}</h2>
              )}
              {orisa?.address && (
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-white/70">
                  {orisa.address}
                </p>
              )}
            </div>
          </div>

          <div className="lg:text-right">
            {orisa?.phone && <p className="text-sm font-semibold text-white">{orisa.phone}</p>}
            {orisa?.email && (
              <a
                href={`mailto:${orisa.email}`}
                className="mt-2 inline-block text-xl font-semibold underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                {orisa.email}
              </a>
            )}
            {footer.socialLinks && footer.socialLinks.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-4 lg:justify-end">
                {footer.socialLinks.map((social, index) => {
                  if (!social?.url) return null
                  const label = social.icon
                    ? social.icon.charAt(0).toUpperCase() + social.icon.slice(1)
                    : 'Link'

                  return (
                    <li key={social.id ?? index}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
                      >
                        {label}
                        <ArrowUp aria-hidden className="size-2.5 shrink-0" strokeWidth={2} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[1fr_2fr] lg:items-end">
          <div className="grid gap-8 sm:grid-cols-2">
            {footer.navItems?.map((section, index) => (
              <div key={section.id ?? index}>
                <p className="mb-4 text-xs font-semibold tracking-widest text-white/50 uppercase">
                  {section.title}
                </p>
                <ul className="space-y-3">
                  {section.subNavItems?.map((item, subIndex) => (
                    <li key={item.id ?? subIndex}>
                      <CMSLink
                        publicContext={publicContext}
                        {...item.link}
                        className="text-sm text-white/80 hover:text-white"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {orisa?.brandMark && (
            <p className="text-right text-4xl leading-none font-bold tracking-tight md:text-6xl lg:text-7xl">
              {orisa.brandMark.replace('®', '')}
              {orisa.brandMark.includes('®') && (
                <sup className="text-2xl font-normal md:text-3xl">®</sup>
              )}
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/60">
            {footer.copyright && `© ${new Date().getFullYear()} ${footer.copyright}`}
          </p>
          <ul className="flex flex-wrap gap-4">
            {footer.legalLinks?.map((item, index) => (
              <li key={item.id ?? index}>
                <CMSLink
                  publicContext={publicContext}
                  {...item.link}
                  className="text-sm text-white/60 hover:text-white"
                />
              </li>
            ))}
          </ul>
        </div>

        <MarqueeTags tags={orisa?.marqueeTags} />
      </div>
    </footer>
  )
}

export default Footer9Client
