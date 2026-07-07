import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'
import { serverUrl } from './src/config/server'
import bundleAnalyzer from '@next/bundle-analyzer'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const tailwindcssPath = path.join(projectRoot, 'node_modules/tailwindcss')

/**
 * Set NEXT_PUBLIC_SERVER_URL to the URL of the server.
 * If NEXT_PUBLIC_SERVER_URL is not set, it will default to the URL of the Vercel deployment.
 * If Vercel URL is not set, it will default to http://localhost:3000.
 */
export const NEXT_PUBLIC_SERVER_URL = serverUrl

const nextConfig: NextConfig = {
  // Prevent Next from walking up to /Users/admin/package.json for module resolution
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: tailwindcssPath,
    },
  },
  images: {
    qualities: [100, 90, 75],
    remotePatterns: [
      ...[new URL(serverUrl)].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
      {
        hostname: '*.vercel.app',
        protocol: 'https',
      },
      {
        hostname: '*.public.blob.vercel-storage.com',
        protocol: 'https',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      'react-icons/bi',
      'react-icons/si',
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
    ],
  },
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withPayload(withBundleAnalyzer(nextConfig))
