import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import type { HomeContent } from "@/lib/content-loader"

interface HeroProps {
  content: HomeContent
}

export default function Hero({ content }: HeroProps) {
  const { hero, stats } = content

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-background opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
              <p className="text-accent font-semibold text-sm">{hero.badge}</p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-pretty">
              {hero.title}
              <span className="text-accent"> {hero.titleAccent}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">{hero.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={hero.ctaPrimaryLink}
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                {hero.ctaPrimary}
                <ArrowRight size={20} />
              </Link>
              <Link
                href={hero.ctaSecondaryLink}
                className="inline-flex items-center justify-center gap-2 border-2 border-accent text-accent px-8 py-4 rounded-full font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Phone size={20} />
                {hero.ctaSecondary}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-accent">{stats.clients.value}</p>
                <p className="text-sm text-muted-foreground">{stats.clients.label}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">{stats.satisfaction.value}</p>
                <p className="text-sm text-muted-foreground">{stats.satisfaction.label}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">{stats.years.value}</p>
                <p className="text-sm text-muted-foreground">{stats.years.label}</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full aspect-square">
              {hero.heroMedia ? (
                <>
                  {hero.heroMediaType === "video" ? (
                    <video
                      src={hero.heroMedia}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    />
                  ) : (
                    <img
                      src={hero.heroMedia}
                      alt={hero.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-3xl" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-primary rounded-3xl opacity-20" />
                  <div className="absolute inset-8 bg-accent rounded-2xl opacity-10" />
                  <div className="absolute inset-16 border-4 border-accent rounded-xl opacity-30" />
                  {(hero.visualEmoji || hero.visualText) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {hero.visualEmoji && <div className="text-6xl mb-4">{hero.visualEmoji}</div>}
                        {hero.visualText && <p className="text-primary font-bold">{hero.visualText}</p>}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
