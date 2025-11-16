export const dynamic = "force-dynamic"

interface BlogPostPageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">
            Blog en construcción
          </h1>
          <p className="text-muted-foreground">
            El artículo "{params.slug}" aún no está disponible.
            Muy pronto publicaremos contenidos con tips y consejos
            para el mantenimiento de tu vehículo.
          </p>
        </div>
      </section>
    </main>
  )
}
