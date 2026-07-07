'use client'

import { useMemo, useRef } from 'react'

import { useScrollWordReveal } from '@/hooks/useScrollWordReveal'
import { cn } from '@/utilities'

interface ScrollWordRevealProps {
  text: string
  className?: string
  enabled?: boolean
}

function splitWords(text: string) {
  return text.split(/(\s+)/).filter((part) => part.length > 0)
}

export function ScrollWordReveal({ text, className, enabled = true }: ScrollWordRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const parts = useMemo(() => splitWords(text), [text])

  useScrollWordReveal(containerRef, { enabled })

  return (
    <p
      ref={containerRef}
      className={cn('text-muted-foreground text-base leading-relaxed md:text-lg', className)}
      aria-label={text}
    >
      {parts.map((part, index) => {
        if (/^\s+$/.test(part)) {
          return <span key={`space-${index}`}>{part}</span>
        }

        return (
          <span
            key={`word-${index}`}
            data-scroll-word
            aria-hidden
            className="relative inline-block will-change-transform"
          >
            {part}
          </span>
        )
      })}
    </p>
  )
}
