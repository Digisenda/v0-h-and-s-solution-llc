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
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

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
  image?: string
  date?: string
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
  googleMapsUrl?: string
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
    visualEmoji?: string
    visualText?: string
    heroMedia?: string
    heroMediaType?: "image" | "video"
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
  try {
    const galeriaDir = path.join(process.cwd(), "content/galeria")
    const files = await fs.readdir(galeriaDir).catch(() => [])
    
    const items = await Promise.all(
      files
        .filter((file) => file.endsWith(".md"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(galeriaDir, file), "utf-8")
          const { data } = matter(content)
          const slug = file.replace(/\.md$/, "")
          return {
            slug,
            title: data.title || "",
            description: data.description || "",
            serviceType: data.service || "Otro",
            beforeImage: data.imageBefore || "",
            afterImage: data.imageAfter || "",
            date: data.date || new Date().toISOString(),
            featured: data.featured || false,
          } as GalleryItemType
        })
    )
    
    const published = items.filter((item) => item.beforeImage && item.afterImage)
    return published.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error loading gallery items:", error)
    return GALLERY_ITEMS
  }
}

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const faqDir = path.join(process.cwd(), "content/faq")
    const files = await fs.readdir(faqDir).catch(() => [])
    
    const faqs = await Promise.all(
      files
        .filter((file) => file.endsWith(".md"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(faqDir, file), "utf-8")
          const { data, content: body } = matter(content)
          const slug = file.replace(/\.md$/, "")
          return {
            slug,
            question: data.question || "",
            answer: body || data.answer || "",
            category: data.category || "General",
            order: data.order || 0,
            published: data.published !== false,
          } as FAQ
        })
    )
    
    const published = faqs.filter((faq) => faq.published)
    return published.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error loading FAQs:", error)
    return FAQ_ITEMS
  }
}

export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  const faqs = await getFAQs()
  return faqs.filter((faq) => faq.category === category)
}

export async function getTeamMembers(): Promise<TeamMemberType[]> {
  return []
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimoniosDir = path.join(process.cwd(), "content/testimonios")
    const files = await fs.readdir(testimoniosDir).catch(() => [])
    
    const testimonials = await Promise.all(
      files
        .filter((file) => file.endsWith(".md"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(testimoniosDir, file), "utf-8")
          const { data } = matter(content)
          return {
            author: data.author || "",
            quote: data.quote || "",
            rating: data.rating || 5,
            image: data.image,
            date: data.date,
            published: data.published !== false,
          } as Testimonial
        })
    )
    
    return testimonials.filter((t) => t.published).sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error("Error loading testimonials:", error)
    return []
  }
}

export async function getContacts(): Promise<Contact[]> {
  return []
}

export async function getNewsletterSubscribers(): Promise<Newsletter[]> {
  return []
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogDir = path.join(process.cwd(), "content/blog")
    const files = await fs.readdir(blogDir).catch(() => [])
    
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".md"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(blogDir, file), "utf-8")
          const { data, content: body } = matter(content)
          const slug = file.replace(/\.md$/, "")
          return {
            slug,
            title: data.title || "",
            description: data.description || "",
            content: body,
            image: data.image,
            author: data.author,
            date: data.date,
            category: data.category,
            published: data.published !== false,
          } as BlogPost
        })
    )
    
    return posts.filter((p) => p.published).sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error("Error loading blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const blogDir = path.join(process.cwd(), "content/blog")
    const files = await fs.readdir(blogDir).catch(() => [])
    const file = files.find((f) => f.replace(/\.md$/, "") === slug)
    
    if (!file) return null
    
    const content = await fs.readFile(path.join(blogDir, file), "utf-8")
    const { data, content: body } = matter(content)
    
    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      content: body,
      image: data.image,
      author: data.author,
      date: data.date,
      category: data.category,
      published: data.published !== false,
    }
  } catch (error) {
    console.error("Error loading blog post:", error)
    return null
  }
}

export async function getTermsAndConditions(locale: "es" | "en" = "es"): Promise<LegalPage | null> {
  try {
    const filename = locale === "en" ? "terms.en.md" : "terms.es.md"
    const filePath = path.join(process.cwd(), "content/legal", filename)
    const content = await fs.readFile(filePath, "utf-8")
    const { content: body } = matter(content)
    
    return {
      title: "Términos y Condiciones",
      lastUpdated: new Date().toISOString(),
      content: body,
      published: true,
    }
  } catch (error) {
    console.error("Error loading terms:", error)
    return {
      title: "Términos y Condiciones",
      lastUpdated: "2024-01-01T00:00:00.000Z",
      content: "Términos y condiciones pendiente de actualizar",
      published: true,
    }
  }
}

export async function getPrivacyPolicy(locale: "es" | "en" = "es"): Promise<LegalPage | null> {
  try {
    const filename = locale === "en" ? "privacy.en.md" : "privacy.es.md"
    const filePath = path.join(process.cwd(), "content/legal", filename)
    const content = await fs.readFile(filePath, "utf-8")
    const { content: body } = matter(content)
    
    return {
      title: "Política de Privacidad",
      lastUpdated: new Date().toISOString(),
      content: body,
      published: true,
    }
  } catch (error) {
    console.error("Error loading privacy:", error)
    return {
      title: "Política de Privacidad",
      lastUpdated: "2024-01-01T00:00:00.000Z",
      content: "Política de privacidad pendiente de actualizar",
      published: true,
    }
  }
}

export function normalizeArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'items' in data && Array.isArray((data as any).items)) {
    return (data as any).items
  }
  return []
}
