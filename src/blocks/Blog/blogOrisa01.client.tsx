'use client'

import Link from 'next/link'
import { useMemo, useRef } from 'react'

import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { Media } from '@/components/Media'
import { OrisaHoverArrow } from '@/components/orisa/OrisaHoverArrow'
import { OrisaHoverRotate } from '@/components/orisa/OrisaHoverRotate'
import { OrisaRotatingLink } from '@/components/orisa/OrisaRotatingLink'
import { useOrisaBlogEffects } from '@/hooks/useOrisaBlogEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { BlogBlock, Media as MediaType, Post } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'

interface BlogOrisa01Props extends BlogBlock {
  publicContext: PublicContextProps
  posts?: Post[]
}

interface BlogCardItem {
  id: string
  slug: string
  title: string
  author: string
  date: string
  image?: MediaType | string | null
  imageFallbackSrc: string
}

const DEMO_HEADLINE_LINES = ['Latest Posts From Our', 'blog and Event Fan page'] as const

const DEMO_POSTS: BlogCardItem[] = [
  {
    id: 'demo-1',
    slug: 'designing-digital-experiences',
    title: 'Designing Digital Experiences That Connect Brands and People',
    author: 'Olivia',
    date: 'July 3, 2026',
    imageFallbackSrc: '/seed/orisa/creative/pages/img-23.webp',
  },
  {
    id: 'demo-2',
    slug: 'from-concept-to-launch',
    title: 'From Concept to Launch: Building Products That Truly Matter',
    author: 'Daniel',
    date: 'July 8, 2026',
    imageFallbackSrc: '/seed/orisa/creative/pages/img-24.webp',
  },
  {
    id: 'demo-3',
    slug: 'strong-visual-identity',
    title: 'Why Strong Visual Identity Is the Foundation of Modern Brands',
    author: 'Emma',
    date: 'July 12, 2026',
    imageFallbackSrc: '/seed/orisa/creative/pages/img-25.webp',
  },
  {
    id: 'demo-4',
    slug: 'impactful-interfaces',
    title: 'Creating Impactful Interfaces Through Thoughtful Design Systems',
    author: 'Lucas',
    date: 'July 17, 2026',
    imageFallbackSrc: '/seed/orisa/creative/pages/img-26.webp',
  },
]

function formatPostDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function isPopulatedMedia(
  resource: MediaType | string | null | undefined,
): resource is MediaType {
  return Boolean(resource && typeof resource === 'object' && resource.url)
}

function OrisaArchiveButton({
  href,
  label,
  newTab,
}: {
  href: string
  label: string
  newTab?: boolean | null
}) {
  const newTabProps = newTab ? { rel: 'noopener noreferrer' as const, target: '_blank' as const } : {}

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-4 text-base font-semibold tracking-[-0.05em] text-white uppercase"
      {...newTabProps}
    >
      <OrisaHoverRotate>{label}</OrisaHoverRotate>
      <OrisaHoverArrow className="text-white" />
    </Link>
  )
}

function BlogCard({ post }: { post: BlogCardItem }) {
  const postHref = `/posts/${post.slug}`

  return (
    <article data-blog-card className="blog-card mb-8 flex flex-col gap-6">
      <div className="blog-card__thumb hover-effect-1 relative w-full overflow-hidden">
        <Link href={postHref} className="blog-card__img-link block h-full w-full">
          {isPopulatedMedia(post.image) ? (
            <Media
              resource={post.image}
              className="w-full"
              imgClassName="blog-card__img22 h-auto w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.imageFallbackSrc}
              alt=""
              className="blog-card__img22 h-auto w-full object-cover"
            />
          )}
        </Link>
      </div>

      <div className="blog-card__content flex w-full flex-col gap-6">
        <h2 className="blog-card__title m-0 line-clamp-3 text-lg font-semibold text-neutral-950">
          <Link href={postHref} className="blog-card__title-link transition-colors hover:text-orange-500">
            {post.title}
          </Link>
        </h2>

        <p className="blog-card__meta m-0 text-base leading-none font-medium text-[#585959]">
          <span className="blog-card__meta-text">By </span>
          <Link href="/team" className="blog-card__author text-neutral-950 transition-colors hover:text-orange-500">
            {post.author}
          </Link>
          <span className="blog-card__meta-text"> – {post.date}</span>
        </p>
      </div>
    </article>
  )
}

export function BlogOrisa01Client({
  eyebrow,
  eyebrowLink,
  headlineLines,
  links,
  posts,
  publicContext,
}: BlogOrisa01Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useOrisaBlogEffects(sectionRef, {
    enabled: !reducedMotion,
    reducedMotion,
  })

  const eyebrowLabel = eyebrow?.trim() || 'INSIDE COMPANY'
  const eyebrowHref =
    resolveCmsLinkHref({
      type: eyebrowLink?.type ?? 'custom',
      url: eyebrowLink?.url ?? '/posts',
      reference: eyebrowLink?.reference,
      section: eyebrowLink?.section,
      publicContext,
    }) ?? '/posts'

  const archiveLink = links?.[0]?.link
  const archiveHref =
    resolveCmsLinkHref({
      type: archiveLink?.type ?? 'custom',
      url: archiveLink?.url ?? '/posts',
      reference: archiveLink?.reference,
      section: archiveLink?.section,
      publicContext,
    }) ?? '/posts'
  const archiveLabel = archiveLink?.label?.trim() || 'ALL ARTICLES'

  const headlineLineItems = (headlineLines?.length
    ? headlineLines.map((entry) => entry.line?.trim()).filter(Boolean)
    : [...DEMO_HEADLINE_LINES]) as string[]

  const cardItems = useMemo<BlogCardItem[]>(() => {
    if (posts?.length) {
      return posts.slice(0, 4).map((post, index) => {
        const fallback = DEMO_POSTS[index] ?? DEMO_POSTS[0]
        const image =
          (typeof post.bannerImage === 'object' ? post.bannerImage : null) ??
          (typeof post.meta?.image === 'object' ? post.meta.image : null)

        return {
          id: post.id,
          slug: post.slug ?? fallback.slug,
          title: post.title,
          author: post.populatedAuthors?.[0]?.name ?? fallback.author,
          date: formatPostDate(post.publishedAt || post.createdAt) || fallback.date,
          image,
          imageFallbackSrc: fallback.imageFallbackSrc,
        }
      })
    }

    return DEMO_POSTS
  }, [posts])

  return (
    <section ref={sectionRef} className="at-sec13-thumb relative w-full bg-white py-[120px]">
      <div className="mx-auto w-full max-w-[1750px] px-4">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-6">
            <OrisaRotatingLink
              href={eyebrowHref}
              label={eyebrowLabel}
              className="mb-2.5 bg-transparent p-0 text-neutral-950 uppercase"
              newTab={eyebrowLink?.newTab}
            />

            <h2
              data-blog-headline
              className="reveal-text mb-0 text-[40px] leading-none font-bold tracking-[-0.05em] text-neutral-950 md:text-[48px] lg:text-[56px]"
            >
              {headlineLineItems.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-3 lg:col-start-10 lg:text-end xl:col-span-2 xl:col-start-11">
            <div className="pt-8 lg:pt-[30px]">
              <OrisaArchiveButton
                href={archiveHref}
                label={archiveLabel}
                newTab={archiveLink?.newTab}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {cardItems.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogOrisa01Client
