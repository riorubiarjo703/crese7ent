'use client'

import { SocialIcon } from '@/components/SocialIcon'
import { Dock, DockIcon } from '@/components/ui/dock'
import type { Footer } from '@/payload-types'
import { cn } from '@/utilities/cn'

interface FooterSocialDockProps {
  links?: Footer['socialLinks']
  className?: string
}

export function FooterSocialDock({ links, className }: FooterSocialDockProps) {
  if (!links?.length) return null

  return (
    <Dock
      className={cn(
        'border-primary-foreground/25 bg-primary-foreground mt-0 gap-1 px-3 shadow-sm',
        className,
      )}
      iconSize={36}
      iconMagnification={52}
    >
      {links.map((social, index) => {
        if (!social?.url || !social.icon) return null

        return (
          <DockIcon
            key={social.id ?? `social-${index}`}
            className="hover:bg-black/5 bg-transparent"
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.icon}
              className="flex size-full items-center justify-center text-black"
            >
              <SocialIcon type={social.icon} className="size-5 text-black" />
            </a>
          </DockIcon>
        )
      })}
    </Dock>
  )
}
