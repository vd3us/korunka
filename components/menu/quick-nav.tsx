'use client'

import { motion } from 'framer-motion'
import type { MenuPage } from '@/lib/menu-data'

type Props = {
  pages: MenuPage[]
  active: number
  onSelect: (i: number) => void
}

export function QuickNav({ pages, active, onSelect }: Props) {
  return (
    <div className="relative">
      <div
        className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1 md:justify-center md:px-10"
        role="tablist"
        aria-label="Navigare rapidă categorii meniu"
      >
        {pages.map((page, i) => {
          const isActive = i === active
          return (
            <button
              key={page.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(i)}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 md:text-sm ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-card text-foreground hover:border-[var(--gold)]/50 hover:text-primary'
              }`}
            >
              {page.category}
              {isActive && (
                <motion.span
                  layoutId="quicknav-active"
                  className="absolute inset-0 -z-10 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
