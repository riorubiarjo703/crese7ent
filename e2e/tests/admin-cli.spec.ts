import { test, expect } from '@playwright/test'

const getSecret = () => process.env.ADMIN_CLI_SECRET || 'demo-admin-cli-secret'

test.describe('API - Admin CLI (/api/admin/cli)', () => {
  const endpoint = '/api/admin/cli'
  const collection = 'categories'

  test('rejects unauthenticated requests', async ({ request }) => {
    const res = await request.post(endpoint, {
      data: { op: 'collections' },
    })
    expect(res.status()).toBe(403)
    const data = await res.json()
    expect(data.error).toBe('Invalid secret')
  })

  test('returns list of collections', async ({ request }) => {
    const res = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${getSecret()}` },
      data: { op: 'collections' },
    })
    expect(res.ok()).toBe(true)
    const data = await res.json()
    expect(Array.isArray(data.collections)).toBe(true)
    expect(data.collections).toContain(collection)
  })

  test('returns schema for a collection', async ({ request }) => {
    const res = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${getSecret()}` },
      data: { op: 'schema', collection },
    })
    expect(res.ok()).toBe(true)
    const data = await res.json()
    expect(data.slug).toBe(collection)
    expect(Array.isArray(data.fields)).toBe(true)
  })

  test('returns 404 for schema of unknown collection', async ({ request }) => {
    const res = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${getSecret()}` },
      data: { op: 'schema', collection: 'doesnotexist123' },
    })
    expect(res.status()).toBe(404)
    const data = await res.json()
    expect(data.error).toBe('collection not found: doesnotexist123')
  })

  test('handles missing parameters gracefully', async ({ request }) => {
    const secret = getSecret()

    // Missing collection for find
    const findRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: { op: 'find' },
    })
    expect(findRes.status()).toBe(400)
    expect((await findRes.json()).error).toBe('collection required')

    // Missing data for create
    const createRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: { op: 'create', collection },
    })
    expect(createRes.status()).toBe(400)
    expect((await createRes.json()).error).toBe('collection and data required')

    // Unknown op
    const unknownRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: { op: 'unknownOp123' },
    })
    expect(unknownRes.status()).toBe(400)
    expect((await unknownRes.json()).error).toContain('Unknown op: unknownOp123')
  })

  test('respects locale options during create and find', async ({ request }) => {
    const secret = getSecret()
    const testTitle = `Multilingual Page ${Date.now()}`
    const pageCollection = 'pages'

    // 1. Create with locale 'en'
    const createRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: {
        op: 'create',
        collection: pageCollection,
        data: {
          title: testTitle,
          layout: [
            {
              blockType: 'stat',
              designVersion: 'STAT1',
              stats: [
                {
                  counter: '100',
                  title: 'Users EN', // localized field
                },
              ],
            },
          ],
          slug: `test-page-${Date.now()}`,
        },
        locale: 'en',
      },
    })
    const resJson = await createRes.json()
    expect(createRes.ok(), JSON.stringify(resJson)).toBe(true)
    const docId = resJson.id

    // We must pass the exact array row ID from the created doc to update the same row in another language
    // if the array itself is not localized, to prevent overwriting the row structure.
    const statRowId = resJson.layout[0].stats[0].id
    const blockId = resJson.layout[0].id

    // 2. Update with locale 'de'
    const updateRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: {
        op: 'update',
        collection: pageCollection,
        id: docId,
        data: {
          layout: [
            {
              id: blockId,
              blockType: 'stat',
              designVersion: 'STAT1',
              stats: [
                {
                  id: statRowId,
                  counter: '100',
                  title: 'Benutzer DE', // localized field
                },
              ],
            },
          ],
        },
        locale: 'de',
      },
    })
    expect(updateRes.ok()).toBe(true)

    // 3. Verify 'en' locale
    const findENRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: {
        op: 'findByID',
        collection: pageCollection,
        id: docId,
        locale: 'en',
      },
    })
    expect(findENRes.ok()).toBe(true)
    expect((await findENRes.json()).layout[0].stats[0].title).toBe('Users EN')

    // 4. Verify 'de' locale
    const findDERes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: {
        op: 'findByID',
        collection: pageCollection,
        id: docId,
        locale: 'de',
      },
    })
    expect(findDERes.ok()).toBe(true)
    expect((await findDERes.json()).layout[0].stats[0].title).toBe('Benutzer DE')

    // 5. Cleanup
    await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: { op: 'delete', collection: pageCollection, id: docId },
    })
  })

  test('performs CRUD operations successfully', async ({ request }) => {
    const secret = getSecret()
    const testTitle = `Test Category ${Date.now()}`

    // 1. Create
    const createRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: {
        op: 'create',
        collection,
        data: { title: testTitle },
      },
    })
    expect(createRes.ok()).toBe(true)
    const createdDoc = await createRes.json()
    expect(createdDoc.title).toBe(testTitle)
    expect(createdDoc.id).toBeDefined()

    const docId = createdDoc.id

    // 2. FindByID
    const findByIdRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: { op: 'findByID', collection, id: docId },
    })
    expect(findByIdRes.ok()).toBe(true)
    const foundDoc = await findByIdRes.json()
    expect(foundDoc.id).toBe(docId)

    // 3. Update
    const updatedTitle = `${testTitle} - Updated`
    const updateRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: {
        op: 'update',
        collection,
        id: docId,
        data: { title: updatedTitle },
      },
    })
    expect(updateRes.ok()).toBe(true)
    const updatedDoc = await updateRes.json()
    expect(updatedDoc.title).toBe(updatedTitle)

    // 4. Find (query)
    const findRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: {
        op: 'find',
        collection,
        where: { id: { equals: docId } },
      },
    })
    expect(findRes.ok()).toBe(true)
    const findData = await findRes.json()
    expect(findData.docs.length).toBe(1)
    expect(findData.docs[0].id).toBe(docId)

    // 5. Count
    const countRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: {
        op: 'count',
        collection,
        where: { id: { equals: docId } },
      },
    })
    expect(countRes.ok()).toBe(true)
    const countData = await countRes.json()
    expect(countData.totalDocs).toBe(1)

    // 6. Delete
    const deleteRes = await request.post(endpoint, {
      headers: { Authorization: `Bearer ${secret}` },
      data: { op: 'delete', collection, id: docId },
    })
    expect(deleteRes.ok()).toBe(true)
    const deletedDoc = await deleteRes.json()
    expect(deletedDoc.id).toBe(docId)
  })
})
