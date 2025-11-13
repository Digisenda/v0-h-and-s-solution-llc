import { getBlogPost, getBlogPosts } from "@/lib/content-loader"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "No encontrado",
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <span className="mr-2">←</span> Volver al Blog
        </Link>

        <article className="max-w-2xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {post.category && (
                <span className="text-xs font-semibold text-primary-foreground bg-primary px-3 py-1 rounded">
                  {post.category}
                </span>
              )}
              {post.date && (
                <time className="text-sm text-muted-foreground">
                  {format(new Date(post.date), "d 'de' MMMM 'de' yyyy", {
                    locale: es,
                  })}
                </time>
              )}
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>
            {post.author && (
              <p className="text-sm text-muted-foreground mt-4">
                Por <span className="font-semibold">{post.author}</span>
              </p>
            )}
          </header>

          {post.image && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden bg-muted">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-foreground">{post.content}</div>
        </article>
      </div>
    </main>
  )
}
