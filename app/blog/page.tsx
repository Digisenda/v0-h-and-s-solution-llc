import { getBlogPosts } from "@/lib/content-loader"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - H&S Solution LLC",
  description: "Artículos y consejos sobre mantenimiento automotriz y reparación de vehículos",
  alternates: {
    canonical: "/blog",
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Consejos, tips y noticias sobre el cuidado de tu vehículo
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      {post.author && <span>{post.author}</span>}
                      {post.date && (
                        <span>{new Date(post.date).toLocaleDateString("es-MX")}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Pronto compartiremos artículos y consejos útiles sobre el mantenimiento de tu vehículo.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
