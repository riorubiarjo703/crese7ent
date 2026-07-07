'use client'

import { ArrowUpRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { Footer } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { FooterSocialDock } from '@/globals/Footer/FooterSocialDock'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useScrollStaggerReveal } from '@/hooks/useScrollStaggerReveal'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { isHomePath } from '@/utilities/isHomePath'

const Footer7Client: React.FC<{ footer: Footer; publicContext: PublicContextProps }> = ({
  footer,
  publicContext,
}) => {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const animateScroll = isHomePath(pathname) && !reducedMotion

  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const flatLinks =
    footer.navItems?.flatMap((section) =>
      section.subNavItems?.map((item) => item.link).filter(Boolean) ?? [],
    ) ?? []

  const contactLink =
    flatLinks.find((link) => link.label?.toLowerCase().includes('contact')) ??
    footer.legalLinks?.[0]?.link

  useScrollReveal(copyRef, {
    enabled: animateScroll,
    y: 56,
    start: 'top 88%',
  })

  useScrollStaggerReveal(navRef, {
    enabled: animateScroll,
    x: 48,
    stagger: 0.1,
    start: 'top 88%',
  })

  useScrollStaggerReveal(bottomRef, {
    enabled: animateScroll,
    y: 32,
    stagger: 0.12,
    start: 'top 92%',
  })

  return (
    <section className="relative mt-20 md:mt-28" ref={sectionRef}>
      <div className="bg-primary text-primary-foreground rounded-t-[2rem] md:rounded-t-[2.75rem]">
        <div className="container px-6 py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <div className="max-w-lg" ref={copyRef}>
              <p className="font-display text-3xl leading-tight font-medium md:text-4xl lg:text-[2.75rem]">
                {footer.subline ??
                  'Tailored financing for high-growth SMEs and private equity managers across Europe.'}
              </p>
              {contactLink && (
                <div className="mt-8">
                  <CMSLink
                    publicContext={publicContext}
                    {...contactLink}
                    appearance="secondary"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0"
                  />
                </div>
              )}
            </div>

            <nav
              aria-label="Footer"
              className="overflow-hidden rounded-lg border-t border-b border-primary-foreground/15"
              ref={navRef}
            >
              {flatLinks.map((link, index) => (
                <div
                  key={index}
                  data-scroll-stagger-item
                  className="border-primary-foreground/15 border-b last:border-b-0"
                >
                  <CMSLink
                    publicContext={publicContext}
                    {...link}
                    className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 group flex w-full items-center justify-between gap-4 px-3 py-4 text-base font-medium transition-colors"
                  >
                    <ArrowUpRight className="size-4 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </CMSLink>
                </div>
              ))}
            </nav>
          </div>

          <div
            className="border-primary-foreground/15 mt-14 flex flex-col gap-8 border-t pt-10 md:mt-16 md:flex-row md:items-end md:justify-between"
            ref={bottomRef}
          >
            <div className="flex items-center gap-4" data-scroll-stagger-item>
              {footer.logo ? (
                <Media
                  resource={footer.logo}
                  alt="logo"
                  className="brightness-0 invert"
                  imgClassName="h-10 w-auto md:h-12"
                />
              ) : (
                <p className="font-display text-4xl font-medium tracking-tight md:text-5xl">STOREFRAME</p>
              )}
            </div>
            <div data-scroll-stagger-item>
              <FooterSocialDock links={footer.socialLinks} />
            </div>
          </div>

          <div className="text-primary-foreground/70 mt-8 flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
            <p>{footer.copyright && `© ${new Date().getFullYear()} ${footer.copyright}`}</p>
            <ul className="flex flex-wrap gap-4">
              {footer.legalLinks?.map((item, index) => (
                <li key={index}>
                  <CMSLink
                    publicContext={publicContext}
                    {...item.link}
                    className="hover:text-primary-foreground hover:bg-primary-foreground/10 group inline-flex items-center gap-1.5 rounded-sm px-2 py-1 transition-colors"
                  >
                    <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </CMSLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer7Client
