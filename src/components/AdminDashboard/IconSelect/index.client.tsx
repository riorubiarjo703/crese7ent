'use client'
import * as React from 'react'
import { useField } from '@payloadcms/ui'

type CustomSelectProps = {
  path: string
  label?: string
  description?: string
}

// Lazy-load lucide-react once
const lucidePromise = import('lucide-react')
let cachedIconKeys: string[] | null = null
const iconCache: Record<string, React.ComponentType<{ size?: number }>> = {}

/** Only accept actual React component types (functions, memo, forwardRef) */
function isComponentLike(val: unknown): val is React.ComponentType<{ size?: number }> {
  if (typeof val === 'function') return true
  if (val != null && typeof val === 'object' && '$$typeof' in val) return true
  return false
}

const MAX_VISIBLE = 150

/** Safe error boundary so a single broken icon doesn't crash the whole list */
class IconErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function IconPreview({ name, size = 16 }: { name: string; size?: number }) {
  const [, rerender] = React.useState(0)

  React.useEffect(() => {
    if (iconCache[name]) return
    let cancelled = false
    lucidePromise.then((mod) => {
      const comp = (mod as Record<string, unknown>)[name]
      if (isComponentLike(comp)) {
        iconCache[name] = comp
      }
      if (!cancelled) rerender((n) => n + 1)
    })
    return () => {
      cancelled = true
    }
  }, [name])

  const Icon = iconCache[name]
  if (!Icon) {
    return (
      <span
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          borderRadius: 2,
          background: 'var(--theme-elevation-100)',
        }}
      />
    )
  }

  return (
    <IconErrorBoundary
      fallback={
        <span style={{ display: 'inline-block', width: size, height: size, opacity: 0.3 }}>?</span>
      }
    >
      <Icon size={size} />
    </IconErrorBoundary>
  )
}

const IconSelect: React.FC<CustomSelectProps> = (props) => {
  const { path, label, description } = props
  const { value, setValue } = useField<string>({ path })
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [iconKeys, setIconKeys] = React.useState<string[]>(cachedIconKeys ?? [])
  const [hovered, setHovered] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const current = value ? String(value) : ''

  React.useEffect(() => {
    if (cachedIconKeys) {
      setIconKeys(cachedIconKeys)
      return
    }
    lucidePromise.then((mod) => {
      const record = mod as Record<string, unknown>
      const keys = Object.keys(record).filter((k) => {
        // Icon components are PascalCase — first char must be uppercase A-Z
        if (!/^[A-Z]/.test(k)) return false
        // Exclude known non-icon exports
        if (k === 'Icon' || k.startsWith('Lucide') || k.endsWith('Icon')) return false
        // Must look like a React component
        return isComponentLike(record[k])
      })
      keys.sort((a, b) => a.localeCompare(b))
      cachedIconKeys = keys
      setIconKeys(keys)
    })
  }, [])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setSearch('')
      setHovered(null)
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const filtered = React.useMemo(() => {
    const term = search.toLowerCase()
    const list =
      term.length === 0 ? iconKeys : iconKeys.filter((k) => k.toLowerCase().includes(term))
    return list
  }, [search, iconKeys])

  const visible = filtered.slice(0, MAX_VISIBLE)
  const hasMore = filtered.length > MAX_VISIBLE

  const select = (k: string) => {
    setValue(k)
    setOpen(false)
  }

  return (
    <div className="field-type" ref={containerRef} style={{ position: 'relative' }}>
      {label && <label className="field-label">{label}</label>}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          padding: '8px 12px',
          borderRadius: 4,
          border: '1px solid var(--theme-elevation-150)',
          background: 'var(--theme-elevation-0)',
          color: 'var(--theme-text)',
          fontSize: 14,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {current ? (
          <>
            <IconPreview name={current} size={16} />
            <span style={{ flex: 1 }}>{current}</span>
          </>
        ) : (
          <span style={{ flex: 1, opacity: 0.5 }}>Select an icon…</span>
        )}
        <span style={{ opacity: 0.5, fontSize: 10 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 9999,
            background: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Search bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderBottom: '1px solid var(--theme-elevation-150)',
            }}
          >
            <span style={{ opacity: 0.4, fontSize: 12 }}>🔍</span>
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons…"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--theme-text)',
                fontSize: 14,
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  opacity: 0.5,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            )}
            <span style={{ fontSize: 11, opacity: 0.4, whiteSpace: 'nowrap' }}>
              {filtered.length} icons
            </span>
          </div>

          {/* Icon list */}
          <div ref={listRef} style={{ maxHeight: 320, overflowY: 'auto', padding: '4px 0' }}>
            {/* None option */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                setValue('')
                setOpen(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setValue('')
                  setOpen(false)
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: 13,
                opacity: 0.5,
              }}
            >
              — None —
            </div>

            {iconKeys.length === 0 && (
              <div style={{ padding: '12px', textAlign: 'center', fontSize: 13, opacity: 0.5 }}>
                Loading icons…
              </div>
            )}

            {visible.map((k) => (
              <div
                key={k}
                role="button"
                tabIndex={0}
                onClick={() => select(k)}
                onKeyDown={(e) => e.key === 'Enter' && select(k)}
                onMouseEnter={() => setHovered(k)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: 13,
                  background:
                    k === current
                      ? 'var(--theme-elevation-100)'
                      : hovered === k
                        ? 'var(--theme-elevation-50)'
                        : undefined,
                }}
              >
                <IconPreview name={k} size={16} />
                <span style={{ flex: 1 }}>{k}</span>
                {k === current && <span style={{ opacity: 0.6, fontSize: 11 }}>✓</span>}
              </div>
            ))}

            {hasMore && (
              <div
                style={{
                  padding: '8px 12px',
                  textAlign: 'center',
                  fontSize: 12,
                  opacity: 0.5,
                }}
              >
                Type to search — showing {MAX_VISIBLE} of {filtered.length}
              </div>
            )}

            {iconKeys.length > 0 && filtered.length === 0 && (
              <div style={{ padding: '12px', textAlign: 'center', fontSize: 13, opacity: 0.5 }}>
                No icons found
              </div>
            )}
          </div>
        </div>
      )}

      {description && <div className="field-description">{description}</div>}
    </div>
  )
}

export default IconSelect
