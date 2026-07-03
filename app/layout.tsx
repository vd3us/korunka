import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = 'https://pensiunea-koronka.ro'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pensiunea Koronka — Refugiu boutique de lux în Corunca',
    template: '%s | Pensiunea Koronka',
  },
  description:
    'Pensiunea Koronka din Corunca — un refugiu elegant unde confortul modern, natura și ospitalitatea se întâlnesc. Camere spațioase, restaurant, saună, jacuzzi și grădină amenajată.',
  keywords: [
    'Pensiunea Koronka',
    'cazare Corunca',
    'pensiune de lux Corunca',
    'restaurant Corunca',
    'wellness spa Târgu Mureș',
    'cazare Târgu Mureș',
    'sauna jacuzzi Corunca',
  ],
  authors: [{ name: 'Pensiunea Koronka' }],
  creator: 'Pensiunea Koronka',
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: siteUrl,
    siteName: 'Pensiunea Koronka',
    title: 'Pensiunea Koronka — Refugiu boutique de lux în Corunca',
    description:
      'Un refugiu elegant unde confortul, natura și ospitalitatea se întâlnesc pentru a crea experiențe memorabile.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Pensiunea Koronka la apus, înconjurată de grădini și dealuri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pensiunea Koronka — Refugiu boutique de lux în Corunca',
    description:
      'Un refugiu elegant unde confortul, natura și ospitalitatea se întâlnesc pentru a crea experiențe memorabile.',
    images: ['/images/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: '#31584a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Pensiunea Koronka',
  description:
    'Un refugiu elegant în Corunca unde confortul modern se îmbină armonios cu liniștea naturii.',
  image: `${siteUrl}/images/hero.png`,
  url: siteUrl,
  telephone: '+40 700 000 000',
  priceRange: '$$',
  starRating: {
    '@type': 'Rating',
    ratingValue: '5',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Corunca',
    addressRegion: 'Mureș',
    addressCountry: 'RO',
  },
  amenityFeature: [
    'Free WiFi',
    'Air Conditioning',
    'Restaurant',
    'Bar',
    'Terrace',
    'Garden',
    'Sauna',
    'Jacuzzi',
    'Free Private Parking',
    'Minibar',
    'Flat Screen TV',
    'Private Bathroom',
  ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  petsAllowed: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
