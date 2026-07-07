import type { ComponentType } from 'react'

export type FaqLoader = () => Promise<{ default: ComponentType<any> }>

export const faqLoaders = {
  FAQ1: () => import('@/blocks/Faq/faq1'),
  FAQ2: () => import('@/blocks/Faq/faq2'),
  FAQ3: () => import('@/blocks/Faq/faq3'),
  FAQ4: () => import('@/blocks/Faq/faq4'),
  FAQ5: () => import('@/blocks/Faq/faq5'),
  FAQ12: () => import('@/blocks/Faq/faq12'),
} as const
