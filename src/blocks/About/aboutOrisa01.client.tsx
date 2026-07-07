'use client'

import { useRef } from 'react'

import { Media } from '@/components/Media'
import { OrisaRotatingLink } from '@/components/orisa/OrisaRotatingLink'
import RichText from '@/components/RichText'
import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { useOrisaAboutEffects } from '@/hooks/useOrisaAboutEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { AboutBlock, Media as MediaType } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

function getRichTextPlainText(content: AboutBlock['headline'] | null | undefined): string {
  if (!content?.root?.children?.length) return ''

  const parts: string[] = []

  for (const node of content.root.children) {
    if (!('children' in node) || !Array.isArray(node.children)) continue

    for (const child of node.children) {
      if (child.type === 'text' && 'text' in child && typeof child.text === 'string') {
        parts.push(child.text)
      }
    }
  }

  return parts.join('').trim()
}

function OrisaDiamondIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className="fill-primary mb-2.5 -translate-y-0.5"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40 20V0H20H0V20V40H20L40 20ZM40 20H20V40L0 20L20 0L40 20Z"
      />
    </svg>
  )
}

function OrisaAboutDecor({ decorRef }: { decorRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={decorRef} className="relative -translate-y-[100px]" aria-hidden>
      <svg
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
        className="absolute top-[34px] left-14"
        xmlns="http://www.w3.org/2000/svg"
        width="57"
        height="91"
        viewBox="0 0 57 91"
        fill="none"
      >
        <path
          opacity="0.2"
          d="M56.4009 0L8.7738e-05 33.5367V90.2413L56.4009 56.4008V0Z"
          fill="#515151"
        />
      </svg>
    </div>
  )
}

function OrisaAboutThumb({
  resource,
  zoomRef,
  parallaxRef,
  thumbRef,
  grayscale = false,
}: {
  resource: MediaType
  thumbRef?: React.RefObject<HTMLDivElement | null>
  zoomRef?: React.RefObject<HTMLDivElement | null>
  parallaxRef?: React.RefObject<HTMLDivElement | null>
  grayscale?: boolean
}) {
  return (
    <div ref={thumbRef} className="h-[410px] overflow-hidden rounded-2xl">
      <div ref={zoomRef} className="size-full will-change-transform">
        <div ref={parallaxRef} className="will-change-transform">
          <Media
            resource={resource}
            imgClassName={[
              '-mt-[50px] h-[600px] w-full rounded-2xl object-cover',
              grayscale ? 'grayscale' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        </div>
      </div>
    </div>
  )
}

const aboutTitleStyles = {
  h2: 'orisa-about-char-title mb-2.5 text-[28px] font-semibold tracking-[-0.05em] text-neutral-950',
  h3: 'orisa-about-char-title mb-2.5 text-[28px] font-semibold tracking-[-0.05em] text-neutral-950',
  h4: 'orisa-about-char-title mb-2.5 text-[28px] font-semibold tracking-[-0.05em] text-neutral-950',
  p: 'text-base leading-[1.62] tracking-[-0.05em] text-neutral-950',
}

export function AboutOrisa01Client({
  headline,
  text1,
  text2,
  text3,
  counter,
  images,
  link,
  logos,
  publicContext,
}: AboutBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLSpanElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const avatarsRef = useRef<HTMLDivElement>(null)
  const teamCountRef = useRef<HTMLSpanElement>(null)
  const centerThumbRef = useRef<HTMLDivElement>(null)
  const centerZoomRef = useRef<HTMLDivElement>(null)
  const centerParallaxRef = useRef<HTMLDivElement>(null)
  const centerTextRef = useRef<HTMLDivElement>(null)
  const rightThumbRef = useRef<HTMLDivElement>(null)
  const rightZoomRef = useRef<HTMLDivElement>(null)
  const rightParallaxRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  const ctaHref = link
    ? resolveCmsLinkHref({
        type: link.type,
        url: link.url,
        reference: link.reference,
        section: link.section,
        publicContext,
      })
    : null

  const teamCount = counter?.[0]?.value
  const avatars = Array.isArray(logos)
    ? logos.filter((item): item is MediaType => typeof item === 'object')
    : []

  const imageOne = typeof images?.[0] === 'object' ? images[0] : undefined
  const imageTwo = typeof images?.[1] === 'object' ? images[1] : undefined

  useOrisaAboutEffects({
    enabled: !reducedMotion,
    teamCountValue: teamCount ?? null,
    sectionRef,
    eyebrowRef,
    headlineRef,
    ctaRef,
    leftColRef,
    logoRef,
    taglineRef,
    avatarsRef,
    teamCountRef,
    decorRef,
    centerThumbRef,
    centerZoomRef,
    centerParallaxRef,
    centerTextRef,
    rightThumbRef,
    rightZoomRef,
    rightParallaxRef,
    rightTextRef,
  })

  return (
    <section
      ref={sectionRef}
      className="bg-white pt-[100px] pb-20 text-neutral-950 dark:bg-white dark:text-neutral-950"
    >
      <div className="w-full px-4">
        <div className="row align-items-end flex flex-wrap">
          <div className="max-w-[66.66666667%]">
            <div className="mb-30">
              <div ref={eyebrowRef}>
                <OrisaRotatingLink
                  href="/about"
                  label="About Us"
                  className="mb-2.5 border-0 bg-transparent p-0 text-base font-semibold tracking-[-0.05em] text-neutral-950 uppercase"
                />
              </div>

              {(headline || (ctaHref && link?.label)) && (
                <h3
                  className="mb-0 text-[35px] leading-[1.21] font-semibold tracking-[-0.03em] tracking-tighter sm:text-[42px] lg:text-[64px]"
                  style={{ letterSpacing: '-10%' }}
                >
                  {headline && <span ref={headlineRef}>{getRichTextPlainText(headline)}</span>}
                  {ctaHref && link?.label && (
                    <span
                      ref={ctaRef}
                      className="ms-5 inline-block -translate-y-2.5 align-middle max-[575px]:ms-0 max-[575px]:mt-4 max-[575px]:block max-[575px]:w-full max-[575px]:translate-y-0"
                    >
                      <OrisaRotatingLink
                        href={ctaHref}
                        label={link.label}
                        newTab={link.newTab}
                        className="rounded-full bg-neutral-950 px-[25px] py-[17px] text-base font-semibold tracking-[-0.05em] text-white uppercase hover:bg-neutral-800 max-[575px]:w-full max-[575px]:justify-center"
                      />
                    </span>
                  )}
                </h3>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-neutral-200 pt-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-6">
            <div ref={leftColRef} className="mb-8 lg:col-span-3 lg:mb-0">
              <div className="mb-8 max-w-sm">
                {text1 && (
                  <div
                    ref={taglineRef}
                    className="text-base leading-5 font-medium tracking-[-0.02em] text-neutral-950"
                  >
                    <div ref={logoRef}>
                      <OrisaDiamondIcon />
                    </div>
                    <RichText
                      publicContext={publicContext}
                      content={text1}
                      withWrapper={false}
                      overrideStyle={{
                        p: 'text-base leading-5 font-medium tracking-[-0.02em] text-neutral-950 [&_strong]:font-bold',
                      }}
                    />
                  </div>
                )}
              </div>

              {(avatars.length > 0 || teamCount) && (
                <div ref={avatarsRef} className="flex items-center gap-3">
                  {avatars.length > 0 && (
                    <div className="relative flex items-center">
                      {avatars.map((avatar, index) => (
                        <div
                          key={avatar.id}
                          data-orisa-about-avatar
                          className="relative -ms-2.5 size-11 overflow-hidden rounded-full border-2 border-white first:ms-0"
                          style={{ zIndex: index + 2 }}
                        >
                          <Media resource={avatar} imgClassName="size-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  {teamCount && (
                    <span
                      ref={teamCountRef}
                      className="text-base font-semibold tracking-tight whitespace-nowrap md:text-lg"
                    >
                      {teamCount}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="hidden self-end justify-self-end lg:col-span-1 lg:flex">
              <OrisaAboutDecor decorRef={decorRef} />
            </div>

            <div className="lg:col-span-8 lg:ms-auto">
              <div className="lg:ms-[75px]">
                <div className="grid gap-10 md:grid-cols-2 md:gap-x-20">
                  <div>
                    {imageOne && (
                      <div className="mb-9">
                        <OrisaAboutThumb
                          resource={imageOne}
                          thumbRef={centerThumbRef}
                          zoomRef={centerZoomRef}
                          parallaxRef={centerParallaxRef}
                        />
                      </div>
                    )}
                    {text2 && (
                      <div ref={centerTextRef}>
                        <RichText
                          publicContext={publicContext}
                          content={text2}
                          withWrapper={false}
                          overrideStyle={aboutTitleStyles}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-8">
                    {text3 && (
                      <div ref={rightTextRef} className="order-2 md:order-1">
                        <RichText
                          publicContext={publicContext}
                          content={text3}
                          withWrapper={false}
                          overrideStyle={aboutTitleStyles}
                        />
                      </div>
                    )}
                    {imageTwo && (
                      <div className="order-1 md:order-2">
                        <OrisaAboutThumb
                          resource={imageTwo}
                          thumbRef={rightThumbRef}
                          zoomRef={rightZoomRef}
                          parallaxRef={rightParallaxRef}
                          grayscale
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
