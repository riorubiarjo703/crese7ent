import type { ComponentType } from 'react'

export type ContactLoader = () => Promise<{ default: ComponentType<any> }>

export const contactLoaders = {
  CONTACT1: () => import('@/blocks/Contact/contact1'),
  CONTACT2: () => import('@/blocks/Contact/contact2'),
  CONTACT3: () => import('@/blocks/Contact/contact3'),
  CONTACT4: () => import('@/blocks/Contact/contact4'),
} as const
