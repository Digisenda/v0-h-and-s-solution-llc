import { getBlogPosts } from "@/lib/content-loader"

export async function GET() {
  try {
    const posts = await getBlogPosts()
    return Response.json({ posts })
  } catch (error) {
    console.error("Error loading blog posts:", error)
    return Response.json({ posts: [] }, { status: 500 })
  }
}
