import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

import { cloneHero, cloneLayoutBlocks } from '@/utilities/cloneLayoutBlocks'

export const applyLayoutBundle: CollectionBeforeChangeHook = async ({ data, req }) => {
  const mode = data?.applyLayoutBundleMode
  const bundleRef = data?.layoutBundle

  if (!mode || mode === 'none' || !bundleRef) return data

  const bundleId = typeof bundleRef === 'object' ? bundleRef.id : bundleRef
  if (!bundleId) return data

  const pageType = data?.layoutBundlePageType
  if (!pageType) {
    throw new APIError('Select a page template from the layout bundle gallery before applying.', 400)
  }

  const bundle = await req.payload.findByID({
    collection: 'layout-bundles',
    id: bundleId,
    depth: 0,
    overrideAccess: true,
  })

  if (!bundle) return data

  const template = bundle.pageTemplates?.find((entry) => entry.pageType === pageType)

  const sourceLayout = template?.layout ?? bundle.layout
  const sourceHero = template?.hero ?? bundle.hero

  if (!sourceLayout?.length && mode !== 'replace-all') {
    throw new APIError(`The selected page template has no sections to apply.`, 400)
  }

  const clonedLayout = cloneLayoutBlocks(sourceLayout)

  if (mode === 'replace' || mode === 'replace-all') {
    data.layout = clonedLayout
  }

  if (mode === 'replace-all') {
    const clonedHero = cloneHero(sourceHero)
    if (clonedHero) {
      data.hero = clonedHero
    }
  }

  data.applyLayoutBundleMode = 'none'
  data.duplicateBlocksAcknowledged = false

  return data
}
