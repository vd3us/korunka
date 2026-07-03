'use client'

import { MapPin, Plane } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/motion/reveal'

export function Location() {
  return (
    <section id="locatie" className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Locație"
          title="Ușor de găsit, ideal pentru relaxare"
        />

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-40px_rgba(49,88,74,0.35)]">
            <iframe
              title="Harta Pensiunea Koronka, Corunca"
              src="https://www.google.com/maps?q=Corunca%2C%20Mure%C8%99%2C%20Romania&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full grayscale-[0.2] md:h-[460px]"
            />
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-medium text-foreground">Adresă</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Corunca, județul Mureș, România
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Plane className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-medium text-foreground">Aeroport</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Aeroportul Internațional Transilvania Târgu Mureș — aprox. 21 km
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-pretty text-center leading-relaxed text-muted-foreground">
            Pensiunea Koronka este situată în Corunca, la doar aproximativ 21 km de
            Aeroportul Internațional Transilvania Târgu Mureș, oferind acces rapid și o
            locație ideală pentru relaxare și descoperirea zonei.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
