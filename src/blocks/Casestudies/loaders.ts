import type { ComponentType } from 'react'

export type CasestudiesLoader = () => Promise<{ default: ComponentType<any> }>

export const casestudiesLoaders = {
  CASESTUDIES5: () =>
    import('@/blocks/Casestudies/casestudies5').then((m) => ({ default: m.Casestudies5 })),
  CASESTUDIES12: () =>
    import('@/blocks/Casestudies/casestudies12').then((m) => ({ default: m.Casestudies12 })),
  CASESTUDIES_ORISA01: () =>
    import('@/blocks/Casestudies/casestudies12').then((m) => ({ default: m.Casestudies12 })),
} as const
