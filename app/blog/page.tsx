import { getBlogPosts } from "@/lib/content-loader"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export const metadata = {
  title: "Blog - H&S Solutions LLC",
  description: "Artículos y tips sobre mantenimiento y reparación automotriz",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">Tips, consejos y noticias sobre mantenimiento automotriz</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay artículos publicados aún.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  {post.image && (
                    <div className="relative w-full h-48 overflow-hidden bg-muted">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    {post.category && (
                      <span className="inline-block w-fit text-xs font-semibold text-primary-foreground bg-primary px-2 py-1 rounded mb-3">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{post.description}</p>
                    {post.date && (
                      <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
                        <span>
                          {format(new Date(post.date), "d 'de' MMMM 'de' yyyy", {
                            locale: es,
                          })}
                        </span>
                        {post.author && <span>{post.author}</span>}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
