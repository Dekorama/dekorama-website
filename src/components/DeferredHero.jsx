'use client'

import { useEffect, useState } from 'react'

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
          window.setTimeout(run, 600)
        }
      })
      po.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {
      // unsupported
    }
  }
  return window.setTimeout(run, 3000)
}

/** Load carousel chrome after LCP to protect hero image. */
export default function DeferredHero() {
  const [Hero, setHero] = useState(/** @type {null | import('react').ComponentType<{ hasServerLcp?: boolean }>} */ (null))

  useEffect(() => {
    let cancelled = false
    const timer = afterLcp(() => {
      import('@/components/Hero').then((mod) => {
        if (!cancelled) setHero(() => mod.default)
      })
    })
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  if (!Hero) return null
  return <Hero hasServerLcp />
}
