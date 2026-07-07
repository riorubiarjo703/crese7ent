import type { ComponentType } from 'react'

export type LogosLoader = () => Promise<{ default: ComponentType<any> }>

export const logosLoaders = {
  LOGOS1: () => import('@/blocks/Logos/logos1'),
  LOGOS2: () => import('@/blocks/Logos/logos2'),
  LOGOS3: () => import('@/blocks/Logos/logos3'),
  LOGOS4: () => import('@/blocks/Logos/logos4'),
  LOGOS9: () => import('@/blocks/Logos/logos9'),
} as const
