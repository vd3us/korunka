'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
import type { MenuPage } from '@/lib/menu-data'

type Props = {
  pages: MenuPage[]
  index: number | null
  onClose: () => void
  onNavigate: (i: number) => void
}

const MIN_SCALE = 1
const MAX_SCALE = 4

export function MenuFullscreen({ pages, index, onClose, onNavigate }: Props) {
  const isOpen = index !== null
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)
  const lastTap = useRef(0)
  const lastDist = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const resetZoom = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const zoom = useCallback((delta: number) => {
    setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)))
  }, [])

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      resetZoom()
      onNavigate((index + dir + pages.length) % pages.length)
    },
    [index, pages.length, onNavigate, resetZoom],
  )

  // Reset zoom on page change
  useEffect(() => {
    resetZoom()
  }, [index, resetZoom])

  // Keyboard
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === '+') zoom(0.5)
      if (e.key === '-') zoom(-0.5)
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, go, zoom])

  // Mouse wheel zoom
  useEffect(() => {
    if (!isOpen) return
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.25 : -0.25
      setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [isOpen])

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current) return
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    })
  }
  const onMouseUp = () => {
    dragStart.current = null
  }

  // Touch gestures
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0]
      dragStart.current = { x: t.clientX, y: t.clientY, ox: offset.x, oy: offset.y }
      lastDist.current = null
      // Double tap
      const now = Date.now()
      if (now - lastTap.current < 300) {
        setScale((s) => (s > 1 ? 1 : 2.5))
        setOffset({ x: 0, y: 0 })
      }
      lastTap.current = now
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastDist.current = Math.hypot(dx, dy)
    }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 2 && lastDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const delta = (dist - lastDist.current) * 0.01
      setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)))
      lastDist.current = dist
    } else if (e.touches.length === 1 && dragStart.current && scale > 1) {
      const t = e.touches[0]
      setOffset({
        x: dragStart.current.ox + (t.clientX - dragStart.current.x),
        y: dragStart.current.oy + (t.clientY - dragStart.current.y),
      })
    }
  }
  const onTouchEnd = () => {
    dragStart.current = null
    lastDist.current = null
  }

  const current = index !== null ? pages[index] : null

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-[#0f1a14]/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Meniu — ${current.label}`}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <p className="font-serif text-base text-white/70 md:text-lg">{current.label}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => zoom(-0.5)}
                aria-label="Micșorează"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-40"
                disabled={scale <= MIN_SCALE}
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => zoom(0.5)}
                aria-label="Mărește"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-40"
                disabled={scale >= MAX_SCALE}
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              {scale > 1 && (
                <button
                  type="button"
                  onClick={resetZoom}
                  aria-label="Reset zoom"
                  className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/20"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Închide"
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div
            ref={containerRef}
            className="relative flex flex-1 items-center justify-center overflow-hidden"
            style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onDoubleClick={() => {
              setScale((s) => (s > 1 ? 1 : 2.5))
              setOffset({ x: 0, y: 0 })
            }}
          >
            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              aria-label="Pagina anterioară"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold)] md:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={`fs-${index}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
                transformOrigin: 'center center',
                userSelect: 'none',
              }}
              className="relative h-[calc(100vh-9rem)] w-full max-w-2xl select-none"
              draggable={false}
            >
              <Image
                src={current.src}
                alt={current.label}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="select-none object-contain"
                draggable={false}
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              aria-label="Pagina următoare"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold)] md:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom counter */}
          <div className="flex items-center justify-center gap-3 py-3">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  resetZoom()
                  onNavigate(i)
                }}
                aria-label={`Pagina ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-6 bg-[var(--gold)]'
                    : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
