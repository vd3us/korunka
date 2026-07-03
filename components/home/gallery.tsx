'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { Lightbox } from '@/components/ui/lightbox'
import { GALLERY } from '@/lib/site'

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="galerie" className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Galerie"
          title="Momente și spații care inspiră liniște"
          description="O privire asupra atmosferei, camerelor și facilităților care fac din fiecare vizită o experiență memorabilă."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((image, i) => (
            <motion.button
              type="button"
              key={image.src}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] ${
                i === 0 || i === 5 ? 'sm:col-span-2 sm:aspect-[16/10]' : 'aspect-[4/3]'
              }`}
              aria-label={`Deschide imaginea: ${image.alt}`}
            >
              <Image
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c261f]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 translate-y-3 text-left text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {image.alt}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={GALLERY}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  )
}
