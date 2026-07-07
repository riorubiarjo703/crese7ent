'use client'

import Link from 'next/link'
import React, { type ComponentPropsWithoutRef, type CSSProperties } from 'react'

import { cn } from '@/utilities/index'

export interface ShimmerLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerLink = React.forwardRef<HTMLAnchorElement, ShimmerLinkProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 0.35)',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as CSSProperties
        }
        className={cn(
          'group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]',
          'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
          className,
        )}
        {...props}
      >
        <div
          aria-hidden
          className="@container-[size] pointer-events-none absolute inset-0 -z-30 overflow-visible blur-[2px]"
        >
          <div className="animate-shimmer-slide absolute inset-0 aspect-square h-[100cqh] rounded-none [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>

        <div className="relative z-10">{children}</div>

        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 size-full rounded-[inherit]',
            'shadow-[inset_0_-8px_10px_#ffffff1f]',
            'transform-gpu transition-all duration-300 ease-in-out',
            'group-hover:shadow-[inset_0_-6px_10px_#ffffff2f]',
          )}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
        />
      </Link>
    )
  },
)

ShimmerLink.displayName = 'ShimmerLink'
