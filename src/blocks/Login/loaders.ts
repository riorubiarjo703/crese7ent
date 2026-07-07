import type { ComponentType } from 'react'

export type LoginLoader = () => Promise<{ default: ComponentType<any> }>

export const loginLoaders = {
  LOGIN3: () => import('@/blocks/Login/Login3').then((m) => ({ default: m.Login3 })),
} as const
