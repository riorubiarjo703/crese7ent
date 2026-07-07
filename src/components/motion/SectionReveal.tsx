'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utilities/cn'

import { motionTokens } from './motion-tokens'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionTokens.viewport}
      transition={{
        duration: motionTokens.duration.normal,
        ease: motionTokens.ease,
      }}
    >
      {children}
    </motion.div>
  )
}
