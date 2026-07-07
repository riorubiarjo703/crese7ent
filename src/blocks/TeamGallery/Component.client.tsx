'use client'

import React, { useRef } from 'react'

import { LinkedInIcon } from '@/components/SocialIcon/LinkedInIcon'

import { Media } from '@/components/Media'
import { SectionReveal } from '@/components/motion/SectionReveal'
import RichText from '@/components/RichText'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useHorizontalScrollScrub } from '@/hooks/useHorizontalScrollScrub'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { TeamGalleryBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities'

function MemberCard({
  member,
  className,
}: {
  member: NonNullable<TeamGalleryBlock['members']>[number]
  className?: string
}) {
  if (!member.photo || typeof member.photo !== 'object') return null

  return (
    <article
      className={cn(
        'group relative aspect-[3/4] w-[17rem] shrink-0 overflow-hidden rounded-lg sm:w-[18rem] md:w-[20rem]',
        className,
      )}
    >
      <div className="absolute inset-0">
        <Media
          resource={member.photo}
          fill
          className="size-full"
          imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-5 text-white">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-sm text-white/80">{member.role}</p>
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/80 underline-offset-2 transition-colors hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
          >
            <LinkedInIcon className="size-3.5 shrink-0" aria-hidden />
            LinkedIn
          </a>
        )}
      </div>
    </article>
  )
}

export function TeamGalleryClient({
  headline,
  subheadline,
  layout = 'drag',
  members,
  publicContext,
}: TeamGalleryBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useHorizontalScrollScrub({
    enabled: layout === 'drag' && !reducedMotion,
    sectionRef,
    trackRef,
  })

  if (!members?.length) return null

  return (
    <SectionReveal>
      <section ref={sectionRef}>
        <div className="container py-24 md:py-32">
          <div className="mb-12 max-w-2xl" data-scroll-reveal="up" data-scroll-distance="44">
            {headline && (
              <RichText
                publicContext={publicContext}
                content={headline}
                withWrapper={false}
                overrideStyle={{
                  h2: 'text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl',
                  h3: 'text-2xl font-semibold tracking-tight md:text-3xl',
                }}
              />
            )}
            {subheadline && (
              <div className="mt-4">
                <RichText
                  publicContext={publicContext}
                  content={subheadline}
                  withWrapper={false}
                  overrideStyle={{
                    p: 'text-muted-foreground text-base leading-relaxed md:text-lg',
                  }}
                />
              </div>
            )}
          </div>

          {layout === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member, index) => (
                <MemberCard
                  key={member.id ?? `${member.name}-${index}`}
                  className="w-full"
                  member={member}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>

        {layout !== 'grid' && (
          <>
            <div className="hidden overflow-hidden pb-24 md:block md:pb-32">
              <div
                className="flex gap-6 px-6 will-change-transform md:px-10 lg:px-16"
                ref={trackRef}
              >
                {members.map((member, index) => (
                  <MemberCard key={member.id ?? `${member.name}-${index}`} member={member} />
                ))}
              </div>
            </div>
            <div className="container pb-24 md:hidden">
              <Carousel opts={{ align: 'start', dragFree: true }}>
                <CarouselContent className="-ml-4">
                  {members.map((member, index) => (
                    <CarouselItem
                      key={member.id ?? `${member.name}-${index}`}
                      className="basis-[70%] pl-4 sm:basis-[45%]"
                    >
                      <MemberCard className="w-full" member={member} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </>
        )}
      </section>
    </SectionReveal>
  )
}
