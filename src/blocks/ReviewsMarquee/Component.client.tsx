'use client'

import React, { useMemo } from 'react'

import { Marquee } from '@/components/ui/marquee'
import type { ReviewsMarqueeBlock } from '@/payload-types'

function ReviewCard({
  author,
  handle,
  quote,
}: {
  author: string
  handle?: string | null
  quote: string
}) {
  return (
    <article className="border-border bg-background w-[min(85vw,22rem)] shrink-0 rounded-2xl border p-6 shadow-sm md:w-[24rem]">
      <p className="text-base leading-relaxed md:text-lg">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 border-t border-neutral-200 pt-4">
        <p className="font-semibold">{author}</p>
        {handle && <p className="text-muted-foreground mt-1 text-sm">{handle}</p>}
      </div>
    </article>
  )
}

export function ReviewsMarqueeClient({ headline, reviews }: ReviewsMarqueeBlock) {
  const items = reviews ?? []
  const { rowOne, rowTwo } = useMemo(() => {
    const midpoint = Math.ceil(items.length / 2)
    return {
      rowOne: items.slice(0, midpoint),
      rowTwo: items.slice(midpoint),
    }
  }, [items])

  if (!items.length) return null

  return (
    <section className="overflow-hidden bg-neutral-950 py-20 text-white md:py-28">
      {headline && (
        <h2
          className="container mb-12 font-mono text-sm tracking-[0.3em] uppercase md:mb-16"
          data-scroll-reveal="up"
          data-scroll-distance="32"
        >
          {headline}
        </h2>
      )}

      <div className="space-y-6">
        <Marquee className="[--duration:50s] [--gap:1rem]" pauseOnHover repeat={2}>
          {rowOne.map((review, index) => (
            <ReviewCard
              key={review.id ?? `${review.author}-r1-${index}`}
              author={review.author}
              handle={review.handle}
              quote={review.quote}
            />
          ))}
        </Marquee>
        {rowTwo.length > 0 && (
          <Marquee
            reverse
            className="[--duration:58s] [--gap:1rem]"
            pauseOnHover
            repeat={2}
          >
            {rowTwo.map((review, index) => (
              <ReviewCard
                key={review.id ?? `${review.author}-r2-${index}`}
                author={review.author}
                handle={review.handle}
                quote={review.quote}
              />
            ))}
          </Marquee>
        )}
      </div>
    </section>
  )
}
