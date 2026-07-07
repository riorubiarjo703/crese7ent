import { OrisaArrowSvg } from '@/components/orisa/OrisaArrowSvg'
import { cn } from '@/utilities/index'

interface OrisaArrowIconProps {
  className?: string
}

export function OrisaArrowIcon({ className }: OrisaArrowIconProps) {
  return <OrisaArrowSvg className={cn('size-[11px] shrink-0', className)} />
}
