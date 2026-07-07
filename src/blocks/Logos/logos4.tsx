'use client'

import type { LogosBlock, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { PublicContextProps } from '@/utilities/publicContextProps'

function dedupeLogos(logos: LogosBlock['logos']) {
  if (!logos?.length) return []

  const seen = new Set<string>()
  const unique: MediaType[] = []

  for (const logo of logos) {
    if (typeof logo !== 'object' || !logo?.id) continue
    if (seen.has(logo.id)) continue
    seen.add(logo.id)
    unique.push(logo)
  }

  return unique
}

const Logos4: React.FC<LogosBlock & { publicContext: PublicContextProps }> = ({ logos }) => {
  const items = dedupeLogos(logos)
  if (!items.length) return null

  const marqueeItems = [...items, ...items]

  return (
    <section className="relative overflow-hidden border-y border-neutral-200 bg-white py-12 text-neutral-950 md:py-[50px]">
      <div className="relative flex overflow-hidden">
        <ul className="animate-orisa-marquee flex w-max items-center">
          {marqueeItems.map((logo, index) => (
            <li
              key={`${logo.id}-${index}`}
              className="shrink-0 px-[100px]"
            >
              <Media
                resource={logo}
                imgClassName="h-7 w-auto object-contain brightness-0 md:h-9"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[230px] max-w-[30%] bg-linear-to-r from-white to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[230px] max-w-[30%] bg-linear-to-l from-white to-transparent"
          aria-hidden
        />
      </div>
    </section>
  )
}

export default Logos4
