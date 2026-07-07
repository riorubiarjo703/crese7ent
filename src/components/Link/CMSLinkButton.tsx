'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { type ButtonProps, buttonVariants } from '@/components/ui/button'
import {
  ButtonEffects,
  ButtonRipples,
  buttonEffectsClassName,
  getButtonEffectColors,
  shouldUseButtonEffects,
  useButtonRipples,
} from '@/components/ui/button-effects'
import { cn } from '@/utilities/index'

interface CMSLinkButtonProps {
  appearance: ButtonProps['variant']
  buttonSize: ButtonProps['size']
  className?: string
  href: string
  newTab?: boolean | null
  children: ReactNode
}

export function CMSLinkButton({
  appearance = 'default',
  buttonSize,
  className,
  href,
  newTab,
  children,
}: CMSLinkButtonProps) {
  const useEffects = shouldUseButtonEffects(appearance)
  const colors = getButtonEffectColors(appearance)
  const { ripples, createRipple } = useButtonRipples()
  const newTabProps = newTab ? { rel: 'noopener noreferrer' as const, target: '_blank' as const } : {}

  return (
    <Link
      className={cn(
        buttonVariants({ variant: appearance, size: buttonSize }),
        'inline-flex items-center',
        useEffects && buttonEffectsClassName,
        className,
      )}
      href={href}
      onClick={useEffects ? createRipple : undefined}
      {...newTabProps}
    >
      {useEffects && <ButtonEffects shimmerColor={colors.shimmer} />}
      <span className={cn(useEffects && 'relative z-10 inline-flex items-center gap-2')}>
        {children}
      </span>
      {useEffects && <ButtonRipples ripples={ripples} rippleColor={colors.ripple} />}
    </Link>
  )
}
