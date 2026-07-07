import type { ComponentType } from 'react'

export type SignupLoader = () => Promise<{ default: ComponentType<any> }>

export const signupLoaders = {
  SIGNUP4: () => import('@/blocks/Signup/Signup4').then((m) => ({ default: m.Signup4 })),
} as const
