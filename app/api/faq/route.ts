import { getFAQs } from "@/lib/content-loader"

export async function GET() {
  try {
    const faqs = await getFAQs()
    return Response.json({ faqs })
  } catch (error) {
    console.error("Error loading FAQs:", error)
    return Response.json({ faqs: [] }, { status: 500 })
  }
}
