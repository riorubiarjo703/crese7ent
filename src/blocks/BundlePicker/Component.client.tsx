'use client'

import React, { useState } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { BundlePickerBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities'

export function BundlePickerClient({
  sectionId,
  headline,
  subheadline,
  packOptions,
  products,
  publicContext,
}: BundlePickerBlock & { publicContext: PublicContextProps }) {
  const packs = packOptions ?? []
  const items = products ?? []
  const [activePackIndex, setActivePackIndex] = useState(0)

  if (!packs.length || !items.length) return null

  return (
    <section className="bg-background py-20 md:py-28" id={sectionId || 'bundles'}>
      <div className="container">
        <div
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          data-scroll-reveal="up"
          data-scroll-distance="40"
        >
          <div>
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
            {subheadline && (
              <p className="text-muted-foreground mt-2 text-lg md:text-xl">{subheadline}</p>
            )}
          </div>

          <Tabs
            value={String(activePackIndex)}
            onValueChange={(value) => setActivePackIndex(Number(value))}
          >
            <TabsList className="h-auto rounded-full bg-neutral-100 p-1">
              {packs.map((pack, index) => (
                <TabsTrigger
                  key={pack.id ?? `${pack.label}-${index}`}
                  className="rounded-full px-5 py-2 text-sm data-[state=active]:bg-neutral-950 data-[state=active]:text-white"
                  value={String(index)}
                >
                  {pack.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-scroll-stagger="up" data-scroll-distance="36">
          {items.map((product, index) => {
            const price = product.prices?.[activePackIndex]?.amount
            const hasAddToCart =
              product.addToCart &&
              (product.addToCart.label || product.addToCart.url || product.addToCart.reference)
            const hasBuyNow =
              product.buyNow &&
              (product.buyNow.label || product.buyNow.url || product.buyNow.reference)

            return (
              <article
                className="border-border flex flex-col rounded-2xl border bg-[#faf7f2] p-6"
                data-scroll-stagger-item
                key={product.id ?? `${product.name}-${index}`}
              >
                {product.image && typeof product.image === 'object' && (
                  <div className="bg-muted relative mb-5 aspect-square overflow-hidden rounded-xl">
                    <Media
                      resource={product.image}
                      fill
                      imgClassName="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                {price && (
                  <p className="mt-2 text-2xl font-semibold tabular-nums">{price}</p>
                )}
                <div className="mt-auto flex flex-col gap-2 pt-6">
                  {hasAddToCart && (
                    <CMSLink publicContext={publicContext} className="w-full" {...product.addToCart} />
                  )}
                  {hasBuyNow && (
                    <CMSLink
                      publicContext={publicContext}
                      appearance="outline"
                      className={cn('w-full', !hasAddToCart && '')}
                      {...product.buyNow}
                    />
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
