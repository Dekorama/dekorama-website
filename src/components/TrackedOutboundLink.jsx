'use client'

import { trackEvent } from '@/lib/analytics'

/**
 * Anchor that fires a GA4/dataLayer event on click (tel, WhatsApp, mailto, download).
 * @param {{
 *   href: string
 *   eventName: string
 *   eventParams?: Record<string, string | number | boolean | undefined>
 *   className?: string
 *   target?: string
 *   rel?: string
 *   children: import('react').ReactNode
 * }} props
 */
export default function TrackedOutboundLink({
  href,
  eventName,
  eventParams = {},
  className,
  target,
  rel,
  children,
}) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => trackEvent(eventName, { link_url: href, ...eventParams })}
    >
      {children}
    </a>
  )
}
