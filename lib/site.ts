import type { LucideIcon } from 'lucide-react'
import { Wifi, Wind, UtensilsCrossed, Wine, Trees, Flower2, Flame, Save as Waves, CircleParking as ParkingCircle, Refrigerator, Tv, Bath } from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
] as const

export const CONTACT = {
  phone: '07xxxxxxxx',
  phoneHref: 'tel:07xxxxxxxx',
  locality: 'Corunca, Mureș, România',
}

export type Facility = {
  icon: LucideIcon
  title: string
}

export const FACILITIES: Facility[] = [
  { icon: Wifi, title: 'Free WiFi' },
  { icon: Wind, title: 'Air Conditioning' },
  { icon: UtensilsCrossed, title: 'Restaurant' },
  { icon: Wine, title: 'Bar' },
  { icon: Trees, title: 'Terrace' },
  { icon: Flower2, title: 'Garden' },
  { icon: Flame, title: 'Sauna' },
  { icon: Waves, title: 'Jacuzzi' },
  { icon: ParkingCircle, title: 'Free Private Parking' },
  { icon: Refrigerator, title: 'Minibar' },
  { icon: Tv, title: 'Flat Screen TV' },
  { icon: Bath, title: 'Private Bathroom' },
]

export type GalleryImage = {
  src: string
  alt: string
}

export const GALLERY: GalleryImage[] = [
  { src: '/images/gallery-1.png', alt: 'Cameră dublă elegantă cu lenjerie fină' },
  { src: '/images/gallery-2.png', alt: 'Baie modernă cu duș tip ploaie' },
  { src: '/images/gallery-3.png', alt: 'Terasă în aer liber la apus' },
  { src: '/images/gallery-4.png', alt: 'Saună cu panouri din lemn cald' },
  { src: '/images/gallery-5.png', alt: 'Jacuzzi în aer liber pe terasă' },
  { src: '/images/gallery-6.png', alt: 'Interiorul restaurantului pensiunii' },
  { src: '/images/gallery-7.png', alt: 'Grădina amenajată a pensiunii' },
  { src: '/images/gallery-8.png', alt: 'Barul și zona de relaxare' },
]

export const SCHEDULE: string[] = [
  'Luni',
  'Marți',
  'Miercuri',
  'Joi',
  'Vineri',
  'Sâmbătă',
  'Duminică',
]
