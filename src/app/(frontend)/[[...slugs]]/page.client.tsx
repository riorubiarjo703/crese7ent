'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import { useHomepageScrollEffects } from '@/hooks/useHomepageScrollEffects'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface PageClientProps {
  isHome?: boolean
}

const PageClient: React.FC<PageClientProps> = ({ isHome = false }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  useHomepageScrollEffects({ enabled: isHome && !reducedMotion })

  return <React.Fragment />
}

export default PageClient
