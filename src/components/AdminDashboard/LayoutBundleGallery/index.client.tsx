'use client'

import { useField, usePayloadAPI } from '@payloadcms/ui'
import React, { useEffect, useMemo } from 'react'

import {
  LAYOUT_BUNDLE_PAGE_TYPE_LABELS,
  STOREFRAME_BUNDLE_SLUGS,
  type LayoutBundlePageType,
} from '@/constants/layoutBundles'

import './index.scss'

type LayoutBundleDoc = {
  id: string
  title?: string
  slug?: string
  category?: string
  description?: string
  previewImage?: { url?: string; alt?: string } | string
  pageTemplates?: {
    id?: string
    pageType?: LayoutBundlePageType
    title?: string
    description?: string
    previewImage?: { url?: string; alt?: string } | string
  }[]
}

function getPreviewUrl(image: LayoutBundleDoc['previewImage']): string | undefined {
  if (!image || typeof image === 'string') return undefined
  return image.url
}

const LayoutBundleGalleryClient: React.FC = () => {
  const { value: bundleId, setValue: setBundleId } = useField<string>({ path: 'layoutBundle' })
  const { value: pageType, setValue: setPageType } = useField<LayoutBundlePageType>({
    path: 'layoutBundlePageType',
  })

  const query = useMemo(
    () => ({
      limit: '10',
      depth: '1',
      sort: 'title',
      'where[slug][in]': STOREFRAME_BUNDLE_SLUGS.join(','),
    }),
    [],
  )

  const [{ data, isLoading, isError }] = usePayloadAPI('/api/layout-bundles', {
    initialParams: query,
  })

  const bundles = (data?.docs ?? []) as LayoutBundleDoc[]

  const selectedBundle = bundles.find((bundle) => bundle.id === bundleId)

  useEffect(() => {
    if (!bundleId) return
    if (selectedBundle) return
    setBundleId(null)
    setPageType(null)
  }, [bundleId, selectedBundle, setBundleId, setPageType])

  useEffect(() => {
    if (!pageType || !selectedBundle?.pageTemplates?.length) return
    const exists = selectedBundle.pageTemplates.some((template) => template.pageType === pageType)
    if (!exists) setPageType(null)
  }, [pageType, selectedBundle, setPageType])

  function selectBundle(bundle: LayoutBundleDoc) {
    if (bundleId === bundle.id) return
    setBundleId(bundle.id)
    setPageType(null)
  }

  function selectTemplate(templatePageType: LayoutBundlePageType) {
    setPageType(templatePageType)
  }

  return (
    <div className="layout-bundle-gallery">
      <p className="layout-bundle-gallery__label">Storeframe bundles</p>
      <p className="layout-bundle-gallery__hint">
        Choose one bundle, then one page template. Apply with the mode below and save.
      </p>

      {isLoading && <p className="layout-bundle-gallery__status">Loading bundles…</p>}
      {isError && (
        <p className="layout-bundle-gallery__status layout-bundle-gallery__status--error">
          Could not load layout bundles.
        </p>
      )}

      {!isLoading && !isError && bundles.length === 0 && (
        <p className="layout-bundle-gallery__status">
          Run <code>pnpm seed:storeframe-bundles</code> to create Creative and Marketing Storeframe
          bundles.
        </p>
      )}

      <div className="layout-bundle-gallery__grid">
        {bundles.map((bundle) => {
          const isSelected = bundleId === bundle.id
          const previewUrl = getPreviewUrl(bundle.previewImage)

          return (
            <button
              key={bundle.id}
              type="button"
              className={`layout-bundle-gallery__card${isSelected ? ' layout-bundle-gallery__card--selected' : ''}`}
              onClick={() => selectBundle(bundle)}
              aria-pressed={isSelected}
            >
              <div className="layout-bundle-gallery__thumb">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="" />
                ) : (
                  <span className="layout-bundle-gallery__placeholder">{bundle.title?.[0] ?? '?'}</span>
                )}
              </div>
              <div className="layout-bundle-gallery__meta">
                <span className="layout-bundle-gallery__title">{bundle.title}</span>
                {bundle.description && (
                  <span className="layout-bundle-gallery__description">{bundle.description}</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selectedBundle && (
        <div className="layout-bundle-gallery__templates">
          <p className="layout-bundle-gallery__label">Page template</p>
          <div className="layout-bundle-gallery__grid">
            {(selectedBundle.pageTemplates ?? []).map((template) => {
              if (!template.pageType) return null
              const isSelected = pageType === template.pageType
              const previewUrl = getPreviewUrl(template.previewImage ?? selectedBundle.previewImage)
              const label =
                template.title ??
                LAYOUT_BUNDLE_PAGE_TYPE_LABELS[template.pageType] ??
                template.pageType

              return (
                <button
                  key={template.id ?? template.pageType}
                  type="button"
                  className={`layout-bundle-gallery__card layout-bundle-gallery__card--template${isSelected ? ' layout-bundle-gallery__card--selected' : ''}`}
                  onClick={() => selectTemplate(template.pageType!)}
                  aria-pressed={isSelected}
                >
                  <div className="layout-bundle-gallery__thumb">
                    {previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={previewUrl} alt="" />
                    ) : (
                      <span className="layout-bundle-gallery__placeholder">{label[0] ?? '?'}</span>
                    )}
                  </div>
                  <div className="layout-bundle-gallery__meta">
                    <span className="layout-bundle-gallery__title">{label}</span>
                    {template.description && (
                      <span className="layout-bundle-gallery__description">
                        {template.description}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LayoutBundleGalleryClient
