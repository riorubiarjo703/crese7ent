import { Fragment } from 'react'
import { FileCode, Layers } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/utilities/index'

interface CtaCardsSubfeature {
  title: string
  description: string
  url: string
}
interface Button {
  text: string
  url: string
  icon?: React.ReactNode
}
interface Buttons {
  primary?: Button
  secondary?: Button
}

interface CtaCardsProps {
  heading: string
  description: string
  badge?: { text: string }
  buttons?: Buttons
  features: readonly [CtaCardsSubfeature, CtaCardsSubfeature]
  className?: string
}

interface Cta19Props extends CtaCardsProps {}
type Props = Partial<Cta19Props>

const defaultProps: Cta19Props = {
  heading: 'Call to Action',
  description:
    'Get access to our collection of pre-built blocks and components today. Try our interactive demo or watch a comprehensive walkthrough today.',
  badge: { text: 'Get Started' },
  buttons: {
    primary: {
      text: 'Start free trial',
      url: '#',
    },
    secondary: {
      text: 'Schedule demo',
      url: '#',
    },
  },
  features: [
    {
      title: 'Documentation',
      description: "Learn more about our platform's features and capabilities.",
      url: '#',
    },
    {
      title: 'Interactive Demo',
      description: 'Experience our platform firsthand with an interactive demo.',
      url: '#',
    },
  ],
}

const featureIcons = [FileCode, Layers] as const

const Cta19 = (props: Props) => {
  const { heading, description, badge, buttons, features, className } = {
    ...defaultProps,
    ...props,
  }

  return (
    <section className={cn('py-32', className)}>
      <div className="container">
        <div className="flex flex-col rounded-xl border lg:flex-row">
          <div className="grow px-8 py-8 lg:px-16">
            {badge?.text ? <Badge variant="outline">{badge.text}</Badge> : null}
            <div className="mt-4 max-w-xl">
              <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
              <p className="text-muted-foreground mt-4 md:text-lg">{description}</p>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {buttons?.primary && (
                <Button asChild>
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons?.secondary && (
                <Button variant="outline" asChild>
                  <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
                </Button>
              )}
            </div>
          </div>
          <div className="flex grow basis-5/12 flex-col justify-between border-t lg:border-t-0 lg:border-l">
            {features.map((feature, index) => {
              const Icon = featureIcons[index]!
              return (
                <Fragment key={feature.title}>
                  {index > 0 ? <Separator /> : null}
                  <a
                    href={feature.url}
                    className="hover:bg-muted/50 flex h-full items-center px-9 py-6 transition-colors lg:justify-center"
                  >
                    <div className="flex gap-4">
                      <Icon className="size-5 shrink-0" strokeWidth={1.5} />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold md:text-xl">{feature.title}</h3>
                        <p className="text-muted-foreground max-w-lg md:text-lg">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Cta19 }
