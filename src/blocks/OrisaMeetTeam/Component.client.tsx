'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { Media } from '@/components/Media'
import { OrisaBtnGroup } from '@/components/orisa/OrisaBtnGroup'
import { OrisaRotatingLink } from '@/components/orisa/OrisaRotatingLink'
import RichText from '@/components/RichText'
import { useOrisaMeetTeamEffects } from '@/hooks/useOrisaMeetTeamEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Media as MediaType, OrisaMeetTeamBlock } from '@/payload-types'
import { extractPlainText } from '@/utilities/richtext'
import type { PublicContextProps } from '@/utilities/publicContextProps'

const DEMO_HEADLINE =
  'Meet the minds behind Orisa Studio. Rely on our experienced professionals to find solutions tailored just for you.'

const DEMO_LOCATIONS = [
  {
    address: '205 North Michigan Avenue, Suite 810\nChicago, 60601, USA',
    phone: '+1234567890',
    email: 'hello@orisa.com',
  },
  {
    address: '245 Fifth Avenue, Suite 1800\nNew York, NY 10016, USA',
    phone: '+2125557398',
    email: 'sale@orisa.com',
  },
] as const

const DEMO_MEMBERS = [
  { name: 'Darrell Steward', role: 'UI/UX Designer', photoSrc: '/seed/orisa/shared/pages/img-17.webp' },
  { name: 'Amelia Courtney', role: 'Project Manager', photoSrc: '/seed/orisa/shared/pages/img-18.webp' },
  { name: 'Esther Howard', role: 'Software Developer', photoSrc: '/seed/orisa/shared/pages/img-19.webp' },
  { name: 'Jacob Jones', role: 'Marketing CEO', photoSrc: '/seed/orisa/shared/pages/img-20.webp' },
] as const

function getMediaSrc(resource: MediaType | string | null | undefined): string | undefined {
  if (!resource || typeof resource === 'string') return undefined
  return resource.url ?? undefined
}

function isPopulatedMedia(
  resource: MediaType | string | null | undefined,
): resource is MediaType {
  return Boolean(resource && typeof resource === 'object' && resource.url)
}

function ContactIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="shrink-0 text-neutral-950"
      aria-hidden
    >
      <path d="M20 40V20H0L20 0L40 20V40H20Z" fill="currentColor" />
      <path d="M0 20L20 40H0V20Z" fill="currentColor" />
    </svg>
  )
}

function TeamCardArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M7.85986 2.43872L1.7123 8.58629L0.702148 7.57614L6.84971 1.42857H1.43131V0H9.28843V7.85714H7.85986V2.43872Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TeamCard({
  photo,
  photoFallbackSrc,
  name,
  role,
  href,
}: {
  photo: OrisaMeetTeamBlock['members'] extends (infer M)[] | null | undefined ? M extends { photo?: infer P } ? P : never : never
  photoFallbackSrc: string
  name: string
  role: string
  href?: string | null
}) {
  const imageSrc = getMediaSrc(photo as MediaType) ?? photoFallbackSrc
  const profileHref = href ?? '#'

  return (
    <div className="team-card relative flex flex-col">
      <div className="team-card-image overflow-hidden rounded-xl bg-neutral-100">
        <div className="anim-zoomin-wrap overflow-hidden" data-meet-zoom-wrap>
          <div className="anim-zoomin">
            {isPopulatedMedia(photo as MediaType) ? (
              <Media
                resource={photo as MediaType}
                imgClassName="block w-full object-cover"
              />
            ) : (
              <img src={imageSrc} alt="" className="block w-full object-cover" />
            )}
          </div>
        </div>
      </div>

      <Link
        href={profileHref}
        className="team-card-icon absolute top-[22px] right-5 z-[2] flex size-[26px] items-center justify-center rounded-full bg-white text-neutral-950 transition-colors duration-300"
        aria-label={`View ${name}`}
      >
        <TeamCardArrow />
      </Link>

      <div className="team-card-content absolute inset-x-0 bottom-0 overflow-hidden rounded-xl bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent px-[30px] pt-16 pb-[33px] pe-20">
        <Link href={profileHref} className="team-card-name block">
          <h3 className="mb-0 text-xl leading-6 font-semibold tracking-[-0.02em] text-white">{name}</h3>
        </Link>
        <p className="team-card-position m-0 mt-1 text-sm tracking-[-0.02em] text-white">{role}</p>
      </div>
    </div>
  )
}

function LocationBlock({
  address,
  phone,
  email,
  className,
}: {
  address: string
  phone?: string | null
  email?: string | null
  className?: string
}) {
  const lines = address.split('\n').filter(Boolean)

  return (
    <div className={className}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
      {phone && (
        <span className="mt-2 block">
          Phone:{' '}
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-neutral-950 hover:underline">
            {phone}
          </a>
        </span>
      )}
      {email && (
        <span className="block">
          Email:{' '}
          <a href={`mailto:${email}`} className="text-neutral-950 hover:underline">
            {email}
          </a>
        </span>
      )}
    </div>
  )
}

export function OrisaMeetTeamClient({
  sectionId,
  eyebrow,
  eyebrowLink,
  headline,
  cta,
  contactTitle,
  locations,
  members,
  publicContext,
}: OrisaMeetTeamBlock & { publicContext: PublicContextProps }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useOrisaMeetTeamEffects(sectionRef, {
    enabled: !reducedMotion,
    reducedMotion,
  })

  const eyebrowLabel = eyebrow?.trim() || 'Meet our team'
  const eyebrowHref =
    resolveCmsLinkHref({
      type: eyebrowLink?.type ?? 'custom',
      url: eyebrowLink?.url ?? '/team',
      reference: eyebrowLink?.reference,
      section: eyebrowLink?.section,
      publicContext,
    }) ?? '/team'

  const ctaHref =
    resolveCmsLinkHref({
      type: cta?.type ?? 'custom',
      url: cta?.url ?? '/team',
      reference: cta?.reference,
      section: cta?.section,
      publicContext,
    }) ?? '/team'
  const ctaLabel = cta?.label?.trim() || 'Join our Team'

  const headlineText = headline ? extractPlainText(headline) : DEMO_HEADLINE
  const contactHeading = contactTitle?.trim() || 'We are here'

  const locationItems = (locations?.length ? locations : DEMO_LOCATIONS).slice(0, 2).map(
    (loc, index) => ({
      address: loc.address ?? DEMO_LOCATIONS[index]?.address ?? '',
      phone: loc.phone ?? DEMO_LOCATIONS[index]?.phone,
      email: loc.email ?? DEMO_LOCATIONS[index]?.email,
    }),
  )

  const teamMembers = (members?.length ? members : DEMO_MEMBERS).slice(0, 4).map((member, index) => {
    const fallback = DEMO_MEMBERS[index]
    const profileHref = member.profileLink
      ? resolveCmsLinkHref({
          type: member.profileLink.type,
          url: member.profileLink.url,
          reference: member.profileLink.reference,
          section: member.profileLink.section,
          publicContext,
        })
      : '/team'

    return {
      photo: member.photo,
      photoFallbackSrc: fallback?.photoSrc ?? DEMO_MEMBERS[0].photoSrc,
      name: member.name ?? fallback?.name ?? '',
      role: member.role ?? fallback?.role ?? '',
      href: profileHref,
    }
  })

  return (
    <section
      ref={sectionRef}
      id={sectionId || 'meet-our-team'}
      className="at-sec9-area-wrapper mx-auto max-w-[2200px]"
    >
      <div className="at-sec9-area mx-2 mt-10 rounded-[20px] border border-neutral-100 bg-white py-[130px] lg:mx-3">
        <div className="w-full px-4">
          <div className="grid gap-10 xl:grid-cols-12 xl:items-start">
            <div className="xl:col-span-7">
              <OrisaRotatingLink
                href={eyebrowHref}
                label={eyebrowLabel}
                className="mb-10 bg-transparent p-0 text-neutral-950 uppercase"
                newTab={eyebrowLink?.newTab}
              />

              {headline ? (
                <div data-meet-headline>
                  <RichText
                    content={headline}
                    publicContext={publicContext}
                    withWrapper={false}
                    overrideStyle={{
                      h2: 'reveal-text mb-0 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:text-[48px]',
                      h3: 'reveal-text mb-0 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:text-[48px]',
                      p: 'reveal-text mb-0 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:text-[48px]',
                    }}
                  />
                </div>
              ) : (
                <h2
                  data-meet-headline
                  className="reveal-text mb-0 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:text-[48px]"
                >
                  {headlineText}
                </h2>
              )}

              <div className="pt-[30px]">
                <OrisaBtnGroup href={ctaHref} label={ctaLabel} newTab={cta?.newTab} />
              </div>

              <div className="pt-[120px]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <ContactIcon />
                  <div>
                    <h3 className="mb-4 text-base font-semibold tracking-[-0.02em] text-neutral-950">
                      {contactHeading}
                    </h3>
                    <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                      {locationItems.map((loc, index) => (
                        <LocationBlock
                          key={`loc-${index}`}
                          address={loc.address}
                          phone={loc.phone}
                          email={loc.email}
                          className={`text-sm leading-relaxed tracking-[-0.02em] text-neutral-500 ${index === 1 ? 'md:border-s md:border-neutral-200 md:ps-10' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 xl:col-start-9">
              <div className="grid grid-cols-2 gap-2">
                {teamMembers.map((member, index) => (
                  <TeamCard
                    key={`${member.name}-${index}`}
                    photo={member.photo as never}
                    photoFallbackSrc={member.photoFallbackSrc}
                    name={member.name}
                    role={member.role}
                    href={member.href}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrisaMeetTeamClient
