import { getBlogPost, getBlogPosts } from "@/lib/content-loader"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"

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
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Post no encontrado",
    }
  }

  return {
    title: `${post.title} - Blog | H&S Solution LLC`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
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
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 w-fit"
          >
            <ChevronLeft size={20} />
            <span>Volver al blog</span>
          </Link>
        </div>
      </div>

      {/* Post Content */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {post.image && (
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {post.category && (
            <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-8 pb-8 border-b border-border">
            {post.author && <span>Por {post.author}</span>}
            {post.date && (
              <span>{new Date(post.date).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}</span>
            )}
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas ayuda con tu vehículo?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Nuestro equipo de expertos está listo para ayudarte
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-accent text-accent-foreground font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            Agenda tu cita
          </Link>
        </div>
      </section>
    </main>
  )
}
