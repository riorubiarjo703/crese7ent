'use client'

import Link from 'next/link'

import { OrisaHoverRotate } from '@/components/orisa/OrisaHoverRotate'
import { cn } from '@/utilities/index'

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      aria-hidden
    >
      <path
        d="M0.0001297 8.99993L0 3.00407e-05L2 0L2.0001 6.99993L12.1719 7.00003L8.22224 3.05027L9.63644 1.63606L16.0003 8.00003L9.63644 14.364L8.22224 12.9497L12.1719 9.00003L0.0001297 8.99993Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface OrisaBtnGroupProps {
  href: string
  label: string
  className?: string
  newTab?: boolean | null
}

export function OrisaBtnGroup({ href, label, className, newTab }: OrisaBtnGroupProps) {
  const newTabProps = newTab ? { rel: 'noopener noreferrer' as const, target: '_blank' as const } : {}

  return (
    <div
      className={cn(
        'group/btn-group flex w-fit',
        '[&>*:nth-child(1)]:-me-[52px] [&>*:nth-child(1)]:scale-50',
        '[&>*:nth-child(3)]:ms-0 [&>*:nth-child(3)]:scale-100',
        'hover:[&>*:nth-child(1)]:me-0 hover:[&>*:nth-child(1)]:scale-100',
        'hover:[&>*:nth-child(3)]:-ms-[52px] hover:[&>*:nth-child(3)]:scale-50',
        className,
      )}
    >
      <Link
        href={href}
        className="flex size-[50px] items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-300 hover:bg-neutral-900"
        {...newTabProps}
      >
        <ArrowIcon />
      </Link>

      <Link
        href={href}
        className="group relative z-[1] inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-[25px] py-[17px] text-base leading-none font-semibold tracking-[-0.05em] text-white capitalize transition-all duration-300 hover:bg-neutral-900"
        {...newTabProps}
      >
        <OrisaHoverRotate>{label}</OrisaHoverRotate>
      </Link>

      <Link
        href={href}
        className="flex size-[50px] items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-300 hover:bg-neutral-900"
        {...newTabProps}
      >
        <ArrowIcon />
      </Link>
    </div>
  )
}
