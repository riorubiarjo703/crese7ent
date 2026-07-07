'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { OrisaHoverArrow } from '@/components/orisa/OrisaHoverArrow'
import { OrisaHoverRotate } from '@/components/orisa/OrisaHoverRotate'
import { cn } from '@/utilities/index'

interface OrisaRotatingLinkProps {
  href: string
  label: string
  className?: string
  showArrow?: boolean
  newTab?: boolean | null
  children?: ReactNode
}

export function OrisaRotatingLink({
  href,
  label,
  className,
  showArrow = true,
  newTab,
  children,
}: OrisaRotatingLinkProps) {
  const newTabProps = newTab ? { rel: 'noopener noreferrer' as const, target: '_blank' as const } : {}

  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center justify-center gap-2 text-base leading-none font-semibold tracking-[-0.05em] capitalize',
        className,
      )}
      {...newTabProps}
    >
      <OrisaHoverRotate>{label}</OrisaHoverRotate>
      {showArrow && <OrisaHoverArrow />}
      {children}
    </Link>
  )
}
