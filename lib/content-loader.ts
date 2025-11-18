// Force dynamic rendering to ensure CMS content is always fresh
export const dynamic = "force-dynamic"
export const revalidate = 0

import { GALLERY_ITEMS, FAQ_ITEMS } from "./static-content"
import type { GalleryItem as GalleryItemType, TeamMember as TeamMemberType } from "./types"
import homeES from "@/content/home.es.json"
import homeEN from "@/content/home.en.json"
import siteES from "@/content/site.es.json"
import siteEN from "@/content/site.en.json"
import servicesES from "@/content/services.es.json"
import servicesEN from "@/content/services.en.json"
import aboutES from "@/content/about.es.json"
import aboutEN from "@/content/about.en.json"
import contactES from "@/content/contact.es.json"
import contactEN from "@/content/contact.en.json"

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  image?: string
  author?: string
  date?: string
  category?: string
  published?: boolean
}

export interface Testimonial {
  author: string
  quote: string
  rating: number
  published?: boolean
}

export interface Contact {
  slug: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  vehicle?: string
  serviceType?: string
  read?: boolean
  date?: string
}

export interface Newsletter {
  slug: string
  email: string
  name?: string
  phone?: string
  interests?: string
  active?: boolean
  date?: string
}

export interface TeamMember {
  slug: string
  name: string
  position: string
  specialty: string
  bio: string
  photo?: string
  experience: number
  certifications?: string[]
  order: number
  published?: boolean
}

export interface FAQ {
  slug: string
  question: string
  answer: string
  category: string
  order: number
  published?: boolean
}

export interface AboutInfo {
  title: string
  subtitle: string
  story: string
  mission: string
  vision: string
  values: string[]
  mainImage?: string
}

export interface ContactInfo {
  phone1: string
  phone2: string
  email: string
  address: string
  city: string
  state: string
  zipcode: string
  hours: string
  facebook?: string
  instagram?: string
  description?: string
}

export interface LegalPage {
  title: string
  lastUpdated: string
  content: string
  published?: boolean
}

export interface Service {
  slug: string
  name: string
  description: string
  fullDescription: string
  benefits: string[]
  price: string
  duration: string
  image?: string
  icon?: string
  order: number
  published?: boolean
}

export interface GalleryItem {
  slug: string
  title: string
  description: string
  serviceType: string
  beforeImage: string
  afterImage: string
  date: string
  featured?: boolean
}

// Home page content types
export interface HomeContent {
  hero: {
    badge: string
    title: string
    titleAccent: string
    description: string
    ctaPrimary: string
    ctaPrimaryLink: string
    ctaSecondary: string
    ctaSecondaryLink: string
    visualEmoji: string
    visualText: string
  }
  stats: {
    clients: { value: string; label: string }
    satisfaction: { value: string; label: string }
    years: { value: string; label: string }
  }
  servicesSection: {
    badge: string
    title: string
    description: string
  }
  testimonialsSection: {
    badge: string
    title: string
  }
  ctaSection: {
    title: string
    description: string
    ctaPrimary: string
    ctaPrimaryLink: string
    ctaSecondary: string
    ctaSecondaryLink: string
    phoneLabel: string
    phoneValue: string
    emailLabel: string
    emailValue: string
    locationLabel: string
    locationValue: string
  }
}

export interface SiteContent {
  logo: {
    initials: string
    name: string
    tagline: string
    image: string
  }
  contact: {
    phone: string
    phoneLink: string
    email: string
    emailLink: string
    location: string
  }
  navigation: {
    home: string
    services: string
    testimonials: string
    contact: string
    gallery: string
    blog: string
    about: string
    faq: string
  }
  buttons: {
    callNow: string
    viewAll: string
  }
  footer: {
    description: string
    linksTitle: string
    servicesTitle: string
    companyTitle: string
    legalTitle: string
    copyright: string
    terms: string
    privacy: string
    termsAndConditions: string
    privacyPolicy: string
    legalContact: string
    maintenance: string
    repair: string
    diagnostic: string
  }
}

// Static imports - NO fs usage
export async function getHomeContent(locale: "es" | "en" = "es"): Promise<HomeContent> {
  return (locale === "en" ? homeEN : homeES) as HomeContent
}

export async function getSiteContent(locale: "es" | "en" = "es"): Promise<SiteContent> {
  return (locale === "en" ? siteEN : siteES) as SiteContent
}

export async function getServices(locale: "es" | "en" = "es"): Promise<Service[]> {
  const services = locale === "en" ? servicesEN : servicesES
  return Array.isArray(services) ? services : services.services || []
}

export async function getService(slug: string, locale: "es" | "en" = "es"): Promise<Service | null> {
  const services = await getServices(locale)
  return services.find((s) => s.slug === slug) || null
}

export async function getAboutInfo(locale: "es" | "en" = "es"): Promise<AboutInfo | null> {
  const about = locale === "en" ? aboutEN : aboutES
  return about as unknown as AboutInfo
}

export async function getContactInfo(locale: "es" | "en" = "es"): Promise<ContactInfo | null> {
  const contact = locale === "en" ? contactEN : contactES
  return contact as unknown as ContactInfo
}

export async function getGalleryItems(): Promise<GalleryItemType[]> {
  return GALLERY_ITEMS
}

export async function getFAQs(): Promise<FAQ[]> {
  return FAQ_ITEMS
}

export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  return FAQ_ITEMS.filter((faq) => faq.category === category)
}

export async function getTeamMembers(): Promise<TeamMemberType[]> {
  return []
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return []
}

export async function getContacts(): Promise<Contact[]> {
  return []
}

export async function getNewsletterSubscribers(): Promise<Newsletter[]> {
  return []
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return []
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return null
}

export async function getTermsAndConditions(): Promise<LegalPage | null> {
  return {
    title: "Términos y Condiciones",
    lastUpdated: "2024-01-01T00:00:00.000Z",
    content: "Términos y condiciones pendiente de actualizar",
    published: true,
  }
}

export async function getPrivacyPolicy(): Promise<LegalPage | null> {
  return {
    title: "Política de Privacidad",
    lastUpdated: "2024-01-01T00:00:00.000Z",
    content: "Política de privacidad pendiente de actualizar",
    published: true,
  }
}

export function normalizeArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'items' in data && Array.isArray((data as any).items)) {
    return (data as any).items
  }
  return []
}
