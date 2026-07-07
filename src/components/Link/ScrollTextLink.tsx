'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/utilities'

gsap.registerPlugin(ScrollTrigger)

interface ScrollTextLinkProps {
  href: string
  children: ReactNode
  className?: string
  enabled?: boolean
  newTab?: boolean | null
}

export function ScrollTextLink({
  href,
  children,
  className,
  enabled = true,
  newTab,
}: ScrollTextLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const newTabProps = newTab ? { rel: 'noopener noreferrer' as const, target: '_blank' as const } : {}

  useEffect(() => {
    if (!enabled || !linkRef.current || !underlineRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: 'left center' })

      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: linkRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    }, linkRef)

    return () => ctx.revert()
  }, [enabled])

  return (
    <Link
      ref={linkRef}
      className={cn(
        'group text-primary relative inline-flex items-center text-base font-medium',
        className,
      )}
      href={href}
      {...newTabProps}
    >
      <span className="relative z-10">{children}</span>
      <span
        ref={underlineRef}
        aria-hidden
        className="bg-current absolute right-0 -bottom-0.5 left-0 h-px origin-left transition-transform duration-300 group-hover:scale-x-100"
      />
    </Link>
  )
}
