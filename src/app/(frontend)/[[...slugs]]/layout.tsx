import type { Metadata } from 'next'

import { Inter, DM_Sans, Playfair_Display, Roboto_Mono } from 'next/font/google'
import React from 'react'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { serverUrl as NEXT_PUBLIC_SERVER_URL } from '@/config/server'

import { cn } from 'src/utilities/cn'
import { AdminBarGate } from '@/components/AdminBar/AdminBarGate'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { defaultTheme } from '@/providers/Theme/ThemeSelector/types'
import { draftMode } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'

import { ThemeConfig } from '@/globals/ThemeConfig/Component'
import { resolveSlugs } from '@/utilities/resolveSlugs'
import localization from '@/localization.config'
import { PublicContextProps } from '@/utilities/publicContextProps'

import './globals.css'

// Change fonts by changing class Geist_Mono or Geist.
// No change in tailwind.config.mjs needed (Because it's already synced via --font-mono and --font-sans variables). Just make sure, that these variables stay.
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_SERVER_URL || 'https://trieb.work'),
  openGraph: mergeOpenGraph(),
  // twitter: {
  //   card: 'summary_large_image',
  //   creator: '@payloadcms',
  // },
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const paramsR = await params
  const { slugs } = paramsR
  const slugData = resolveSlugs(slugs || [])
  const { isEnabled } = await draftMode()

  const publicContext: PublicContextProps = {
    ...slugData,
  }

  return (
    <html
      className={cn(inter.variable, dmSans.variable, playfair.variable, robotoMono.variable)}
      lang={slugData.locale || localization.defaultLocale}
      data-theme={defaultTheme}
      suppressHydrationWarning
    >
      <head>
        <ThemeConfig publicContext={publicContext} />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBarGate preview={isEnabled} />
          <LivePreviewListener />
          <Analytics />
          <Header publicContext={publicContext} />
          {children}
          <Footer publicContext={publicContext} />
        </Providers>
      </body>
    </html>
  )
}
