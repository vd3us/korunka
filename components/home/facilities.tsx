'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { FACILITIES } from '@/lib/site'

export function Facilities() {
  return (
    <section id="facilitati" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Facilități"
          title="Tot ce aveți nevoie pentru un sejur desăvârșit"
          description="De la relaxare la confort modern, fiecare detaliu este gândit pentru a vă răsfăța."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {FACILITIES.map((facility, i) => {
            const Icon = facility.icon
            return (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-[0_20px_40px_-24px_rgba(49,88,74,0.4)] md:p-8"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-[var(--gold)]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="text-sm font-medium text-foreground">{facility.title}</h3>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
