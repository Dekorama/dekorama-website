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
          window.setTimeout(run, 800)
        }
      })
      po.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {
      // unsupported
    }
  }
  return window.setTimeout(run, 3000)
}

export default function HomeClient() {
  const [sections, setSections] = useState(/** @type {null | import('react').ReactNode} */ (null))

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      const [
        { default: FeaturedSpaces },
        { default: QuoteStrip },
        { default: TwoColShowroom },
        { default: FeaturedMaterial },
        { default: DualLandscape },
        { default: Proceso },
        { default: CTAFinal },
      ] = await Promise.all([
        import('@/components/home/FeaturedSpaces'),
        import('@/components/home/QuoteStrip'),
        import('@/components/home/TwoColShowroom'),
        import('@/components/home/FeaturedMaterial'),
        import('@/components/home/DualLandscape'),
        import('@/components/Proceso'),
        import('@/components/CTAFinal'),
      ])

      if (cancelled) return

      setSections(
        <>
          <FeaturedSpaces />
          <QuoteStrip />
          <TwoColShowroom />
          <FeaturedMaterial />
          <DualLandscape />
          <Proceso />
          <CTAFinal />
        </>,
      )
    }

    if (window.location.hash) {
      void load()
      return undefined
    }

    const timer = afterLcp(() => {
      void load()
    })
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  if (!sections) {
    return <div className="min-h-[50vh]" aria-hidden />
  }

  return sections
}
