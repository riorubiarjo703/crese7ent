import React from 'react'

import { signupLoaders } from '@/blocks/Signup/loaders'
import type { SignupDesignVersion } from '@/blocks/Signup/config'
import { Page } from '@/payload-types'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export async function SignupBlock<T extends object = {}>(props: Page['layout'][0] & T) {
  if (props.blockType !== 'signup') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const SignupToRender = await loadLazyComponent(
    signupLoaders[designVersion as SignupDesignVersion],
  )

  if (!SignupToRender) return null

  return <SignupToRender {...props} />
}
