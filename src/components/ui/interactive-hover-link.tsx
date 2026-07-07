'use client'

import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { ShimmerLink } from '@/components/ui/shimmer-link'
import { BRAND_RED, BRAND_RED_80 } from '@/utilities/brand-colors'
import { cn } from '@/utilities/index'

interface InteractiveHoverLinkProps extends Omit<ComponentProps<typeof ShimmerLink>, 'children'> {
  children: ReactNode
}

export function InteractiveHoverLink({
  children,
  className,
  ...props
}: InteractiveHoverLinkProps) {
  return (
    <ShimmerLink
      background="rgba(255, 255, 255, 0.03)"
      borderRadius="9999px"
      className={cn(
        'group relative inline-flex min-h-11 items-center rounded-full border px-5 py-2.5 text-sm font-semibold',
        className,
      )}
      shimmerColor="rgba(255, 255, 255, 0.45)"
      shimmerDuration="3s"
      shimmerSize="0.05em"
      style={{ borderColor: BRAND_RED_80 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        <span className="relative flex size-2 shrink-0 items-center justify-center">
          <span
            aria-hidden
            className="absolute inline-flex size-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: BRAND_RED }}
          />
          <span
            className="relative size-2 rounded-full"
            style={{
              backgroundColor: BRAND_RED,
              boxShadow: `0 0 6px ${BRAND_RED_80}`,
            }}
          />
        </span>
        <span className="text-white transition-transform duration-300 group-hover:translate-x-0.5">
          {children}
        </span>
        <ArrowRight className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
      </span>
    </ShimmerLink>
  )
}
