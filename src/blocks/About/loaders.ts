import type { ComponentType } from 'react'

export type AboutLoader = () => Promise<{ default: ComponentType<any> }>

export const aboutLoaders = {
  ABOUT1: () => import('@/blocks/About/about1'),
  ABOUT2: () => import('@/blocks/About/about2'),
  ABOUT_ORISA_01: () => import('@/blocks/About/aboutOrisa01'),
  ABOUT3: () => import('@/blocks/About/about3'),
  ABOUT4: () => import('@/blocks/About/about4'),
  ABOUT5: () => import('@/blocks/About/about5'),
} as const
