'use client'

import { LayoutGrid, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

import { CMSLink } from '@/components/Link'
import { SocialIcon } from '@/components/SocialIcon'
import { Media } from '@/components/Media'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Footer, Header as HeaderType } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities/cn'

interface OrisaHangingMenuProps {
  header: HeaderType
  socialLinks?: Footer['socialLinks']
  publicContext: PublicContextProps
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function OrisaHangingMenu({
  header,
  socialLinks,
  publicContext,
  isOpen,
  onOpenChange,
}: OrisaHangingMenuProps) {
  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onOpenChange(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onOpenChange])

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className={cn(
          'fixed inset-0 z-[70] bg-[rgba(24,24,24,0.5)] transition-[visibility,opacity] duration-[450ms] ease-in-out',
          isOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0',
        )}
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          'fixed top-0 bottom-0 z-[71] mx-4 my-4 flex w-full max-w-[460px] flex-col overflow-y-auto rounded-xl bg-neutral-50 p-8 shadow-[-16px_0_32px_rgba(0,0,0,0.08)] transition-[right,opacity,visibility] duration-[600ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] md:p-12',
          isOpen
            ? 'visible right-0 opacity-100'
            : 'pointer-events-none invisible -right-full opacity-0',
        )}
        aria-hidden={!isOpen}
      >
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => onOpenChange(false)}>
            <Media
              resource={header.logo}
              className="shrink-0"
              imgClassName="size-full object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-neutral-950 transition-opacity hover:opacity-60"
            aria-label="Close menu"
          >
            <X className="size-8" strokeWidth={1.25} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <Accordion type="multiple" className="w-full space-y-1">
            {header.items?.map((item) => {
              if (item.blockType === 'link') {
                return (
                  <div
                    key={item.id}
                    className="border-b border-neutral-200/80 py-2"
                    onClick={() => onOpenChange(false)}
                    onKeyDown={() => undefined}
                    role="presentation"
                  >
                    <CMSLink
                      publicContext={publicContext}
                      {...item.link}
                      className="flex items-center justify-between py-3 text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl"
                    />
                  </div>
                )
              }

              if (item.blockType === 'sub') {
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id || item.label}
                    className="border-b border-neutral-200/80"
                  >
                    <AccordionTrigger className="py-4 text-3xl font-semibold tracking-tight text-neutral-950 hover:no-underline md:text-4xl [&>svg]:hidden">
                      <span className="flex w-full items-center justify-between gap-4">
                        <span>{item.label}</span>
                        <Plus className="size-6 shrink-0" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <ul className="space-y-2 pl-1">
                        {item.subitems?.map((subitem) => (
                          <li key={subitem.id} onClick={() => onOpenChange(false)}>
                            <CMSLink
                              publicContext={publicContext}
                              {...subitem.link}
                              className="text-lg text-neutral-600 transition-colors hover:text-neutral-950"
                            />
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )
              }

              return null
            })}
          </Accordion>
        </nav>

        {socialLinks && socialLinks.length > 0 && (
          <ul className="mt-10 grid grid-cols-2 gap-3 border-t border-neutral-200 pt-8 sm:grid-cols-3">
            {socialLinks.map((social, index) => {
              if (!social?.url || !social.icon) return null
              const label = social.icon.charAt(0).toUpperCase() + social.icon.slice(1)

              return (
                <li key={social.id ?? index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-800 hover:text-neutral-950"
                  >
                    <SocialIcon type={social.icon} className="size-4" />
                    <span>{label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export function OrisaMenuTrigger({
  onClick,
  className,
  variant = 'pill',
}: {
  onClick: () => void
  className?: string
  variant?: 'icon' | 'pill' | 'sticky'
}) {
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-full bg-transparent transition-opacity hover:opacity-70',
          className,
        )}
        aria-label="Open menu"
      >
        <LayoutGrid aria-hidden className="size-[18px]" strokeWidth={2} />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-[15px] text-base font-semibold text-neutral-950 shadow-sm transition-transform hover:scale-[1.02]',
        className,
      )}
      aria-label="Open menu"
    >
      <span>MENU</span>
      <LayoutGrid aria-hidden className="size-[18px]" strokeWidth={2} />
    </button>
  )
}
