import type { ComponentType } from 'react'

export type BlogLoader = () => Promise<{ default: ComponentType<any> }>

export const blogLoaders = {
  BLOG_ORISA_01: () =>
    import('@/blocks/Blog/blogOrisa01.client').then((m) => ({ default: m.BlogOrisa01Client })),
  BLOG27: () => import('@/blocks/Blog/blog27').then((m) => ({ default: m.Blog27Block })),
  BLOG29: () => import('@/blocks/Blog/blog29').then((m) => ({ default: m.Blog29 })),
} as const
