'use client'

import { Button, useField, useFormFields } from '@payloadcms/ui'
import React, { useEffect, useMemo } from 'react'

import {
  detectDuplicateLayoutBlocks,
  type DuplicateLayoutBlock,
} from '@/utilities/detectDuplicateLayoutBlocks'

import './index.scss'

function getLayoutFromForm(fields: Record<string, unknown> | null): unknown[] {
  const layoutField = fields?.layout as { value?: unknown[] } | undefined
  return Array.isArray(layoutField?.value) ? layoutField.value : []
}

const DuplicateBlocksWarningClient: React.FC = () => {
  const layout = useFormFields(([fields]) => getLayoutFromForm(fields as Record<string, unknown>))
  const { value: acknowledged, setValue: setAcknowledged } = useField<boolean>({
    path: 'duplicateBlocksAcknowledged',
  })

  const duplicates = useMemo(
    () => detectDuplicateLayoutBlocks(layout as { blockType?: string | null }[]),
    [layout],
  )

  useEffect(() => {
    if (duplicates.length === 0 && acknowledged) {
      setAcknowledged(false)
    }
  }, [acknowledged, duplicates.length, setAcknowledged])

  if (duplicates.length === 0) return null

  return (
    <div className="duplicate-blocks-warning" role="alert">
      <p className="duplicate-blocks-warning__title">Duplicate sections detected</p>
      <p className="duplicate-blocks-warning__body">
        This page contains repeated section types. Publishing with duplicates may show the same
        content twice on the frontend.
      </p>
      <ul className="duplicate-blocks-warning__list">
        {duplicates.map((entry: DuplicateLayoutBlock) => (
          <li key={entry.blockType}>
            <code>{entry.blockType}</code> appears {entry.count} times
          </li>
        ))}
      </ul>
      {acknowledged ? (
        <p className="duplicate-blocks-warning__ack">Acknowledged — you can publish anyway.</p>
      ) : (
        <Button
          buttonStyle="secondary"
          size="small"
          onClick={() => setAcknowledged(true)}
          type="button"
        >
          Acknowledge and publish anyway
        </Button>
      )}
    </div>
  )
}

export default DuplicateBlocksWarningClient
