import type { ComponentType } from 'react'

export type CtaLoader = () => Promise<{ default: ComponentType<any> }>

export const ctaLoaders = {
  CTA1: () => import('@/blocks/Cta/cta1'),
  CTA3: () => import('@/blocks/Cta/cta3'),
  CTA4: () => import('@/blocks/Cta/cta4'),
  CTA5: () => import('@/blocks/Cta/cta5'),
  CTA6: () => import('@/blocks/Cta/cta6'),
  CTA7: () => import('@/blocks/Cta/cta7'),
  CTA10: () => import('@/blocks/Cta/cta10'),
  CTA11: () => import('@/blocks/Cta/cta11'),
  CTA12: () => import('@/blocks/Cta/cta12'),
  CTA13: () => import('@/blocks/Cta/cta13'),
  CTA15: () => import('@/blocks/Cta/cta15'),
  CTA16: () => import('@/blocks/Cta/cta16'),
  CTA17: () => import('@/blocks/Cta/cta17'),
  CTA19: () => import('@/blocks/Cta/cta19'),
} as const
