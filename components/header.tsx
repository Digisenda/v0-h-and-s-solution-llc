"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import type { SiteContent } from "@/lib/content-loader"

interface HeaderProps {
  content: SiteContent
}

export default function Header({ content }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { logo, contact, navigation, buttons } = content

  const menuItems = [
    { label: navigation.home, href: "/" },
    { label: navigation.services, href: "/servicios" },
    { label: navigation.gallery, href: "/galeria" },
    { label: navigation.faq, href: "/faq" },
    { label: navigation.contact, href: "/contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {logo.image ? (
              <img src={logo.image} alt={logo.name} className="w-12 h-12 rounded-lg" />
            ) : (
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <div className="text-2xl font-bold text-accent">{logo.initials}</div>
              </div>
            )}
            <div className="hidden sm:block">
              <p className="font-bold text-primary text-lg">{logo.name}</p>
              <p className="text-xs text-muted-foreground">{logo.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contacto"
              className="bg-accent text-accent-foreground px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              {buttons.callNow}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-4 border-t border-border pt-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="block bg-accent text-accent-foreground px-6 py-2 rounded-full font-semibold text-center"
            >
              {buttons.callNow}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
