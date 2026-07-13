import { Block } from 'payload'
import { HeadingFeature, ParagraphFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { allBlogDesignVersions } from './metadata'

export type { BlogDesignVersion } from './metadata'
export { allBlogDesignVersions }

const orisaDesign = (designVersion?: string) => designVersion === 'BLOG_ORISA_01'
const defaultDesign = (designVersion?: string) =>
  !designVersion || designVersion === 'BLOG29' || designVersion === 'BLOG27'

// Available collections that can be used as blog post sources
const availableCollections = [
  { label: 'Posts', value: 'posts' },
  // Add more collections here as they become available
]

// Available fields for sorting
const sortableFields = [
  { label: 'Published Date', value: 'publishedAt' },
  { label: 'Updated Date', value: 'updatedAt' },
  { label: 'Title', value: 'title' },
  { label: 'Read Time', value: 'readTime' },
]

// Available sort orders
const sortOrders = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
]

export const Blog: Block = {
  slug: 'blog',
  interfaceName: 'BlogBlock',
  labels: {
    singular: 'Blog',
    plural: 'Blog Blocks',
  },
  fields: [
    designVersionPreview(allBlogDesignVersions),
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'INSIDE COMPANY',
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => orisaDesign(designVersion),
      },
    },
    link({
      overrides: {
        name: 'eyebrowLink',
        label: 'Eyebrow link',
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) => orisaDesign(designVersion),
        },
      },
    }),
    {
      name: 'headlineLines',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Headline line', plural: 'Headline lines' },
      admin: {
        condition: (_, { designVersion } = { designVersion: '' }) => orisaDesign(designVersion),
      },
      fields: [
        {
          name: 'line',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional heading and description for the blog section',
        condition: (_, { designVersion } = { designVersion: '' }) => defaultDesign(designVersion),
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          ParagraphFeature(),
        ],
      }),
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      admin: {
        description: 'Choose how to populate blog posts',
      },
      options: [
        {
          label: 'From Collection',
          value: 'collection',
        },
        {
          label: 'Manual Selection',
          value: 'selection',
        },
      ],
      required: true,
    },
    {
      name: 'postCollection',
      type: 'select',
      required: true,
      defaultValue: 'posts',
      admin: {
        description: 'Select which collection to display posts from',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      options: availableCollections,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Filter posts by these categories (optional)',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      admin: {
        description: 'Maximum number of posts to display',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'sortField',
      type: 'select',
      required: true,
      defaultValue: 'publishedAt',
      admin: {
        description: 'Field to sort posts by',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      options: sortableFields,
    },
    {
      name: 'sortOrder',
      type: 'select',
      required: true,
      defaultValue: 'desc',
      admin: {
        description: 'Order to sort posts (ascending or descending)',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      options: sortOrders,
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        description: 'Select specific posts to display',
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
    },
    linkGroup({
      appearances: false,
      overrides: {
        admin: {
          description: 'Optional "View All" or "Read More" link',
        },
      },
    }),
  ],
}
