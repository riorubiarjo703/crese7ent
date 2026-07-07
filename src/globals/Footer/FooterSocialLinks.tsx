import type React from 'react'

import { SocialIcon } from '@/components/SocialIcon'
import type { Footer } from '@/payload-types'
import { cn } from '@/utilities/cn'

interface FooterSocialLinksProps {
  links?: Footer['socialLinks']
  className?: string
  itemClassName?: string
  iconClassName?: string
  wrapIcon?: (icon: React.ReactNode) => React.ReactNode
}

export function FooterSocialLinks({
  links,
  className,
  itemClassName,
  iconClassName = 'size-6',
  wrapIcon,
}: FooterSocialLinksProps) {
  if (!links?.length) return null

  return (
    <ul className={className}>
      {links.map((social, index) => {
        if (!social?.url || !social.icon) return null

        const icon = <SocialIcon type={social.icon} className={iconClassName} />

        return (
          <li key={social.id ?? `social-${index}`} className={itemClassName}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.icon}
            >
              {wrapIcon ? wrapIcon(icon) : icon}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
