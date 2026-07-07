import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const clientBundlePath = join(
  process.cwd(),
  'node_modules/@payloadcms/ui/dist/exports/client/index.js',
)

const replacements = [
  ['value:!G||G&&J', 'value:G&&J'],
]

let content = readFileSync(clientBundlePath, 'utf8')
let changed = false

for (const [from, to] of replacements) {
  if (content.includes(from)) {
    content = content.replace(from, to)
    changed = true
  }
}

if (changed) {
  writeFileSync(clientBundlePath, content)
}
