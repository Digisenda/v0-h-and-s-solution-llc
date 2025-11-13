import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { GALLERY_ITEMS, FAQ_ITEMS } from "./static-content"
import type {
  GalleryItem as GalleryItemType,
  Service as ServiceType,
  TeamMember as TeamMemberType,
  FAQ as FAQType,
  Contact as ContactType,
  Newsletter as NewsletterType,
  ContactInfo as ContactInfoType,
} from "./types"
import { loadServicesContent, loadAboutContent, loadContactContent, loadHomeContent } from "./load-json-content"

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

export async function getHomeContent(locale: "es" | "en" = "es") {
  try {
    return await loadHomeContent(locale)
  } catch {
    return null
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), "content/blog")

  if (!fs.existsSync(blogDir)) {
    return []
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"))

  const posts: BlogPost[] = files.map((file) => {
    const filePath = path.join(blogDir, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title || "Sin título",
      description: data.description || "",
      content,
      image: data.image,
      author: data.author,
      date: data.date,
      category: data.category,
      published: data.published !== false,
    }
  })

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

export async function getServices(locale: "es" | "en" = "es"): Promise<ServiceType[]> {
  const services = await loadServicesContent(locale)
  return services
}

export async function getService(slug: string, locale: "es" | "en" = "es"): Promise<ServiceType | null> {
  const services = await getServices(locale)
  return services.find((s) => s.slug === slug) || null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonialsDir = path.join(process.cwd(), "content/testimonios")

  if (!fs.existsSync(testimonialsDir)) {
    return []
  }

  const files = fs.readdirSync(testimonialsDir).filter((file) => file.endsWith(".yml"))

  const testimonials: Testimonial[] = files.map((file) => {
    const filePath = path.join(testimonialsDir, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      author: data.author || "Anónimo",
      quote: data.quote || "",
      rating: data.rating || 5,
      published: data.published !== false,
    }
  })

  return testimonials.filter((t) => t.published)
}

export async function getGalleryItems(): Promise<GalleryItemType[]> {
  return GALLERY_ITEMS
}

export async function getContacts(): Promise<ContactType[]> {
  const contactsDir = path.join(process.cwd(), "content/contactos")

  if (!fs.existsSync(contactsDir)) {
    return []
  }

  const files = fs.readdirSync(contactsDir).filter((file) => file.endsWith(".yml"))

  const contacts: ContactType[] = files.map((file) => {
    const filePath = path.join(contactsDir, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug: file.replace(/\.yml$/, ""),
      name: data.name || "",
      email: data.email || "",
      phone: data.phone,
      subject: data.subject || "",
      message: data.message || "",
      vehicle: data.vehicle,
      serviceType: data.serviceType,
      read: data.read || false,
      date: data.date,
    }
  })

  return contacts.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
}

export async function getNewsletterSubscribers(): Promise<NewsletterType[]> {
  const newsletterDir = path.join(process.cwd(), "content/newsletter")

  if (!fs.existsSync(newsletterDir)) {
    return []
  }

  const files = fs.readdirSync(newsletterDir).filter((file) => file.endsWith(".yml"))

  const subscribers: NewsletterType[] = files.map((file) => {
    const filePath = path.join(newsletterDir, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug: file.replace(/\.yml$/, ""),
      email: data.email || "",
      name: data.name,
      phone: data.phone,
      interests: data.interests,
      active: data.active !== false,
      date: data.date,
    }
  })

  return subscribers.filter((s) => s.active)
}

export async function getTeamMembers(): Promise<TeamMemberType[]> {
  return []
}

export async function getAboutInfo(locale: "es" | "en" = "es"): Promise<AboutInfo | null> {
  try {
    const content = await loadAboutContent(locale)
    const values = Array.isArray(content.values) ? content.values : []
    return {
      title: content.title || "Acerca de H&S Solution LLC",
      subtitle: content.subtitle || "",
      story: content.story || "",
      mission: content.mission || "",
      vision: content.vision || "",
      values,
      mainImage: content.mainImage,
    }
  } catch {
    return null
  }
}

export async function getFAQs(): Promise<FAQType[]> {
  return FAQ_ITEMS
}

export async function getFAQsByCategory(category: string): Promise<FAQType[]> {
  return FAQ_ITEMS.filter((faq) => faq.category === category)
}

export async function getTermsAndConditions(): Promise<LegalPage | null> {
  const termsPath = path.join(process.cwd(), "content/legal/terminos.yml")

  if (!fs.existsSync(termsPath)) {
    return null
  }

  const fileContents = fs.readFileSync(termsPath, "utf8")
  const { data } = matter(fileContents)

  return {
    title: data.title || "Términos y Condiciones",
    lastUpdated: data.lastUpdated || "",
    content: data.content || "",
    published: data.published !== false,
  }
}

export async function getPrivacyPolicy(): Promise<LegalPage | null> {
  const privacyPath = path.join(process.cwd(), "content/legal/privacidad.yml")

  if (!fs.existsSync(privacyPath)) {
    return null
  }

  const fileContents = fs.readFileSync(privacyPath, "utf8")
  const { data } = matter(fileContents)

  return {
    title: data.title || "Política de Privacidad",
    lastUpdated: data.lastUpdated || "",
    content: data.content || "",
    published: data.published !== false,
  }
}

export async function getContactInfo(locale: "es" | "en" = "es"): Promise<ContactInfoType | null> {
  try {
    return await loadContactContent(locale)
  } catch {
    return null
  }
}
