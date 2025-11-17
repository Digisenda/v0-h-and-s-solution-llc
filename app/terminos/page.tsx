import { getTermsAndConditions } from "@/lib/content-loader"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

export const metadata = {
  title: "Términos y Condiciones - H&S Solution LLC",
  description: "Términos y condiciones de uso del sitio web de H&S Solution LLC",
  alternates: {
    canonical: "/terminos",
  },
}

export default async function TerminosPage() {
  const terms = await getTermsAndConditions()

  if (!terms || !terms.published) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-accent text-balance">{terms.title}</h1>
          <p className="text-muted-foreground mt-4">
            Última actualización: {new Date(terms.lastUpdated).toLocaleDateString("es-MX")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{children}</h3>,
                p: ({ children }) => <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
              }}
            >
              {terms.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </main>
  )
}
