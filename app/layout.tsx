import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const SITE_URL = "https://www.hssolutionllc.com"
const SITE_NAME = "H&S Solution LLC"

export const metadata: Metadata = {
  title: "H&S Solution LLC - Taller Automotriz Profesional en San Antonio, TX",
  description:
    "Servicios automotrices profesionales en San Antonio, Texas. Reparación, mantenimiento preventivo y diagnóstico computarizado. ¡Contacta hoy!",
  keywords: "taller automotriz, reparación auto, mantenimiento vehiculo, San Antonio",
  authors: [{ name: SITE_NAME }],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "H&S Solution LLC - Taller Automotriz Profesional",
    description: "Servicios automotrices profesionales con garantía de calidad en San Antonio, TX",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "H&S Solution LLC - Taller Automotriz",
    description: "Servicios automotrices profesionales en San Antonio, TX",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  other: {
    "ai:search": "true",
  },
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/placeholder-logo.svg`,
    image: `${SITE_URL}/og-image.jpg`,
    description:
      "Servicios automotrices profesionales en San Antonio, Texas. Reparación, mantenimiento preventivo y diagnóstico computarizado.",
    telephone: "(210) 555-0123", // TODO: Replace with actual phone
    email: "plus@hssolutionllc.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main Street", // TODO: Replace with actual address
      addressLocality: "San Antonio",
      addressRegion: "TX",
      postalCode: "78201", // TODO: Replace with actual zip code
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.4241, // San Antonio coordinates - TODO: Update with exact location
      longitude: -98.4936,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "San Antonio",
    },
    sameAs: [
      // TODO: Add social media profiles if available
      // "https://www.facebook.com/hssolutionllc",
      // "https://www.instagram.com/hssolutionllc"
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Taller automotriz profesional en San Antonio, Texas. Servicios de reparación, mantenimiento y diagnóstico computarizado.",
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/servicios?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a472a" />
        <link rel="sitemap" href="/sitemap.xml" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
