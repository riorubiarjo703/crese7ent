import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { SmoothScroll } from './SmoothScroll'
import { ThemeProvider } from './Theme'

const isSmoothScrollEnabled = process.env.NEXT_PUBLIC_SMOOTH_SCROLL !== 'false'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        {isSmoothScrollEnabled ? <SmoothScroll>{children}</SmoothScroll> : children}
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
