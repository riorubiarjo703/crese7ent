'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'

import {
  ButtonEffects,
  ButtonRipples,
  buttonEffectsClassName,
  getButtonEffectColors,
  shouldUseButtonEffects,
  useButtonRipples,
} from '@/components/ui/button-effects'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/utilities/index'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, children, ...props }, ref) => {
    const useEffects = shouldUseButtonEffects(variant)
    const colors = getButtonEffectColors(variant)
    const { ripples, createRipple } = useButtonRipples()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (useEffects) createRipple(event)
      onClick?.(event)
    }

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={onClick}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          useEffects && buttonEffectsClassName,
          className,
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {useEffects && <ButtonEffects shimmerColor={colors.shimmer} />}
        <span className={cn(useEffects && 'relative z-10 inline-flex items-center gap-2')}>
          {children}
        </span>
        {useEffects && <ButtonRipples ripples={ripples} rippleColor={colors.ripple} />}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
