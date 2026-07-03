import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { MenuHero } from '@/components/menu/menu-hero'
import { MenuGallery } from '@/components/menu/menu-gallery'

export const metadata: Metadata = {
  title: 'Meniul Restaurantului',
  description:
    'Descoperiți meniul restaurantului Pensiunea Koronka — preparate inspirate din bucătăria tradițională românească și internațională, pregătite cu ingrediente atent selecționate.',
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: 'Meniul Restaurantului | Pensiunea Koronka',
    description:
      'Preparate inspirate din bucătăria tradițională românească și internațională, pregătite cu ingrediente atent selecționate.',
    images: ['/images/menu-hero.png'],
  },
}

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main>
        <MenuHero />
        <MenuGallery />
      </main>
      <Footer />
    </>
  )
}
