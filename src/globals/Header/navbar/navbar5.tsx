'use client'

import { MenuIcon } from 'lucide-react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { Icon } from '@/components/Icon'
import { cn } from '@/utilities/cn'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { Header as HeaderType } from '@/payload-types'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import { LanguageSwitcher, LanguageSwitcherMobile } from '@/components/LanguageSwitcher'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { useHeaderScrollState } from '@/hooks/useHeaderScrollState'
import { SearchButton } from '@/search/Component'

const Navbar5: React.FC<{ header: HeaderType; publicContext: PublicContextProps }> = ({
  header,
  publicContext,
}) => {
  const { useOverlayStyle } = useHeaderScrollState()

  const navLinkClass = cn(
    useOverlayStyle
      ? 'text-white/90 hover:bg-white/10 hover:text-white'
      : 'text-foreground/90 hover:bg-foreground/5 hover:text-foreground font-medium',
    navigationMenuTriggerStyle,
    buttonVariants({
      variant: 'ghost',
    }),
  )

  return (
    <section
      className={cn(
        'fixed inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-out',
        useOverlayStyle ? 'top-0' : 'top-3 px-4 sm:top-4 sm:px-6',
      )}
    >
      <div
        className={cn(
          'pointer-events-auto transition-all duration-500 ease-out',
          useOverlayStyle
            ? 'container py-4'
            : 'mx-auto max-w-6xl rounded-full bg-background/50 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-5',
        )}
      >
        <nav className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="flex items-center lg:justify-self-start">
            <Link href="/" aria-label="Home">
              <Media resource={header.logo} priority className="h-9" imgClassName="h-full w-auto" />
            </Link>
          </div>
          <NavigationMenu className="z-50 hidden lg:block lg:justify-self-center">
            <NavigationMenuList>
              {header.items?.map((item) => {
                if (item.blockType === 'link') {
                  return (
                    <CMSLink
                      publicContext={publicContext}
                      key={item.id}
                      {...item.link}
                      className={navLinkClass}
                    />
                  )
                } else if (item.blockType === 'sub') {
                  return (
                    <NavigationMenuItem
                      key={item.id}
                      className={useOverlayStyle ? 'text-white/90' : 'text-foreground/90'}
                    >
                      <NavigationMenuTrigger
                        className={cn(
                          'bg-transparent',
                          useOverlayStyle && 'text-white/90 hover:bg-white/10 hover:text-white',
                        )}
                      >
                        {item.icon && <Icon className="mr-2 h-6" icon={item.icon} />}
                        <span>{item.label}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-80 p-3">
                          {item.subitems?.map((subitem) => (
                            <NavigationMenuLink asChild key={subitem.id}>
                              <li>
                                <CMSLink
                                  publicContext={publicContext}
                                  className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none"
                                  {...subitem.link}
                                  label=""
                                  iconBefore={undefined}
                                  iconAfter={undefined}
                                >
                                  {subitem.link.iconBefore && (
                                    <Icon
                                      icon={subitem.link.iconBefore}
                                      className="size-5 shrink-0"
                                    />
                                  )}
                                  <div>
                                    <div className="text-sm font-semibold">
                                      {subitem.link.label}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-snug">
                                      {subitem.Description}
                                    </p>
                                  </div>
                                </CMSLink>
                              </li>
                            </NavigationMenuLink>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Button Group */}
          <div className="z-50 hidden gap-2 lg:flex lg:justify-self-end">
            {header?.buttons?.map((btn) => (
              <CMSLink publicContext={publicContext} key={btn.id} {...btn.link} size="sm" />
            ))}
            <LanguageSwitcher publicContext={publicContext} size="sm" transparent={useOverlayStyle} />
            {/* Search Button */}
            {header.isSearchEnabled && (
              <SearchButton className="hidden lg:block" publicContext={publicContext} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {header.isSearchEnabled && (
              <SearchButton
                variant="outline"
                className="ml-auto block lg:hidden"
                publicContext={publicContext}
              />
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    useOverlayStyle &&
                      'border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white',
                  )}
                  aria-label="Open menu"
                >
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-scroll">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center">
                      <Link href="/" aria-label="Home">
                        <Media
                          resource={header.logo}
                          priority
                          className="h-9"
                          imgClassName="h-full w-auto"
                        />
                      </Link>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                {/* Mobile Navigation Links */}
                <div className="my-8 flex flex-col gap-6">
                  <Accordion type="single" collapsible className="flex flex-col gap-4">
                    {header.items?.map((item) => {
                      if (item.blockType === 'link') {
                        return (
                          <div key={item.id} className="flex flex-col">
                            <CMSLink
                              publicContext={publicContext}
                              {...item.link}
                              className="font-medium"
                            />
                          </div>
                        )
                      } else if (item.blockType === 'sub') {
                        return (
                          <AccordionItem
                            key={item.id}
                            value={item.id || item.label}
                            className="border-b-0"
                          >
                            <AccordionTrigger className="mb-4 py-0 font-medium hover:no-underline">
                              <span className="inline-flex">
                                {item.icon && <Icon className="mr-2 h-6" icon={item.icon} />}
                                {item.label}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="mt-2">
                              {item.subitems?.map((subitem) => (
                                <CMSLink
                                  publicContext={publicContext}
                                  key={subitem.id}
                                  className={cn(
                                    'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex gap-4 rounded-md p-3 leading-none outline-hidden transition-colors select-none',
                                  )}
                                  {...subitem.link}
                                  label=""
                                  iconBefore={undefined}
                                  iconAfter={undefined}
                                >
                                  {subitem.link.iconBefore && (
                                    <Icon icon={subitem.link.iconBefore} />
                                  )}
                                  <div>
                                    <div className="text-sm font-semibold">
                                      {subitem.link.label}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-snug">
                                      {subitem.Description}
                                    </p>
                                  </div>
                                </CMSLink>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        )
                      }
                    })}
                    <LanguageSwitcherMobile publicContext={publicContext} />
                  </Accordion>
                </div>
                {/* Mobile Buttons */}
                <div className="flex flex-col gap-2">
                  {header?.buttons?.map((btn) => (
                    <CMSLink publicContext={publicContext} key={btn.id} {...btn.link} />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Navbar5
