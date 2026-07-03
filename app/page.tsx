import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Gallery } from '@/components/home/gallery'
import { Facilities } from '@/components/home/facilities'
import { Bookings } from '@/components/home/bookings'
import { Location } from '@/components/home/location'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Facilities />
        <Bookings />
        <Location />
      </main>
      <Footer />
    </>
  )
}
