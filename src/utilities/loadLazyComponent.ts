import type { ComponentType } from 'react'

export type LazyComponentModule = {
  default?: ComponentType<any>
  [key: string]: unknown
}

export type LazyComponentLoader = () => Promise<LazyComponentModule>

export async function loadLazyComponent(
  loader: LazyComponentLoader | undefined,
): Promise<ComponentType<any> | null> {
  if (!loader) return null

  const mod = await loader()

  if (mod.default && typeof mod.default === 'function') {
    return mod.default
  }

  const namedExport = Object.values(mod).find((value) => typeof value === 'function')

  return (namedExport as ComponentType<any> | undefined) ?? null
}
