'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/reveal'

const paragraphs = [
  'Bine ați venit la Pensiunea Koronka, un loc în care confortul modern se îmbină armonios cu liniștea naturii. Situată în Corunca, într-o zonă retrasă și relaxantă, pensiunea oferă o atmosferă primitoare, servicii de calitate și facilități concepute pentru a transforma fiecare sejur într-o experiență plăcută.',
  'Camerele spațioase și elegante sunt dotate cu aer condiționat, Wi-Fi gratuit, baie proprie, minibar, televizor cu ecran plat și mobilier modern, oferind toate condițiile necesare pentru un sejur confortabil.',
  'Oaspeții se pot bucura de restaurantul pensiunii, unde sunt pregătite preparate inspirate din bucătăria tradițională românească și locală, de grădina amenajată, terasa în aer liber, sauna și jacuzzi-ul disponibile pentru momente de relaxare.',
  'Pentru confortul tuturor vizitatorilor, punem la dispoziție parcare privată gratuită, iar Aeroportul Internațional Transilvania Târgu Mureș se află la aproximativ 21 km de proprietate.',
  'Pensiunea Koronka este apreciată în mod special de cupluri, fiind alegerea ideală pentru un weekend romantic, vacanțe relaxante sau călătorii de afaceri.',
]

export function About() {
  return (
    <section id="despre" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Image side */}
        <Reveal className="order-1 lg:order-none">
          <div className="relative">
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(49,88,74,0.35)]"
            >
              <Image
                src="/images/about.png"
                alt="Interior elegant al unei camere din Pensiunea Koronka"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div
              className="absolute -bottom-6 -left-6 -z-10 hidden h-40 w-40 rounded-2xl bg-[var(--sage)]/40 lg:block"
              aria-hidden
            />
            <div
              className="absolute -right-5 -top-5 -z-10 hidden h-28 w-28 rounded-2xl border border-[var(--gold)]/40 lg:block"
              aria-hidden
            />
          </div>
        </Reveal>

        {/* Text side */}
        <div>
          <Reveal>
            <span className="eyebrow flex items-center gap-3 text-xs font-medium text-[var(--gold)]">
              <span className="h-px w-8 bg-[var(--gold)]/50" aria-hidden />
              Despre noi
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-primary md:text-4xl">
              Ospitalitate rafinată în inima naturii
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5">
            {paragraphs.map((text, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="text-pretty leading-relaxed text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
