'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const easeLux = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
      aria-label="Introducere Pensiunea Koronka"
    >
      {/* Ken Burns slow-zoom background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      >
        <Image
          src="/images/hero.png"
          alt="Pensiunea Koronka la apus, înconjurată de grădini și dealuri line"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Elegant dark overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1c261f]/70 via-[#1c261f]/45 to-[#1c261f]/80"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLux, delay: 0.3 }}
          className="eyebrow text-xs font-medium text-[var(--gold)] md:text-sm"
        >
          Corunca · România
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeLux, delay: 0.5 }}
          className="mt-6 text-balance font-serif text-4xl font-medium tracking-wide text-white sm:text-6xl lg:text-7xl"
        >
          Pensiunea Koronka
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
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/85 md:text-lg"
        >
          Un refugiu elegant unde confortul, natura și ospitalitatea se întâlnesc
          pentru a crea experiențe memorabile.
        </motion.p>
      </div>

      {/* Animated scroll indicator */}
      <motion.a
        href="#despre"
        aria-label="Derulează pentru a descoperi mai multe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/70"
        >
          <span className="eyebrow text-[0.65rem]">Descoperă</span>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  )
}
