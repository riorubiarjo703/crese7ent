'use client'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { OrisaHoverArrow } from '@/components/orisa/OrisaHoverArrow'
import { OrisaHoverRotate } from '@/components/orisa/OrisaHoverRotate'
import type { Footer } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

const LOGO_FALLBACK = '/seed/orisa/creative/template/logo/favicon-dark.svg'

function SocialArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M5.62494 9.99994L0.562517 10L0.5625 8.75003L4.49994 8.74996L4.5 2.39273L2.27828 4.86124L1.48278 3.97739L5.0625 0L8.64225 3.97739L7.84676 4.86124L5.625 2.3927L5.62494 9.99994Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ServiceTag({ label }: { label: string }) {
  return (
    <span className="group inline-flex items-center gap-1.5 text-base font-medium tracking-[-0.04em] text-white/50">
      <OrisaHoverRotate>{label}</OrisaHoverRotate>
      <OrisaHoverArrow className="text-white/50" />
    </span>
  )
}

const Footer9Client: React.FC<{ footer: Footer; publicContext: PublicContextProps }> = ({
  footer,
  publicContext,
}) => {
  const orisa = footer.orisaFooter

  const headlineLines = (orisa?.headlineLines?.length
    ? orisa.headlineLines.map((entry) => entry.line?.trim()).filter(Boolean)
    : orisa?.headline?.split('\n').map((line) => line.trim()).filter(Boolean)) as
    | string[]
    | undefined

  const navColumns = footer.navItems ?? []
  const primaryLinks = navColumns[0]?.subNavItems ?? []
  const secondaryLinks = navColumns[1]?.subNavItems ?? []

  const serviceTags =
    orisa?.marqueeTags?.filter((tag) => tag.label) ?? [
      { label: 'Web Development' },
      { label: 'Motion Graphics' },
      { label: 'Brand Strategy' },
      { label: 'Product Design' },
    ]

  const brandMark = orisa?.brandMark?.trim() || 'Orisa Studio®'
  const brandName = brandMark.replace('®', '')
  const hasRegistered = brandMark.includes('®')

  return (
    <footer className="mx-auto mb-2 max-w-[2200px] px-2 font-[family-name:var(--font-dm-sans)] lg:px-3">
      <div className="mp-footer-style rounded-[1.25rem] bg-neutral-950 pt-[60px] text-white">
        <div className="mx-auto w-full max-w-[1750px] px-4">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="flex flex-wrap items-start gap-4">
                {footer.logo ? (
                  <Media
                    resource={footer.logo}
                    className="mt-1 size-[50px] shrink-0"
                    imgClassName="size-full object-contain"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={LOGO_FALLBACK}
                    alt=""
                    width={50}
                    height={50}
                    className="mt-1 size-[50px] shrink-0 object-contain"
                  />
                )}
                <div>
                  {headlineLines?.length ? (
                    <h2
                      data-footer-headline
                      className="reveal-text mb-0 text-[28px] leading-[1.1] font-semibold tracking-[-0.05em] text-white md:text-[32px]"
                    >
                      {headlineLines.map((line, index) => (
                        <span key={`${line}-${index}`}>
                          {index > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </h2>
                  ) : orisa?.headline ? (
                    <h2 className="mb-0 text-[28px] leading-[1.1] font-semibold tracking-[-0.05em] text-white md:text-[32px]">
                      {orisa.headline}
                    </h2>
                  ) : null}
                  {orisa?.address && (
                    <p className="mb-0 mt-4 text-base leading-relaxed whitespace-pre-line text-white/70">
                      {orisa.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="text-start lg:col-span-4 lg:col-start-9 lg:text-end xl:col-span-3 xl:col-start-10">
              {orisa?.phone && (
                <p className="mb-0 text-base font-semibold text-white">{orisa.phone}</p>
              )}
              {orisa?.email && (
                <a
                  href={`mailto:${orisa.email}`}
                  className="mt-2 inline-block text-[28px] leading-tight font-semibold tracking-[-0.04em] text-white underline decoration-white underline-offset-4 hover:opacity-90 md:text-[32px]"
                >
                  {orisa.email}
                </a>
              )}
              {footer.socialLinks && footer.socialLinks.length > 0 && (
                <div className="at-hero-social mt-12 flex flex-wrap justify-start gap-2.5 lg:justify-end">
                  {footer.socialLinks.map((social, index) => {
                    if (!social?.url) return null
                    const label = social.icon
                      ? social.icon.charAt(0).toUpperCase() + social.icon.slice(1)
                      : 'Link'

                    return (
                      <a
                        key={social.id ?? index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-1.5 text-sm font-medium tracking-[-0.02em] text-white transition-colors hover:border-white hover:bg-white hover:text-neutral-950"
                      >
                        {label}
                        <SocialArrowIcon />
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="at-about pt-[100px] pb-[60px]">
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <span className="mb-3 block text-xs font-semibold tracking-widest text-white/50 uppercase">
                  {navColumns[0]?.title || 'Navigation'}
                </span>
                <div className="grid grid-cols-2 gap-x-6">
                  <ul className="alt-footer-link-item space-y-4">
                    {primaryLinks.map((item, index) => (
                      <li key={item.id ?? index}>
                        <CMSLink
                          publicContext={publicContext}
                          {...item.link}
                          className="text-[22px] leading-none font-normal tracking-[-0.02em] text-neutral-300 transition-colors hover:text-white"
                        />
                      </li>
                    ))}
                  </ul>
                  {secondaryLinks.length > 0 && (
                    <ul className="alt-footer-link-item space-y-4">
                      {secondaryLinks.map((item, index) => (
                        <li key={item.id ?? index}>
                          <CMSLink
                            publicContext={publicContext}
                            {...item.link}
                            className="text-[22px] leading-none font-normal tracking-[-0.02em] text-neutral-300 transition-colors hover:text-white"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="text-start lg:col-span-9 lg:text-end">
                <p className="text-scale-anim mb-0 text-[80px] leading-[0.9] font-bold tracking-[-0.05em] text-white min-[1441px]:text-[150px]">
                  {brandName}
                  {hasRegistered && <sup className="text-[40px] font-normal min-[1441px]:text-[80px]">®</sup>}
                </p>
              </div>
            </div>
          </div>

          <div className="at-about-border border-t border-white/10 py-10">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-2">
                <span className="at-footer-copyright text-base font-medium text-white/50">
                  {footer.copyright || `Orisa © ${new Date().getFullYear()}`}
                </span>
              </div>

              <div className="lg:col-span-8">
                <ul className="flex flex-wrap gap-4 ps-0">
                  {serviceTags.map((tag, index) => (
                    <li key={tag.id ?? `${tag.label}-${index}`}>
                      <ServiceTag label={tag.label ?? ''} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-start lg:col-span-2 lg:text-end">
                <span className="at-footer-copyright text-base font-medium text-white/50">
                  {orisa?.sinceCaption || '[ Since 2012 ]'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer9Client
