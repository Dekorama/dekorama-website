'use client'

import { useEffect, useState } from 'react'

/** Run after LCP (or 2.5s fallback) so heavy JS stays off critical path. */
function afterLcp(cb) {
  let done = false
  const run = () => {
    if (done) return
    done = true
    cb()
  }

  if (typeof PerformanceObserver !== 'undefined') {
    try {
      const po = new PerformanceObserver((list) => {
        if (list.getEntries().length > 0) {
          po.disconnect()
          // small gap after LCP paint
          window.setTimeout(run, 400)
        }
      })
      po.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {
      // unsupported
    }
  }

  return window.setTimeout(run, 2500)
}

/**
 * Non-critical chrome — post-LCP load so framer/gate/banner stay off critical path.
 */
export default function DeferredChrome() {
  const [nodes, setNodes] = useState(/** @type {null | { CookieBanner: import('react').ComponentType, WhatsAppButton: import('react').ComponentType, MarketGate: import('react').ComponentType }} */ (null))

  useEffect(() => {
    let cancelled = false
    const load = () => {
      Promise.all([
        import('@/components/CookieBanner'),
        import('@/components/WhatsAppButton'),
        import('@/components/MarketGate'),
      ]).then(([cookie, wa, gate]) => {
        if (cancelled) return
        setNodes({
          CookieBanner: cookie.default,
          WhatsAppButton: wa.default,
          MarketGate: gate.default,
        })
      })
    }

    const timer = afterLcp(load)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  if (!nodes) return null

  const { CookieBanner, WhatsAppButton, MarketGate } = nodes
  return (
    <>
      <CookieBanner />
      <WhatsAppButton />
      <MarketGate />
    </>
  )
}
