import { type ButtonProps } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { Icon } from '@/components/Icon'
import { CMSLinkButton } from '@/components/Link/CMSLinkButton'
import { resolveCmsLinkHref } from '@/components/Link/resolveCmsLinkHref'
import { ScrollTextLink } from '@/components/Link/ScrollTextLink'
import localization from '@/localization.config'
import { PublicContextProps } from '@/utilities/publicContextProps'

type CMSLinkType = {
  appearance?: 'inline' | 'text' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  section?: string | null
  size?: ButtonProps['size'] | 'clear' | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  iconBefore?: string | null
  iconAfter?: string | null
  iconClassName?: string
  /**
   * If true, we use the next/link (default behavior).
   * If false, we use a span element instead. This is useful, if you have the CMSLink inside
   * another <a> element
   */
  withAnchor?: boolean
  publicContext: PublicContextProps
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    section,
    size: sizeFromProps,
    url,
    iconBefore,
    iconAfter,
    iconClassName,
    withAnchor = true,
    publicContext,
  } = props

  const locale = publicContext?.locale || localization.defaultLocale
  let href = url
  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    // Prefix url with locale if it's not the default locale
    const localePrefix = locale !== localization.defaultLocale ? `/${locale}` : ''
    // Prefix url with collection name if it's not the pages collection
    const relationToPrefix = reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''
    // Add remaining url path
    const remainingPath = (() => {
      if (reference?.relationTo === 'pages') {
        const page = reference.value as Page
        const breadcrumbs = page.breadcrumbs

        if (breadcrumbs && breadcrumbs.length > 0) {
          const lastCrumb = breadcrumbs[breadcrumbs.length - 1]
          return lastCrumb?.url ?? `/${page.slug}`
        }

        return `/${page.slug}`
      }

      return `/${reference.value.slug}`
    })()
    const normalizedRemainingPath = reference.value.slug === 'home' ? '' : remainingPath
    href = `${localePrefix}${relationToPrefix}${normalizedRemainingPath}`
  }

  if (type === 'reference' && section) {
    href += `#${section}`
  }

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const buttonSize: ButtonProps['size'] = !size || size === 'clear' ? 'default' : size
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const content = (
    <>
      {iconBefore && <Icon className={cn('mr-2 h-6', iconClassName)} icon={iconBefore} />}
      {label && label}
      {children && children}
      {iconAfter && <Icon className={cn('ml-2 h-6', iconClassName)} icon={iconAfter} />}
    </>
  )

  /* Text link with scroll-animated underline (Tresmares-style) */
  if (appearance === 'text') {
    const textHref = resolveCmsLinkHref({ type, url, reference, section, publicContext })
    if (!textHref) return null

    if (!withAnchor) {
      return <span className={cn('inline-flex items-center', className)}>{content}</span>
    }

    return (
      <ScrollTextLink className={className} href={textHref} newTab={newTab}>
        {content}
      </ScrollTextLink>
    )
  }

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    if (!withAnchor) {
      return <span className={cn('inline-flex items-center', className)}>{content}</span>
    }
    return (
      <Link
        className={cn('inline-flex items-center', className)}
        href={href || url || ''}
        {...newTabProps}
      >
        {content}
      </Link>
    )
  }

  if (!withAnchor) {
    return (
      <span
        className={cn(
          buttonVariants({ variant: appearance, size: buttonSize }),
          'inline-flex items-center',
          className,
        )}
      >
        {content}
      </span>
    )
  }

  return (
    <CMSLinkButton
      appearance={appearance}
      buttonSize={buttonSize}
      className={className}
      href={href || url || ''}
      newTab={newTab}
    >
      {content}
    </CMSLinkButton>
  )
}
