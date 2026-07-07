import type { BlogBlock } from '@/payload-types'
import type { PublicContextProps } from '@/utilities/publicContextProps'
import { Blog29 } from './blog29'

const Blog27Block: React.FC<BlogBlock & { publicContext: PublicContextProps }> = (props) => {
  return <Blog29 {...props} />
}

export { Blog27Block }
