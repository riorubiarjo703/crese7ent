import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getGenericSeedBundles } from './orisa/bundle-registry'
import { upsertOrisaBundlePage } from './orisa/upsert-bundle-page'

async function seedOrisaAllRemaining() {
  const payload = await getPayload({ config: configPromise })
  const bundles = getGenericSeedBundles()

  console.log(`Seeding ${bundles.length} Orisa bundles…`)

  for (const bundle of bundles) {
    console.log(`\n→ ${bundle.title} (${bundle.html})`)
    await upsertOrisaBundlePage(payload, bundle)
  }

  console.log(`\nDone. Seeded ${bundles.length} pages + layout bundles.`)
  process.exit(0)
}

await seedOrisaAllRemaining().catch((error) => {
  console.error(error)
  process.exit(1)
})
