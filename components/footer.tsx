import Link from "next/link"
import type { SiteContent } from "@/lib/content-loader"

interface FooterProps {
  content: SiteContent
}

export default function Footer({ content }: FooterProps) {
  const currentYear = 2024
  const { logo, contact, navigation, footer } = content

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              {logo.image ? (
                <img src={logo.image} alt={logo.name} className="w-10 h-10 rounded-lg" />
              ) : (
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <div className="text-lg font-bold text-accent">{logo.initials}</div>
                </div>
              )}
              <div>
                <p className="font-bold text-primary">{logo.name}</p>
                <p className="text-xs text-muted-foreground">{logo.tagline}</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm">{footer.description}</p>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-foreground mb-4">{footer.linksTitle}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  {navigation.home}
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-accent transition-colors">
                  {navigation.services}
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-muted-foreground hover:text-accent transition-colors">
                  {navigation.gallery}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                  {navigation.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-foreground mb-4">{footer.servicesTitle}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-accent transition-colors">
                  {footer.legalTitle}
                </Link>
              </li>
              <li className="text-muted-foreground">{footer.maintenance}</li>
              <li className="text-muted-foreground">{footer.repair}</li>
              <li className="text-muted-foreground">{footer.diagnostic}</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-foreground mb-4">{footer.companyTitle}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  {navigation.about}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-accent transition-colors">
                  {navigation.contact}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-accent transition-colors">
                  {navigation.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-semibold text-foreground mb-4">{footer.legalTitle}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-accent transition-colors">
                  {footer.termsAndConditions}
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-accent transition-colors">
                  {footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={contact.emailLink} className="text-muted-foreground hover:text-accent transition-colors">
                  {footer.legalContact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>
              © {currentYear} {logo.name}. {footer.copyright}.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/terminos" className="hover:text-accent transition-colors">
                {footer.terms}
              </Link>
              <Link href="/privacidad" className="hover:text-accent transition-colors">
                {footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
