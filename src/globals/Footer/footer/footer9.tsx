import type { Footer } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import Footer9Client from './footer9.client'

const Footer9: React.FC<{ footer: Footer; publicContext: PublicContextProps }> = (props) => {
  return <Footer9Client {...props} />
}

export default Footer9
