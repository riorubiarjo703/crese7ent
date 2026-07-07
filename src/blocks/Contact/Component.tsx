import React from 'react'

import { contactLoaders } from '@/blocks/Contact/loaders'
import type { ContactDesignVersion } from '@/blocks/Contact/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function ContactBlock(props: { blockType?: string; designVersion?: string }) {
  if (props.blockType !== 'contact') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const ContactToRender = await loadLazyComponent(
    contactLoaders[designVersion as ContactDesignVersion],
  )

  if (!ContactToRender) return null

  return <ContactToRender {...props} />
}

export default ContactBlock
