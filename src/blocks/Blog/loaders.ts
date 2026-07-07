import type { ComponentType } from 'react'

export type BlogLoader = () => Promise<{ default: ComponentType<any> }>

export const blogLoaders = {
  BLOG27: () => import('@/blocks/Blog/blog27').then((m) => ({ default: m.Blog27Block })),
  BLOG29: () => import('@/blocks/Blog/blog29').then((m) => ({ default: m.Blog29 })),
} as const
