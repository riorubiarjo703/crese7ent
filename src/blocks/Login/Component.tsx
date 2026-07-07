import React from 'react'

import { loginLoaders } from '@/blocks/Login/loaders'
import { PublicContextProps } from '@/utilities/publicContextProps'
import type { LoginDesignVersion } from '@/blocks/Login/config'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

export interface LoginBlockProps {
  blockType: 'login'
  designVersion: LoginDesignVersion
  signupEnabled?: boolean
  googleLoginEnabled?: boolean
  facebookLoginEnabled?: boolean
  appleLoginEnabled?: boolean
  blockName?: string
  id?: string
  publicContext?: PublicContextProps
}

export async function LoginBlock(props: LoginBlockProps) {
  if (props.blockType !== 'login') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const LoginToRender = await loadLazyComponent(loginLoaders[designVersion])

  if (!LoginToRender) return null

  return <LoginToRender {...props} publicContext={props.publicContext || {}} />
}
