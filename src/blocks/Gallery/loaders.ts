import type { ComponentType } from 'react'

export type GalleryLoader = () => Promise<{ default: ComponentType<any> }>

export const galleryLoaders = {
  GALLERY1: () => import('@/blocks/Gallery/gallery1'),
  GALLERY2: () => import('@/blocks/Gallery/gallery2'),
  GALLERY3: () => import('@/blocks/Gallery/gallery3'),
  GALLERY4: () => import('@/blocks/Gallery/gallery4'),
  GALLERY5: () => import('@/blocks/Gallery/gallery5'),
  GALLERY6: () => import('@/blocks/Gallery/gallery6'),
  GALLERY7: () => import('@/blocks/Gallery/gallery7'),
  GALLERY25: () => import('@/blocks/Gallery/gallery25').then((m) => ({ default: m.Gallery25 })),
  GALLERY26: () => import('@/blocks/Gallery/gallery26').then((m) => ({ default: m.Gallery26 })),
} as const
