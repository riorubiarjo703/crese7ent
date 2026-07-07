import type { AboutBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { AboutOrisa01Client } from './aboutOrisa01.client'

const AboutOrisa01: React.FC<AboutBlock & { publicContext: PublicContextProps }> = (props) => {
  return <AboutOrisa01Client {...props} />
}

export default AboutOrisa01
