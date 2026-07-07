import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React, { ReactElement } from 'react'

import type { Footer, Header } from '@/payload-types'
import { DataFromGlobalSlug } from 'payload'
import Navbar5 from './navbar/navbar5'
import Navbar6 from './navbar/navbar6'
import { Navbar1 } from './navbar/navbar1'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { Navbar4 } from './navbar/navbar4'
import { resolveIconsInData } from '@/utilities/resolveIconsInData'

export async function Header({ publicContext }: { publicContext: PublicContextProps }) {
  const rawHeader = (await getCachedGlobal(
    'header',
    publicContext.locale,
    1,
  )()) as DataFromGlobalSlug<'header'>
  const header = await resolveIconsInData(rawHeader)

  const rawFooter =
    header.designVersion === '6'
      ? ((await getCachedGlobal('footer', publicContext.locale, 0)()) as Footer)
      : null

  let navbarComponent: ReactElement
  switch (header.designVersion) {
    case '1': {
      navbarComponent = <Navbar1 header={header} publicContext={publicContext} />
      break
    }
    case '4': {
      navbarComponent = <Navbar4 header={header} publicContext={publicContext} />
      break
    }
    case '5': {
      navbarComponent = <Navbar5 header={header} publicContext={publicContext} />
      break
    }
    case '6': {
      navbarComponent = (
        <Navbar6
          header={header}
          publicContext={publicContext}
          socialLinks={rawFooter?.socialLinks}
        />
      )
      break
    }
    default: {
      navbarComponent = <Navbar5 header={header} publicContext={publicContext} />
      break
    }
  }

  return (
    <>
      {navbarComponent}
      <HeaderClient />
    </>
  )
}
