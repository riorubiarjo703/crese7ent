import type { ComponentType } from 'react'

export type StatLoader = () => Promise<{ default: ComponentType<any> }>

export const statLoaders = {
  STAT1: () => import('@/blocks/Stat/stat1'),
  STAT2: () => import('@/blocks/Stat/stat2'),
  STAT4: () => import('@/blocks/Stat/stat4'),
  STAT5: () => import('@/blocks/Stat/stat5'),
  STAT6: () => import('@/blocks/Stat/stat6'),
  STAT7: () => import('@/blocks/Stat/stat7'),
  STAT8: () => import('@/blocks/Stat/stat8'),
} as const
