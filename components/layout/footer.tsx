import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Mail } from 'lucide-react'
import { CONTACT, NAV_LINKS } from '@/lib/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="flex flex-col items-center gap-10 text-center">
          <Image
            src="/logo-koronka.png"
            alt="Pensiunea Koronka"
            width={190}
            height={64}
            className="h-14 w-auto rounded-full bg-cream/95 px-3 py-1.5 shadow-sm"
          />

          <p className="max-w-md text-pretty text-sm leading-relaxed text-primary-foreground/70">
            Un refugiu elegant în Corunca, unde confortul, natura și ospitalitatea
            se întâlnesc pentru a crea experiențe memorabile.
          </p>

          <nav aria-label="Navigație subsol">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm tracking-wide text-primary-foreground/80 transition-colors hover:text-[var(--gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-4 text-sm text-primary-foreground/80 sm:flex-row sm:gap-8">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
            >
              <Phone className="h-4 w-4 text-[var(--gold)]" />
              {CONTACT.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--gold)]" />
              {CONTACT.locality}
            </span>
            <a
              href="mailto:contact@pensiunea-koronka.ro"
              className="flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
            >
              <Mail className="h-4 w-4 text-[var(--gold)]" />
              contact@pensiunea-koronka.ro
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-6">
          <p className="text-center text-xs text-primary-foreground/60">
            © {year} Pensiunea Koronka. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  )
}
