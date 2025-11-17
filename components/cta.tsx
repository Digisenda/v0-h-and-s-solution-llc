import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { HomeContent } from "@/lib/content-loader"

interface CTAProps {
  content: HomeContent
}

export default function CTA({ content }: CTAProps) {
  const { ctaSection } = content

  return (
    <section id="contacto" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-pretty">{ctaSection.title}</h2>

        <p className="text-lg opacity-90">{ctaSection.description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href={ctaSection.ctaPrimaryLink}
            className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            {ctaSection.ctaPrimary}
            <ArrowRight size={20} />
          </Link>
          <Link
            href={ctaSection.ctaSecondaryLink}
            className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            {ctaSection.ctaSecondary}
          </Link>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-primary-foreground/20">
          <div>
            <p className="text-sm opacity-75 mb-2">{ctaSection.phoneLabel}</p>
            <p className="font-semibold text-lg">{ctaSection.phoneValue}</p>
          </div>
          <div>
            <p className="text-sm opacity-75 mb-2">{ctaSection.emailLabel}</p>
            <p className="font-semibold text-lg">{ctaSection.emailValue}</p>
          </div>
          <div>
            <p className="text-sm opacity-75 mb-2">{ctaSection.locationLabel}</p>
            <p className="font-semibold text-lg">{ctaSection.locationValue}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
