'use client'

import { useEffect, useState } from 'react'

import { AdminBar } from '@/components/AdminBar'

interface AdminBarGateProps {
  preview: boolean
}

/**
 * Preview admin bar must mount client-only — draft/preview state and Payload auth
 * are not available during SSR in a way that matches the hydrated DOM.
 */
export function AdminBarGate({ preview }: AdminBarGateProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!preview || !mounted) return null

  return (
    <AdminBar
      adminBarProps={{
        preview: true,
      }}
    />
  )
}
