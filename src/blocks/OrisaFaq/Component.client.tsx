'use client'

import { Minus, Plus } from 'lucide-react'
import { useRef } from 'react'

import FaqStructuredData from '@/blocks/Faq/FaqStructuredData'
import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { Media } from '@/components/Media'
import { OrisaBtnGroup } from '@/components/orisa/OrisaBtnGroup'
import { OrisaRotatingLink } from '@/components/orisa/OrisaRotatingLink'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'
import { useOrisaFaqEffects } from '@/hooks/useOrisaFaqEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Media as MediaType, OrisaFaqBlock } from '@/payload-types'
import { extractPlainText } from '@/utilities/richtext'
import type { PublicContextProps } from '@/utilities/publicContextProps'

const DEMO_HEADLINE =
  'Answered questions. Everything you might want to know—up front.'

const DEMO_FAQS = [
  {
    question: 'How does your design process work?',
    answer:
      'Our process includes discovery, strategy, design, feedback, and delivery — ensuring clarity, collaboration, and results at every stage.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines vary by scope, but most projects take between 2–6 weeks — with clear milestones to keep everything on track.',
  },
  {
    question: 'Do you work with startups or only established brands?',
    answer:
      'We work with both startups and established brands — tailoring our approach to fit each stage of growth.',
  },
  {
    question: 'Can you handle custom or complex requests?',
    answer:
      'Yes — we specialize in custom and complex projects, creating flexible solutions to meet unique needs.',
  },
] as const

const SUPPORT_IMAGE_FALLBACK = '/seed/orisa/creative/pages/img-21.webp'

function isPopulatedMedia(
  resource: MediaType | string | null | undefined,
): resource is MediaType {
  return Boolean(resource && typeof resource === 'object' && resource.url)
}

function FaqToggleIcons() {
  return (
    <span className="relative ml-auto flex h-9 w-9 shrink-0 items-center justify-center text-neutral-950">
      <Minus
        aria-hidden
        className="faq-minus absolute h-4 w-4 opacity-0 transition-opacity group-data-[state=open]:opacity-100"
      />
      <Plus
        aria-hidden
        className="faq-plus absolute h-4 w-4 opacity-0 transition-opacity group-data-[state=closed]:opacity-100"
      />
    </span>
  )
}

export function OrisaFaqClient({
  sectionId,
  supportImage,
  supportTitle,
  supportDescription,
  supportCta,
  eyebrow,
  eyebrowLink,
  headline,
  faqs,
  publicContext,
}: OrisaFaqBlock & { publicContext: PublicContextProps }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useOrisaFaqEffects(sectionRef, {
    enabled: !reducedMotion,
    reducedMotion,
  })

  const supportCtaHref =
    resolveCmsLinkHref({
      type: supportCta?.type ?? 'custom',
      url: supportCta?.url ?? '/contact',
      reference: supportCta?.reference,
      section: supportCta?.section,
      publicContext,
    }) ?? '/contact'
  const supportCtaLabel = supportCta?.label?.trim() || 'Support Center'

  const eyebrowLabel = eyebrow?.trim() || 'FAQ'
  const eyebrowHref =
    resolveCmsLinkHref({
      type: eyebrowLink?.type ?? 'custom',
      url: eyebrowLink?.url ?? '/faqs',
      reference: eyebrowLink?.reference,
      section: eyebrowLink?.section,
      publicContext,
    }) ?? '/faqs'

  const supportHeading = supportTitle?.trim() || 'Still no luck? We can help!'
  const supportText = supportDescription?.trim() || 'Let us Know how we can assist'
  const headlineText = headline ? extractPlainText(headline) : DEMO_HEADLINE

  const faqItems = (faqs?.length ? faqs : DEMO_FAQS).map((item, index) => ({
    id: 'id' in item && item.id ? item.id : `faq-${index}`,
    question: item.question ?? DEMO_FAQS[index]?.question ?? '',
    answer: item.answer,
    answerFallback: DEMO_FAQS[index]?.answer ?? '',
  }))

  return (
    <section
      ref={sectionRef}
      id={sectionId || 'faq'}
      className="alt-faq-area bg-white pt-[145px] pb-20"
    >
      <FaqStructuredData faqs={faqs} />
      <div className="w-full px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="mb-10">
              <div
                data-faq-zoom-wrap
                className="overflow-hidden rounded-2xl"
              >
                {isPopulatedMedia(supportImage) ? (
                  <Media
                    resource={supportImage}
                    className="anim-zoomin w-full"
                    imgClassName="h-auto w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={SUPPORT_IMAGE_FALLBACK}
                    alt=""
                    className="anim-zoomin h-auto w-full object-cover"
                  />
                )}
              </div>

              <h3 className="mb-4 pt-12 text-lg font-semibold tracking-[-0.04em] text-neutral-950">
                {supportHeading}
              </h3>
              <p className="mb-9 text-[22px] leading-[1.2] font-medium tracking-[-0.04em] text-neutral-700">
                {supportText}
              </p>

              <OrisaBtnGroup
                href={supportCtaHref}
                label={supportCtaLabel}
                newTab={supportCta?.newTab}
              />
            </div>
          </div>

          <div className="lg:col-span-7 xl:pl-24">
            <div className="at-faq">
              <OrisaRotatingLink
                href={eyebrowHref}
                label={eyebrowLabel}
                className="mb-2.5 bg-transparent p-0 text-neutral-950 uppercase"
                newTab={eyebrowLink?.newTab}
              />

              {headline ? (
                <div data-faq-headline>
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
                  data-faq-headline
                  className="reveal-text mb-0 text-[32px] leading-[1.1] font-semibold tracking-[-0.05em] text-neutral-950 md:text-[42px] lg:text-[48px]"
                >
                  {headlineText}
                </h2>
              )}

              <Accordion
                type="single"
                collapsible
                defaultValue={faqItems[0] ? `item-${faqItems[0].id}` : undefined}
                className="pt-20"
              >
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    value={`item-${item.id}`}
                    data-faq-item
                    className="mb-4 rounded-2xl border-0 bg-neutral-50 px-[30px] py-2.5 shadow-[0_0_2px_0_rgba(39,39,46,0.04)]"
                  >
                    <div className="flex items-start gap-2 py-[15px]">
                      <div className="box-number shrink-0 pt-0.5">
                        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-neutral-950 text-base font-semibold text-white">
                          {index + 1}
                        </span>
                      </div>
                      <AccordionTrigger className="group flex flex-1 items-start justify-between gap-4 py-0 text-left text-[18px] leading-[1.3] font-semibold tracking-[-0.04em] text-neutral-950 hover:no-underline md:text-2xl [&>svg]:hidden">
                        <span className="pr-4">{item.question}</span>
                        <FaqToggleIcons />
                      </AccordionTrigger>
                    </div>
                    <AccordionContent className="pb-3.5 pl-[45px] text-[15px] leading-[1.67] text-neutral-700 md:pr-28">
                      {item.answer ? (
                        <RichText
                          content={item.answer}
                          publicContext={publicContext}
                          withWrapper={false}
                          overrideStyle={{ p: 'mb-0 font-normal text-[15px] leading-[1.67] text-neutral-700' }}
                        />
                      ) : (
                        <p className="mb-0 font-normal text-[15px] leading-[1.67] text-neutral-700">
                          {item.answerFallback}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrisaFaqClient
