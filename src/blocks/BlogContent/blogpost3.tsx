'use client'

import { useEffect, useState } from 'react'

import { DateFormatter } from '@/components/DateFormatter'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Post } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities'
import { getAuthorObject } from '@/utilities/authorUtils'
import { getSideMenuStructure } from '@/utilities/richtext'

const Blogpost3Content: React.FC<Post & { publicContext: PublicContextProps }> = (props) => {
  const { title, content, bannerImage, authors, publishedAt, publicContext } = props

  const author = getAuthorObject(authors?.[0])
  const authorInitial = author?.name?.trim()?.charAt(0)?.toUpperCase()
  const sideMenuStructure = content
    ? getSideMenuStructure(content, { headlineLevels: ['h2', 'h3'] })
    : []

  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    if (sideMenuStructure.length === 0) return

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    let observer: IntersectionObserver | null = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    })

    sideMenuStructure.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer?.observe(element)
      }
    })

    return () => {
      observer?.disconnect()
      observer = null
    }
  }, [sideMenuStructure])

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
          <h1 className="text-center text-3xl font-medium text-pretty lg:text-5xl">{title}</h1>
          {(author || publishedAt) && (
            <div className="mt-4 flex items-center gap-4">
              {author && (
                <Avatar className="size-12 border">
                  <AvatarFallback>{authorInitial}</AvatarFallback>
                </Avatar>
              )}
              <div>
                {author?.name && <p className="text-sm font-medium">{author.name}</p>}
                {publishedAt && (
                  <p className="text-muted-foreground text-sm">
                    <DateFormatter date={publishedAt} locale={publicContext?.locale} />
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {bannerImage && typeof bannerImage !== 'string' && (
          <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-lg border p-2">
            <div className="relative aspect-video w-full">
              <Media
                resource={bannerImage}
                alt={bannerImage.alt || title || 'Blog banner image'}
                imgClassName="rounded-lg object-cover"
              />
            </div>
          </div>
        )}

        <div className="relative mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-4">
          <div className="sticky top-8 hidden h-fit lg:block">
            <nav className="mt-2">
              <ul className="space-y-2">
                {sideMenuStructure.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        'block py-1 transition-colors duration-200',
                        activeSection === item.id
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-primary',
                      )}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-2">
            {content && (
              <div className="prose max-w-none">
                <RichText content={content} publicContext={publicContext} withWrapper={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Blogpost3Content }
