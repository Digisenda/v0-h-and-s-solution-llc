import { getTeamMembers } from "@/lib/content-loader"

export async function GET() {
  try {
    const members = await getTeamMembers()
    return Response.json({ members })
  } catch (error) {
    console.error("Error loading team members:", error)
    return Response.json({ members: [] }, { status: 500 })
  }
}
