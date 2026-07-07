'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import type { FaqBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'

type GroupedFaq = {
  id: string
  category: string
  items: NonNullable<FaqBlock['faqs']>
}

const TOP_PADDING = 300

const Faq12: React.FC<FaqBlock & { publicContext: PublicContextProps }> = ({
  faqs,
  headline,
  publicContext,
}) => {
  const groupedFaqs = useMemo<GroupedFaq[]>(() => {
    const map = new Map<string, GroupedFaq>()

    ;(faqs || []).forEach((faq, index) => {
      const rawCategory = String((faq as any).category || '').trim()
      const key = rawCategory || `__group-${index}`

      if (!map.has(key)) {
        map.set(key, {
          id: key,
          category: rawCategory || String(faq.question || '').trim(),
          items: [],
        })
      }

      map.get(key)?.items.push(faq)
    })

    return Array.from(map.values()).filter((group) => group.items.length > 0)
  }, [faqs])

  const [activeCategory, setActiveCategory] = useState(groupedFaqs[0]?.id || '')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isScrollingRef = useRef(false)
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect()

    let debounceTimeout: ReturnType<typeof setTimeout>

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return

        if (debounceTimeout) {
          clearTimeout(debounceTimeout)
        }

        debounceTimeout = setTimeout(() => {
          const intersectingEntries = entries.filter((entry) => entry.isIntersecting)

          const entry = intersectingEntries.reduce(
            (closest, current) => {
              const distanceFromThreshold = Math.abs(current.boundingClientRect.top - TOP_PADDING)
              const closestDistance = closest
                ? Math.abs(closest.boundingClientRect.top - TOP_PADDING)
                : Infinity

              return distanceFromThreshold < closestDistance ? current : closest
            },
            null as IntersectionObserverEntry | null,
          )

          if (entry) {
            const id = entry.target.getAttribute('data-category-id')
            if (id) {
              setActiveCategory(id)
            }
          }
        }, 150)
      },
      {
        root: null,
        rootMargin: `-${TOP_PADDING}px 0px -100% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    groupedFaqs.forEach((group) => {
      const element = categoryRefs.current[group.id]
      if (element) {
        element.setAttribute('data-category-id', group.id)
        observerRef.current?.observe(element)
      }
    })

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }
    }
  }, [groupedFaqs])

  useEffect(() => {
    if (!groupedFaqs.length) return
    if (!activeCategory) {
      setActiveCategory(groupedFaqs[0].id)
    }
  }, [groupedFaqs, activeCategory])

  useEffect(() => {
    const cleanup = setupObserver()
    return () => {
      cleanup()
      observerRef.current?.disconnect()
    }
  }, [setupObserver])

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id)
    isScrollingRef.current = true

    const element = document.getElementById(`faq-${id}`)
    if (element) {
      element.style.scrollMargin = `${TOP_PADDING}px`
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })

      setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }
  }

  return (
    <section className="h-svh max-h-[1200px] min-h-[600px] bg-[#F2F2F2] py-32 dark:bg-[#24242B]">
      <div className="container max-w-4xl">
        <div className="text-center">
          {headline && (
            <RichText
              content={headline}
              publicContext={publicContext}
              withWrapper={false}
              overrideStyle={{
                h1: 'text-center text-4xl font-semibold tracking-tight sm:text-5xl',
                h2: 'text-center text-4xl font-semibold tracking-tight sm:text-5xl',
                p: 'mx-auto mt-4 max-w-xl text-center text-balance text-muted-foreground',
              }}
            />
          )}
        </div>

        <div className="mt-8 grid max-w-5xl gap-8 md:mt-12 md:grid-cols-[200px_1fr] md:gap-12 lg:mt-16">
          <div className="sticky top-24 flex h-fit flex-col gap-4 max-md:hidden">
            {groupedFaqs.map(({ id, category }) => (
              <Button
                variant="ghost"
                key={id}
                onClick={() => handleCategoryClick(id)}
                className={`justify-start text-left text-xl transition-colors ${
                  activeCategory === id ? 'font-semibold' : 'font-normal hover:opacity-75'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="space-y-6">
            {groupedFaqs.map(({ id, items }) => (
              <div
                key={id}
                id={`faq-${id}`}
                ref={(el) => {
                  categoryRefs.current[id] = el
                }}
                className={
                  activeCategory === id
                    ? 'bg-background rounded-xl px-6'
                    : 'bg-background md:bg-background/40 rounded-xl px-6'
                }
                style={{
                  scrollMargin: `${TOP_PADDING}px`,
                }}
              >
                <Accordion type="single" collapsible className="w-full" defaultValue={`${id}-0`}>
                  {items.map((item, i) => (
                    <AccordionItem
                      key={item.id || i}
                      value={`${id}-${i}`}
                      className="border-b border-muted last:border-0"
                    >
                      <AccordionTrigger className="text-base font-medium hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base font-medium text-muted-foreground">
                        {item.answer && (
                          <RichText
                            content={item.answer}
                            publicContext={publicContext}
                            withWrapper={false}
                            overrideStyle={{
                              p: 'mb-2 text-base text-muted-foreground',
                              li: 'text-base text-muted-foreground',
                            }}
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq12
