'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { MENU_PAGES } from '@/lib/menu-data'
import { QuickNav } from '@/components/menu/quick-nav'
import { ThumbnailStrip } from '@/components/menu/thumbnail-strip'
import { MenuFullscreen } from '@/components/menu/menu-fullscreen'

const easeLux = [0.22, 1, 0.36, 1] as const

export function MenuViewer() {
  const pages = MENU_PAGES
  const [active, setActive] = useState(0)
  const [fullscreen, setFullscreen] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((i) => (i + dir + pages.length) % pages.length)
    },
    [pages.length],
  )

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (fullscreen !== null) return
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [go, fullscreen])

  // Mouse wheel (desktop)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (fullscreen !== null) return
      // Only react to intentional horizontal-ish or strong vertical scrolls
      if (Math.abs(e.deltaY) < 30) return
      // Debounce via timestamp
      const now = Date.now()
      if (now - wheelLock.current < 600) return
      wheelLock.current = now
      go(e.deltaY > 0 ? 1 : -1)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [go, fullscreen])

  const wheelLock = useRef(0)

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      go(diff > 0 ? 1 : -1)
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const current = pages[active]

  return (
    <section className="bg-background pb-20 pt-12 md:pb-28">
      {/* Quick Navigation */}
      <QuickNav pages={pages} active={active} onSelect={setActive} />

      {/* Main viewer */}
      <div
        className="relative mx-auto mt-10 max-w-4xl px-4 md:px-10"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Page display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: easeLux }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setFullscreen(active)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-40px_rgba(49,88,74,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                aria-label={`Deschide pagina ${active + 1} în ecran complet: ${current.label}`}
              >
                <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] md:aspect-[3/4]">
                  <Image
                    src={current.src}
                    alt={current.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Expand hint */}
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
                {/* Label */}
                <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4 text-left">
                  <span className="font-serif text-base text-white md:text-lg">
                    {current.label}
                  </span>
                </span>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Side nav buttons (desktop) */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Pagina anterioară"
            className="absolute -left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all duration-300 hover:border-[var(--gold)] hover:text-primary md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Pagina următoare"
            className="absolute -right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all duration-300 hover:border-[var(--gold)] hover:text-primary md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile nav buttons */}
        <div className="mt-6 flex items-center justify-between md:hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Pagina anterioară"
            className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-[var(--gold)] hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            Înapoi
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Pagina următoare"
            className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-[var(--gold)] hover:text-primary"
          >
            Înainte
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Page indicator */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            Pagina{' '}
            <span className="text-primary">{active + 1}</span> / {pages.length}
          </p>
          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Pagina ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-6 bg-primary'
                    : 'w-1.5 bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail strip (desktop) */}
      <div className="mt-8">
        <ThumbnailStrip pages={pages} active={active} onSelect={setActive} />
      </div>

      {/* Fullscreen viewer */}
      <MenuFullscreen
        pages={pages}
        index={fullscreen}
        onClose={() => setFullscreen(null)}
        onNavigate={setFullscreen}
      />
    </section>
  )
}
