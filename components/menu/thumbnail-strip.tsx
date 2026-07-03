'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { MenuPage } from '@/lib/menu-data'

type Props = {
  pages: MenuPage[]
  active: number
  onSelect: (i: number) => void
}

export function ThumbnailStrip({ pages, active, onSelect }: Props) {
  return (
    <div className="hidden md:block">
      <div className="no-scrollbar flex justify-center gap-3 overflow-x-auto px-10 py-4">
        {pages.map((page, i) => {
          const isActive = i === active
          return (
            <motion.button
              type="button"
              key={page.src}
              onClick={() => onSelect(i)}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                isActive
                  ? 'border-[var(--gold)] shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Pagina ${i + 1}: ${page.label}`}
            >
              <Image
                src={page.src}
                alt={page.label}
                fill
                sizes="80px"
                className="object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-1 py-1 text-center text-[0.6rem] font-medium text-white">
                {i + 1}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
