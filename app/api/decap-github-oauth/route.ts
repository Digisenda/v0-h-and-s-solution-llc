// GitHub OAuth endpoint for Decap CMS
// Handles the OAuth callback from GitHub

import { type NextRequest, NextResponse } from "next/server"

const CLIENT_ID = process.env.DECAP_GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.DECAP_GITHUB_CLIENT_SECRET

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing Decap GitHub OAuth env vars")
    return NextResponse.json(
      { error: "Server misconfiguration: missing OAuth credentials" },
      { status: 500 }
    )
  }

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
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error || "OAuth failed" },
        { status: 400 }
      )
    }

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "No access token received from GitHub" },
        { status: 400 }
      )
    }

    // Build safe JS object for the CMS response
    const msg = {
      token: tokenData.access_token,
      provider: "github",
    }

    const htmlResponse = `
      <html>
        <body>
          <script>
            (function() {
              const msg = ${JSON.stringify(msg)};
              if (window.opener) {
                window.opener.postMessage(msg, window.location.origin);
                window.close();
              } else {
                console.error("No opener window found for Decap CMS OAuth");
              }
            })();
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
