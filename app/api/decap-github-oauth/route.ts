// GitHub OAuth endpoint for Decap CMS
// Handles the OAuth callback from GitHub

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  if (!code) {
    return NextResponse.json({ error: "No authorization code received" }, { status: 400 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error_description || "OAuth failed" }, { status: 400 })
    }

    // Return token to Decap CMS
    const htmlResponse = `
      <html>
        <body>
          <script>
            const msg = {
              token: '${tokenData.access_token}',
              provider: 'github'
            };
            window.opener.postMessage(msg, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `

    return new NextResponse(htmlResponse, {
      headers: { "Content-Type": "text/html" },
    })
  } catch (error) {
    console.error("OAuth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
