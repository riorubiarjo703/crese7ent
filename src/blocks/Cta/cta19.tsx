import { FileCode, Layers } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { CtaBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'

const cta19Icons = [FileCode, Layers] as const

const Cta19: React.FC<CtaBlock & { publicContext: PublicContextProps }> = ({
  tagline,
  richText,
  links,
  featureDescriptions,
  publicContext,
}) => {
  const buttonLinks = Array.isArray(links) ? links.slice(0, 2) : []
  const resourceLinks = Array.isArray(links) ? links.slice(2, 4) : []

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col rounded-xl border lg:flex-row">
          <div className="grow px-8 py-8 lg:px-16">
            {tagline && <Badge variant="outline">{tagline}</Badge>}
            {richText && (
              <RichText
                publicContext={publicContext}
                content={richText}
                withWrapper={false}
                overrideStyle={{
                  h2: 'mt-4 text-3xl font-semibold md:text-4xl',
                  h3: 'mt-4 text-3xl font-semibold md:text-4xl',
                  p: 'mt-4 text-muted-foreground md:text-lg',
                }}
              />
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {buttonLinks.map(({ link }, index) => (
                <CMSLink
                  key={index}
                  publicContext={publicContext}
                  className="w-full sm:w-auto"
                  {...link}
                />
              ))}
            </div>
          </div>

          <div className="flex grow basis-5/12 flex-col justify-between border-t lg:border-t-0 lg:border-l">
            {resourceLinks.map(({ link }, index) => {
              const Icon = cta19Icons[index] ?? Layers
              const description = featureDescriptions?.[index]?.description

              return (
                <div key={index}>
                  {index > 0 && <Separator />}
                  <CMSLink
                    publicContext={publicContext}
                    className="hover:bg-muted/50 flex h-full items-center px-9 py-6 transition-colors lg:justify-center"
                    {...link}
                    label={null}
                  >
                    <div className="flex gap-4">
                      <Icon className="size-5 shrink-0" strokeWidth={1.5} />
                      {link.label && (
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-semibold md:text-xl">{link.label}</h3>
                          {description && (
                            <p className="text-muted-foreground max-w-lg md:text-lg">
                              {description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CMSLink>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta19
