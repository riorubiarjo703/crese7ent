import type { ComponentType } from 'react'

export type BannerLoader = () => Promise<{ default: ComponentType<any> }>

export const bannerLoaders = {
  BANNER1: () => import('@/blocks/Banner/banner1'),
  BANNER5: () => import('@/blocks/Banner/banner5'),
} as const
