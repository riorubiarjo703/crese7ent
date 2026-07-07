import type { Footer } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import Footer7Client from './footer7.client'

const Footer7: React.FC<{ footer: Footer; publicContext: PublicContextProps }> = (props) => {
  return <Footer7Client {...props} />
}

export default Footer7
