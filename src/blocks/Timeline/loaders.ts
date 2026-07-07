import type { ComponentType } from 'react'

export type TimelineLoader = () => Promise<{ default: ComponentType<any> }>

export const timelineLoaders = {
  TIMELINE2: () => import('@/blocks/Timeline/timeline2'),
  TIMELINE8: () => import('@/blocks/Timeline/timeline8'),
} as const
