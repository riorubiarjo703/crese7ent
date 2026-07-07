import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { blogLoaders } from '@/blocks/Blog/loaders'
import { allBlogDesignVersions } from './config'
import { Post, Category } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { loadLazyComponent } from '@/utilities/loadLazyComponent'

type BlogDesignVersionValue = (typeof allBlogDesignVersions)[number]['value']

export interface BlogBlockProps {
  designVersion: BlogDesignVersionValue
  populateBy?: 'collection' | 'selection'
  postCollection?: string
  selectedPosts?: (string | Post)[]
  limit?: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  categories?: (string | Category)[]
  richText?: any
  link?: any
  publicContext: PublicContextProps
}

export async function BlogBlock(props: BlogBlockProps) {
  const {
    designVersion,
    populateBy = 'collection',
    selectedPosts,
    postCollection = 'posts',
    limit = 3,
    sortField = 'publishedAt',
    sortOrder = 'desc',
    categories,
  } = props || {}

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      return category
    })

    try {
      const sortString = sortOrder === 'desc' ? `-${sortField}` : sortField

      const fetchedPosts = await payload.find({
        collection: postCollection as 'posts',
        depth: 1,
        limit,
        sort: sortString,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })

      posts = fetchedPosts.docs as Post[]
    } catch (error) {
      console.error('Error fetching posts:', error)
      posts = []
    }
  } else if (populateBy === 'selection' && selectedPosts?.length) {
    posts = selectedPosts
      .map((post) => (typeof post === 'object' ? post : null))
      .filter(Boolean) as Post[]
  }

  if (!designVersion) return null

  const BlogContentToRender = await loadLazyComponent(blogLoaders[designVersion])

  if (!BlogContentToRender) return null

  return <BlogContentToRender {...props} posts={posts} />
}
