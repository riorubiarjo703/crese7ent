'use client'

import React from 'react'

import { Marquee } from '@/components/ui/marquee'
import type { IngredientStripBlock } from '@/payload-types'

function BadgeCard({
  label,
  description,
}: {
  label: string
  description?: string | null
}) {
  return (
    <article className="border-border bg-background w-[min(80vw,18rem)] shrink-0 rounded-2xl border p-6 shadow-sm md:w-[20rem]">
      <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{label}</h3>
      {description && (
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">
          {description}
        </p>
      )}
    </article>
  )
}

export function IngredientStripClient({ badges }: IngredientStripBlock) {
  const items = badges ?? []
  if (!items.length) return null

  return (
    <section className="overflow-hidden border-y border-neutral-200 bg-[#faf7f2] py-10 md:py-14">
      <Marquee className="[--duration:45s] [--gap:1rem]" pauseOnHover repeat={2}>
        {items.map((badge, index) => (
          <BadgeCard
            key={badge.id ?? `${badge.label}-${index}`}
            description={badge.description}
            label={badge.label}
          />
        ))}
      </Marquee>
    </section>
  )
}
