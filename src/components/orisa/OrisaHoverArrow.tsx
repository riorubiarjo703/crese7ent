'use client'

import { OrisaArrowSvg } from '@/components/orisa/OrisaArrowSvg'
import { cn } from '@/utilities/index'

interface OrisaHoverArrowProps {
  className?: string
}

/** Matches Orisa `.at-btn i` dual-arrow hover slide (16×16 clip box) */
export function OrisaHoverArrow({ className }: OrisaHoverArrowProps) {
  return (
    <span
      className={cn(
        'relative ml-1 inline-flex h-4 w-4 shrink-0 self-center overflow-hidden',
        className,
      )}
    >
      <OrisaArrowSvg className="absolute bottom-[-1px] left-px -translate-y-0.5 transition-all duration-200 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 group-focus-visible:translate-x-4 group-focus-visible:-translate-y-4 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
      <OrisaArrowSvg className="absolute -bottom-3 -left-3 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-[13px] group-hover:-translate-y-[13px] group-hover:opacity-100 group-focus-visible:translate-x-[13px] group-focus-visible:-translate-y-[13px] group-focus-visible:opacity-100 motion-reduce:opacity-100 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
    </span>
  )
}
