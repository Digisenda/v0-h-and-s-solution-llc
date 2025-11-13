export async function loadHomeContent(locale: "es" | "en" = "es") {
  const content = await import(`@/content/home.${locale}.json`)
  return content.default
}

export async function loadServicesContent(locale: "es" | "en" = "es") {
  const content = await import(`@/content/services.${locale}.json`)
  return content.default.services
}

export async function loadAboutContent(locale: "es" | "en" = "es") {
  const content = await import(`@/content/about.${locale}.json`)
  return content.default
}

export async function loadContactContent(locale: "es" | "en" = "es") {
  const content = await import(`@/content/contact.${locale}.json`)
  return content.default
}

export async function loadLegalContent(type: "terms" | "privacy", locale: "es" | "en" = "es") {
  try {
    const response = await fetch(`/content/legal/${type}.${locale}.md`)
    if (!response.ok) throw new Error("File not found")
    return await response.text()
  } catch {
    return ""
  }
}
