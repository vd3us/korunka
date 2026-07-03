'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const easeLux = [0.22, 1, 0.36, 1] as const

export function MenuHero() {
  return (
    <section
      className="relative flex h-[70vh] min-h-[480px] w-full items-center justify-center overflow-hidden"
      aria-label="Meniul restaurantului"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      >
        <Image
          src="/images/menu-hero.png"
          alt="Masă elegantă cu preparate din restaurantul Pensiunii Koronka"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#1c261f]/75 via-[#1c261f]/50 to-[#1c261f]/80" aria-hidden />

      <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLux, delay: 0.3 }}
          className="eyebrow text-xs font-medium text-[var(--gold)]"
        >
          Restaurant · Pensiunea Koronka
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeLux, delay: 0.5 }}
          className="mt-6 text-balance font-serif text-4xl font-medium tracking-wide text-white sm:text-5xl lg:text-6xl"
        >
          Meniul Restaurantului
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: easeLux, delay: 0.9 }}
          className="mt-7 h-px w-24 bg-[var(--gold)]"
          aria-hidden
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLux, delay: 1.05 }}
          className="mt-7 text-pretty text-base leading-relaxed text-white/85 md:text-lg"
        >
          Vă invităm să descoperiți preparatele noastre, pregătite cu ingrediente atent
          selecționate și inspirate atât din bucătăria tradițională românească, cât și din
          cea internațională. Fie că doriți un prânz savuros, o cină relaxantă sau un desert
          delicios, meniul nostru oferă opțiuni pentru toate gusturile.
        </motion.p>
      </div>
    </section>
  )
}
