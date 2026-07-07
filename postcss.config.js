import path from 'path'
import { fileURLToPath } from 'url'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

export default {
  plugins: {
    '@tailwindcss/postcss': {
      base: projectRoot,
    },
  },
}
