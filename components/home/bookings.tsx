'use client'

import { motion } from 'framer-motion'
import { Phone, Clock } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { CONTACT, SCHEDULE } from '@/lib/site'

export function Bookings() {
  return (
    <section id="rezervari" className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
      {/* Subtle decorative accents */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[var(--sage)]/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[var(--gold)]/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-10">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-xs font-medium text-[var(--gold)]">
            <span className="h-px w-8 bg-[var(--gold)]/50" aria-hidden />
            Rezervări
            <span className="h-px w-8 bg-[var(--gold)]/50" aria-hidden />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight md:text-4xl">
            Rezervări și relații cu clienții
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-primary-foreground/70">
            Vă stăm la dispoziție pentru rezervări și orice întrebare. Contactați-ne
            telefonic și vă vom ajuta cu plăcere.
          </p>
        </Reveal>

        {/* Phone card */}
        <Reveal delay={0.15}>
          <motion.a
            href={CONTACT.phoneHref}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-[var(--gold)]/50"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] text-primary">
              <Phone className="h-6 w-6" />
            </span>
            <span className="eyebrow text-[0.7rem] text-primary-foreground/60">
              Telefon
            </span>
            <span className="font-serif text-3xl tracking-wide text-white">
              {CONTACT.phone}
            </span>
          </motion.a>
        </Reveal>

        {/* Program */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/15 bg-white/5 p-8 text-left backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-center gap-2 text-[var(--gold)]">
              <Clock className="h-5 w-5" />
              <span className="eyebrow text-xs font-medium">Program</span>
            </div>
            <ul className="divide-y divide-white/10">
              {SCHEDULE.map((day) => (
                <li
                  key={day}
                  className="flex items-center justify-between gap-4 py-3 text-sm"
                >
                  <span className="font-medium text-white">{day}</span>
                  <span className="flex-1 border-b border-dotted border-white/20" aria-hidden />
                  <span className="text-primary-foreground/50">—</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
