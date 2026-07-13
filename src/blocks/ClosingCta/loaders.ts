import type { ComponentType } from 'react'

import type { ClosingCtaDesignVersion } from './metadata'

export type ClosingCtaLoader = () => Promise<{ default: ComponentType<any> }>

export const closingCtaLoaders: Record<ClosingCtaDesignVersion, ClosingCtaLoader> = {
  DEFAULT: () =>
    import('@/blocks/ClosingCta/Component.client').then((m) => ({ default: m.ClosingCtaClient })),
  ORISA_CLOSING_01: () =>
    import('@/blocks/ClosingCta/closingCtaOrisa01.client').then((m) => ({
      default: m.ClosingCtaOrisa01Client,
    })),
}
