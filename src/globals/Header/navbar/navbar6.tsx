'use client'

import Link from 'next/link'
import { useState } from 'react'

import { CMSLink } from '@/components/Link'
import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { OrisaArrowIcon } from '@/components/orisa/OrisaArrowIcon'
import { buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useHeaderScrollState } from '@/hooks/useHeaderScrollState'
import type { Footer, Header as HeaderType } from '@/payload-types'
import { SearchButton } from '@/search/Component'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities/cn'

import { OrisaHangingMenu, OrisaMenuTrigger } from './OrisaHangingMenu'

const Navbar6: React.FC<{
  header: HeaderType
  publicContext: PublicContextProps
  socialLinks?: Footer['socialLinks']
}> = ({ header, publicContext, socialLinks }) => {
  const { useOverlayStyle, isScrolled } = useHeaderScrollState()
  const [isHangingMenuOpen, setIsHangingMenuOpen] = useState(false)

  const navLinkClass = cn(
    'h-10 rounded-full bg-transparent px-4 font-medium',
    useOverlayStyle
      ? 'text-white/90 hover:bg-white/20 hover:text-white'
      : 'text-foreground/90 hover:bg-foreground/5 hover:text-foreground',
    navigationMenuTriggerStyle,
    buttonVariants({ variant: 'ghost' }),
  )

  const pillNavClass = cn(
    useOverlayStyle && 'rounded-full border border-white/30 bg-white/25 px-2 backdrop-blur-[2px]',
  )

  const menuIconClass = cn(useOverlayStyle ? 'text-white' : 'text-foreground')

  function openMenu() {
    setIsHangingMenuOpen(true)
  }

  return (
    <>
      <section
        className={cn(
          'absolute inset-x-0 top-0 z-40 font-[family-name:var(--font-dm-sans)] transition-all duration-500 ease-out',
          useOverlayStyle ? 'bg-transparent' : 'bg-background/80 shadow-sm backdrop-blur-xl',
        )}
      >
        <div className="px-4 py-4 md:py-5">
          <nav className="relative flex items-center justify-between gap-4">
            <Link href="/" className="relative z-10 flex items-center" aria-label="Storeframe home">
              <Media
                resource={header.logo}
                priority
                className={cn(
                  'h-8 w-auto shrink-0 md:h-10',
                  useOverlayStyle && 'brightness-0 invert',
                )}
                imgClassName="h-full w-auto object-contain object-left"
              />
            </Link>

            <div className={cn('absolute left-1/2 hidden -translate-x-1/2 xl:block', pillNavClass)}>
              <NavigationMenu>
                <NavigationMenuList className="gap-0">
                  {header.items?.map((item) => {
                    if (item.blockType === 'link') {
                      return (
                        <CMSLink
                          key={item.id}
                          publicContext={publicContext}
                          {...item.link}
                          className={navLinkClass}
                        />
                      )
                    }

                    if (item.blockType === 'sub') {
                      return (
                        <NavigationMenuItem key={item.id}>
                          <NavigationMenuTrigger className={navLinkClass}>
                            {item.icon && <Icon className="mr-2 size-4" icon={item.icon} />}
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-[min(720px,calc(100vw-2rem))] p-6">
                              <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
                                <span>{item.label}</span>
                                <OrisaArrowIcon className="size-3.5 opacity-70" />
                              </div>
                              <ul className="grid gap-1 sm:grid-cols-2">
                                {item.subitems?.map((subitem) => (
                                  <NavigationMenuLink asChild key={subitem.id}>
                                    <li>
                                      <CMSLink
                                        publicContext={publicContext}
                                        {...subitem.link}
                                        label=""
                                        iconBefore={undefined}
                                        iconAfter={undefined}
                                        className="hover:bg-muted flex rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                                      >
                                        <span>{subitem.link.label}</span>
                                      </CMSLink>
                                    </li>
                                  </NavigationMenuLink>
                                ))}
                              </ul>
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )
                    }

                    return null
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="relative z-10 hidden items-center gap-2 xl:flex">
              {header.isSearchEnabled && (
                <SearchButton
                  className={cn(useOverlayStyle && 'text-white hover:bg-white/10 hover:text-white')}
                  publicContext={publicContext}
                />
              )}
              {!isScrolled && (
                <OrisaMenuTrigger variant="icon" className={menuIconClass} onClick={openMenu} />
              )}
              {!useOverlayStyle &&
                header.buttons?.map((btn) => (
                  <CMSLink key={btn.id} publicContext={publicContext} {...btn.link} size="sm" />
                ))}
              {!useOverlayStyle && (
                <LanguageSwitcher
                  publicContext={publicContext}
                  size="sm"
                  transparent={useOverlayStyle}
                />
              )}
            </div>

            <div className="relative z-10 flex items-center gap-2 xl:hidden">
              {header.isSearchEnabled && (
                <SearchButton
                  variant="outline"
                  className={cn(
                    useOverlayStyle &&
                      'border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white',
                  )}
                  publicContext={publicContext}
                />
              )}
              {!isScrolled && (
                <OrisaMenuTrigger variant="icon" className={menuIconClass} onClick={openMenu} />
              )}
            </div>
          </nav>
        </div>
      </section>

      <div
        className={cn(
          'pointer-events-none fixed inset-x-0 top-0 z-[60]',
          !isScrolled && 'invisible',
        )}
      >
        <div className="flex justify-end px-4 py-4 md:py-5">
          <OrisaMenuTrigger
            variant="sticky"
            className={cn(
              'pointer-events-auto transition-all delay-[400ms] duration-500 ease-[cubic-bezier(0.785,0.135,0.15,0.86)]',
              isScrolled ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
            )}
            onClick={openMenu}
          />
        </div>
      </div>

      <OrisaHangingMenu
        header={header}
        socialLinks={socialLinks}
        publicContext={publicContext}
        isOpen={isHangingMenuOpen}
        onOpenChange={setIsHangingMenuOpen}
      />
    </>
  )
}

export default Navbar6
