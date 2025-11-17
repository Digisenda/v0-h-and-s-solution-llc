import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "H&S Solutions LLC - Taller Automotriz Profesional en San Antonio, TX",
  description:
    "Servicios automotrices profesionales en San Antonio, Texas. Reparación, mantenimiento preventivo y diagnóstico computarizado. ¡Contacta hoy!",
  keywords: "taller automotriz, reparación auto, mantenimiento vehiculo, San Antonio",
  authors: [{ name: "H&S Solutions LLC" }],
  metadataBase: new URL("https://h-and-s-solutions.vercel.app"),
  alternates: {
    canonical: "https://h-and-s-solutions.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://h-and-s-solutions.vercel.app",
    siteName: "H&S Solutions LLC",
    title: "H&S Solutions LLC - Taller Automotriz Profesional",
    description: "Servicios automotrices profesionales con garantía de calidad en San Antonio, TX",
  },
  twitter: {
    card: "summary_large_image",
    title: "H&S Solutions LLC - Taller Automotriz",
    description: "Servicios automotrices profesionales en San Antonio, TX",
  },
  generator: "v0.app",
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
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a472a" />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
