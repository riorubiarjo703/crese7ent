'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { isHomePath } from '@/utilities/isHomePath'

interface UseHeaderScrollStateOptions {
  scrollThreshold?: number
}

export function useHeaderScrollState({ scrollThreshold = 32 }: UseHeaderScrollStateOptions = {}) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const isHomePage = isHomePath(pathname)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > scrollThreshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollThreshold])

  const useOverlayStyle = isHomePage && !isScrolled

  return { isScrolled, isHomePage, useOverlayStyle }
}
