'use client'

import React, { useMemo, useRef, useState } from 'react'

import { EuropeGlobe } from '@/components/maps/EuropeGlobe'
import { GlobeCountryLabels } from '@/components/maps/GlobeCountryLabels'
import { Media } from '@/components/Media'
import { SectionReveal } from '@/components/motion/SectionReveal'
import RichText from '@/components/RichText'
import { Marquee } from '@/components/ui/marquee'
import { ShineBorder } from '@/components/ui/shine-border'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollFade } from '@/hooks/useScrollFade'
import type { ExpansionMapBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { BRAND_RED, BRAND_RED_80 } from '@/utilities/brand-colors'
import { cn } from '@/utilities'

type Country = NonNullable<ExpansionMapBlock['countries']>[number]
type Office = NonNullable<ExpansionMapBlock['offices']>[number]

const HUB_BY_CODE: Record<string, string> = {
  ES: 'Madrid',
  GB: 'London',
  DE: 'Frankfurt',
  FR: 'Paris',
  IT: 'Milan',
  PT: 'Lisbon',
  NL: 'Amsterdam',
  BE: 'Brussels',
  CH: 'Zurich',
  PL: 'Warsaw',
}

function CountryMarketCard({
  country,
  office,
}: {
  country: Country
  office?: Office
}) {
  const hub = HUB_BY_CODE[country.code?.toUpperCase() ?? ''] ?? country.name

  return (
    <article className="relative w-[min(88vw,18rem)] shrink-0 overflow-hidden rounded-lg bg-background shadow-sm md:w-[20rem]">
      <ShineBorder
        shineColor={[BRAND_RED_80, 'rgba(255,255,255,0.45)', BRAND_RED]}
        duration={12}
        borderWidth={1}
      />
      <div className="from-muted/40 to-background border-border border-b bg-linear-to-br px-6 py-5">
        <p className="text-muted-foreground text-[0.65rem] tracking-[0.2em] uppercase">Market</p>
        <h3 className="mt-1 text-xl font-semibold">{country.name}</h3>
        <p className="text-primary mt-1 text-sm font-medium">{hub}</p>
      </div>
      <div className="p-6">
        {office?.image && typeof office.image === 'object' ? (
          <div className="bg-muted relative mb-4 aspect-[16/10] overflow-hidden rounded-md">
            <Media resource={office.image} fill imgClassName="object-cover" loading="lazy" />
          </div>
        ) : null}
        {office?.address ? (
          <p className="text-muted-foreground text-sm whitespace-pre-line">{office.address}</p>
        ) : (
          <p className="text-muted-foreground text-sm">Investment coverage across {country.name}</p>
        )}
        {office?.mapUrl ? (
          <a
            href={office.mapUrl}
            className="text-primary mt-4 inline-block text-sm hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on map
          </a>
        ) : (
          <span className="text-muted-foreground/70 mt-4 inline-block text-sm">
            ISO {country.code?.toUpperCase()}
          </span>
        )}
      </div>
    </article>
  )
}

export function ExpansionMapClient({
  eyebrow,
  headline,
  body,
  partner,
  countries,
  offices,
  publicContext,
}: ExpansionMapBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const [hoveredCode, setHoveredCode] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const highlightedCodes = useMemo(
    () =>
      (countries ?? [])
        .filter((country) => country.highlighted !== false)
        .map((country) => country.code?.toUpperCase() ?? '')
        .filter(Boolean),
    [countries],
  )

  const countryCards = useMemo(() => {
    if (!countries?.length) return []

    const officeByCode = new Map(
      (offices ?? []).flatMap((office) => {
        const code = Object.entries(HUB_BY_CODE).find(([, city]) => city === office.city)?.[0]
        return code ? [[code, office] as const] : []
      }),
    )

    return countries.map((country) => ({
      country,
      office: officeByCode.get(country.code?.toUpperCase() ?? ''),
    }))
  }, [countries, offices])

  const { rowOne, rowTwo } = useMemo(() => {
    const midpoint = Math.ceil(countryCards.length / 2)
    return {
      rowOne: countryCards.slice(0, midpoint),
      rowTwo: countryCards.slice(midpoint),
    }
  }, [countryCards])

  useScrollFade(sectionRef, { enabled: !reducedMotion, y: 48, scrub: 0.85 })

  return (
    <SectionReveal>
      <section className="relative -mt-20 overflow-hidden bg-background pt-28 pb-24 md:pb-32" ref={sectionRef}>
        <div className="container relative z-10">
          <div className="relative min-h-[28rem] md:min-h-[34rem] lg:min-h-[38rem]">
            <div
              className="absolute top-[56%] left-1/2 aspect-square w-[min(88vw,34rem)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
              data-home-parallax
              data-scroll-speed="10"
            >
              <EuropeGlobe
                highlightedCodes={highlightedCodes}
                hoveredCode={hoveredCode}
                variant="background"
              />
              {countries && countries.length > 0 && (
                <GlobeCountryLabels
                  countries={countries}
                  hoveredCode={hoveredCode}
                  onHover={setHoveredCode}
                />
              )}
            </div>

            <div
              className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-4 pt-4 text-center md:px-8"
              data-scroll-reveal="up"
              data-scroll-distance="48"
            >
              {eyebrow && (
                <p className="text-muted-foreground mb-4 text-sm tracking-[0.2em] uppercase">
                  {eyebrow}
                </p>
              )}
              {headline && (
                <RichText
                  publicContext={publicContext}
                  content={headline}
                  withWrapper={false}
                  overrideStyle={{
                    h2: 'font-display text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl',
                    h3: 'font-display text-2xl font-medium tracking-tight md:text-3xl',
                  }}
                />
              )}
              {body && (
                <div className="mt-6">
                  <RichText
                    publicContext={publicContext}
                    content={body}
                    withWrapper={false}
                    overrideStyle={{
                      p: 'text-muted-foreground text-base leading-relaxed md:text-lg',
                    }}
                  />
                </div>
              )}
              {partner?.name && (
                <div className="border-border mt-8 flex w-full items-center justify-center gap-4 border-t pt-8">
                  {partner.logo && typeof partner.logo === 'object' && (
                    <div className="relative h-12 w-24">
                      <Media
                        resource={partner.logo}
                        fill
                        imgClassName="object-contain object-left"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
                      Partner
                    </p>
                    {partner.url ? (
                      <a
                        href={partner.url}
                        className="text-lg font-medium hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {partner.name}
                      </a>
                    ) : (
                      <p className="text-lg font-medium">{partner.name}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {countryCards.length > 0 && (
            <div
              className="relative mt-12 space-y-4 md:mt-16 md:space-y-5"
              data-scroll-reveal="up"
              data-scroll-start="top 90%"
              data-scroll-distance="40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-20"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-20"
              />

              {reducedMotion ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {countryCards.map(({ country, office }, index) => (
                    <CountryMarketCard
                      key={country.id ?? `${country.code}-${index}`}
                      country={country}
                      office={office}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <Marquee className="[--duration:55s] [--gap:1.25rem]" pauseOnHover repeat={2}>
                    {rowOne.map(({ country, office }, index) => (
                      <CountryMarketCard
                        key={country.id ?? `${country.code}-r1-${index}`}
                        country={country}
                        office={office}
                      />
                    ))}
                  </Marquee>
                  <Marquee
                    reverse
                    className="[--duration:62s] [--gap:1.25rem]"
                    pauseOnHover
                    repeat={2}
                  >
                    {rowTwo.map(({ country, office }, index) => (
                      <CountryMarketCard
                        key={country.id ?? `${country.code}-r2-${index}`}
                        country={country}
                        office={office}
                      />
                    ))}
                  </Marquee>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </SectionReveal>
  )
}
