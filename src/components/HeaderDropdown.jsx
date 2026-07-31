'use client'

import { useEffect, useId, useRef, useState } from 'react'

/**
 * Subtle header dropdown trigger + panel (language / market).
 * @param {{
 *   label: string
 *   icon: import('react').ReactNode
 *   value: string
 *   className?: string
 *   align?: 'left' | 'right'
 *   tone?: 'light' | 'dark'
 *   children: import('react').ReactNode
 * }} props
 */
export default function HeaderDropdown({
  label,
  icon,
  value,
  className = '',
  align = 'right',
  tone = 'light',
  children,
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const menuId = useId()
  const onDark = tone === 'dark'

  useEffect(() => {
    if (!open) return

    const onPointerDown = (/** @type {PointerEvent} */ event) => {
      if (!rootRef.current?.contains(/** @type {Node} */ (event.target))) {
        setOpen(false)
      }
    }
    const onKeyDown = (/** @type {KeyboardEvent} */ event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        className={
          onDark
            ? 'inline-flex min-h-[44px] items-center gap-1.5 rounded-sm px-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:h-9 sm:min-h-0'
            : 'inline-flex min-h-[44px] items-center gap-1.5 rounded-sm px-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:h-9 sm:min-h-0'
        }
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={onDark ? 'text-white/60' : 'text-gray-500'} aria-hidden>
          {icon}
        </span>
        <span className="min-w-[1.5rem] text-left tracking-wide">{value}</span>
        <ChevronIcon open={open} onDark={onDark} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={`absolute z-[60] mt-1.5 min-w-[10.5rem] overflow-hidden rounded-sm border border-gray-200 bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${
            align === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {typeof children === 'function' ? children(() => setOpen(false)) : children}
        </div>
      ) : null}
    </div>
  )
}

/**
 * @param {{
 *   active?: boolean
 *   onSelect: () => void
 *   children: import('react').ReactNode
 * }} props
 */
export function HeaderDropdownItem({ active = false, onSelect, children }) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onSelect}
      className={`flex w-full min-h-[44px] items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors sm:min-h-0 sm:py-2 ${
        active
          ? 'bg-gray-50 font-semibold text-black'
          : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-black'
      }`}
    >
      <span>{children}</span>
      {active ? <CheckIcon /> : <span className="w-3.5" aria-hidden />}
    </button>
  )
}

function ChevronIcon({ open, onDark = false }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform duration-200 ${
        onDark ? 'text-white/45' : 'text-gray-400'
      } ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function GlobeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.75 5.7 3.75 9S14.5 18.3 12 21c-2.5-2.7-3.75-5.7-3.75-9S9.5 5.7 12 3z" />
    </svg>
  )
}

export function PinIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  )
}
