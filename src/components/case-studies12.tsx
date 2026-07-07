import { ArrowRight } from 'lucide-react'

import { cn } from '@/utilities/index'

interface CaseStudiesCarouselItem {
  id: string
  logo: string
  logoAlt?: string
  title: string
  description: string
  href: string
  image: string
}

interface CaseStudiesCarouselProps {
  title: string
  description: string
  items: CaseStudiesCarouselItem[]
  className?: string
}

interface CaseStudies12Props extends CaseStudiesCarouselProps {}
type Props = Partial<CaseStudies12Props>

const defaultProps: CaseStudies12Props = {
  title: 'Case studies',
  description:
    'A horizontal carousel of customer stories with full-bleed imagery, company logos, short summaries, and links to read the full write-up.',
  items: [
    {
      id: 'pipeline-analytics',
      logo: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-1.svg',
      logoAlt: 'Northwind Analytics',
      title: 'Unified pipeline analytics in a single view',
      description:
        'How a revenue team unified CRM data and product telemetry to shorten sales cycles and make forecasting review meetings less painful.',
      href: '#',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-1-3x4.jpg',
    },
    {
      id: 'launch-readiness',
      logo: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-2.svg',
      logoAlt: 'Stacklane',
      title: 'Coordinating a multi-team product launch',
      description:
        'Design, engineering, and go-to-market aligned on one timeline with shared blocks and checklists so launch week stayed predictable.',
      href: '#',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-2-3x4.jpg',
    },
    {
      id: 'customer-success',
      logo: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-3.svg',
      logoAlt: 'Railway Apps',
      title: 'Scaling onboarding without growing headcount',
      description:
        'Automated nudges and in-app guidance replaced one-off emails while support kept a clear view of who needed a human touch.',
      href: '#',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-3-3x4.jpg',
    },
    {
      id: 'security-review',
      logo: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-4.svg',
      logoAlt: 'CipherTrust',
      title: 'Passing enterprise security review faster',
      description:
        'The team turned a checklist-heavy review into a tracked workflow so legal and IT could sign off without thrashing the roadmap.',
      href: '#',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-4-3x4.jpg',
    },
    {
      id: 'design-system',
      logo: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-5.svg',
      logoAlt: 'Glyph Studio',
      title: 'One design system across marketing and product',
      description:
        'Shared tokens and documented sections cut duplicate UI work and made brand updates roll out consistently across surfaces.',
      href: '#',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-5-3x4.jpg',
    },
    {
      id: 'revenue-ops',
      logo: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-6.svg',
      logoAlt: 'Cedarline',
      title: 'Revenue ops that fits how teams actually work',
      description:
        'Forecasting and pipeline hygiene moved out of spreadsheets into one place so leadership could see risk early without extra ceremony.',
      href: '#',
      image:
        'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-6-3x4.jpg',
    },
  ],
}

const MAX_ITEMS = 4

const CaseStudies12 = (props: Props) => {
  const { title, description, items, className } = {
    ...defaultProps,
    ...props,
  }

  const visibleItems = (items ?? []).slice(0, MAX_ITEMS)

  return (
    <section className={cn('py-32', className)}>
      <div className="container">
        <div className="mb-6 flex flex-col gap-4 md:mb-9 lg:mb-10">
          <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{title}</h2>
          <p className="text-muted-foreground max-w-xl">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {visibleItems.map((item) => (
            <a key={item.id} href={item.href} className="group block rounded-xl">
              <div className="group relative aspect-4/3 w-full overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 h-full bg-linear-to-t from-black/80 via-black/28 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                  <div className="mb-3 flex h-9 items-center pt-3 md:mb-4">
                    <img
                      src={item.logo}
                      alt={item.logoAlt ?? ''}
                      className="max-h-8 w-auto max-w-[160px] object-contain object-left"
                    />
                  </div>
                  <div className="line-clamp-1 text-xl font-semibold md:text-2xl">{item.title}</div>
                  <div className="mt-2 line-clamp-2 text-sm text-pretty text-white/90">
                    {item.description}
                  </div>
                  <div className="mt-6 flex items-center text-sm md:mt-8">
                    Read more{' '}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { CaseStudies12 }
