'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import { Lightbox } from '@/components/ui/lightbox'
import { MENU_IMAGES } from '@/lib/site'

export function MenuGallery() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-5 md:gap-12 md:px-10">
        {MENU_IMAGES.map((image, i) => (
          <motion.button
            type="button"
            key={image.src}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-40px_rgba(49,88,74,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
            aria-label={`Deschide imaginea: ${image.alt}`}
          >
            <Image
              src={image.src || '/placeholder.svg'}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c261f]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
              <Expand className="h-5 w-5" />
            </span>
            <span className="absolute bottom-5 left-6 translate-y-3 text-left font-serif text-lg text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {image.alt}
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={MENU_IMAGES}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  )
}
