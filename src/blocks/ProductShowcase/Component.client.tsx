'use client'

import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Text3DFlip from '@/components/ui/text-3d-flip'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ProductShowcaseBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

function ProductCard({
  product,
  publicContext,
  reducedMotion,
  index,
}: {
  product: NonNullable<ProductShowcaseBlock['products']>[number]
  publicContext: PublicContextProps
  reducedMotion: boolean
  index: number
}) {
  const hasAddToCart =
    product.addToCart && (product.addToCart.label || product.addToCart.url || product.addToCart.reference)
  const hasViewProduct =
    product.viewProduct &&
    (product.viewProduct.label || product.viewProduct.url || product.viewProduct.reference)

  return (
    <article
      className="group flex flex-col"
      data-scroll-stagger-item
      data-scroll-reveal="up"
      data-scroll-distance="48"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {product.image && typeof product.image === 'object' && (
        <div className="bg-muted relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl">
          <Media
            resource={product.image}
            fill
            imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {product.title &&
        (reducedMotion ? (
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {product.title}
          </h3>
        ) : (
          <Text3DFlip
            as="h3"
            className="font-display text-2xl font-semibold tracking-tight [perspective:800px] md:text-3xl"
            flipTextClassName="text-[#c41e3a]"
            rotateDirection="top"
            staggerDuration={0.025}
            textClassName="text-neutral-950"
          >
            {product.title}
          </Text3DFlip>
        ))}

      {product.tagline && (
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">{product.tagline}</p>
      )}

      <div className="mt-auto flex flex-col gap-3 pt-8">
        {product.price && (
          <p className="text-xl font-semibold tabular-nums">{product.price}</p>
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {hasAddToCart && (
            <CMSLink publicContext={publicContext} className="w-full sm:w-auto" {...product.addToCart} />
          )}
          {hasViewProduct && (
            <CMSLink
              publicContext={publicContext}
              appearance="outline"
              className="w-full sm:w-auto"
              {...product.viewProduct}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export function ProductShowcaseClient({
  sectionId,
  headline,
  intro,
  products,
  publicContext,
}: ProductShowcaseBlock & { publicContext: PublicContextProps }) {
  const reducedMotion = useReducedMotion()
  const items = products ?? []
  if (!items.length) return null

  return (
    <section className="bg-background py-20 md:py-28" id={sectionId || 'products'}>
      <div className="container">
        <div
          className="mx-auto mb-14 max-w-3xl text-center md:mb-20"
          data-scroll-reveal="up"
          data-scroll-distance="44"
        >
          {headline && (
            <RichText
              publicContext={publicContext}
              content={headline}
              withWrapper={false}
              overrideStyle={{
                h2: 'font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl',
                h3: 'font-display text-3xl font-medium tracking-tight md:text-4xl',
              }}
            />
          )}
          {intro && (
            <div className="mt-4">
              <RichText
                publicContext={publicContext}
                content={intro}
                withWrapper={false}
                overrideStyle={{
                  p: 'text-muted-foreground text-base md:text-lg',
                }}
              />
            </div>
          )}
        </div>

        <div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          data-scroll-stagger="up"
          data-scroll-distance="40"
          data-scroll-stagger-delay="0.1"
        >
          {items.map((product, index) => (
            <ProductCard
              key={product.id ?? `${product.title}-${index}`}
              index={index}
              product={product}
              publicContext={publicContext}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
