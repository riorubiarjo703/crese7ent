'use client'

import type { ReactNode } from 'react'

import { cn } from '@/utilities/index'

interface OrisaHoverRotateProps {
  children: ReactNode
  className?: string
}

/** Matches Orisa `.at-btn span.text-1 / .text-2` slide-up on hover */
export function OrisaHoverRotate({ children, className }: OrisaHoverRotateProps) {
  return (
    <span className={cn('relative inline-block overflow-hidden', className)}>
      <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-[150%] group-focus-visible:-translate-y-[150%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute top-full block transition-all duration-300 ease-out group-hover:top-1/2 group-hover:-translate-y-1/2 group-focus-visible:top-1/2 group-focus-visible:-translate-y-1/2 motion-reduce:group-hover:top-full motion-reduce:group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  )
}
