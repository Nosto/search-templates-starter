import { useState, useEffect, useCallback } from "preact/hooks"

export type NostoDynamicCardProps = {
  /** The product handle to fetch data for. Required. */
  handle: string
  /** The section to use for rendering the product. section or template is required. */
  section?: string
  /** The template to use for rendering the product. section or template is required. */
  template?: string
  /** The variant ID to fetch specific variant data. Optional. */
  variantId?: string
}

export default function NostoDynamicCard({ handle, section, template, variantId }: NostoDynamicCardProps) {
  const [markup, setMarkup] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  if (!handle) {
    throw new Error("NostoDynamicCard requires a 'handle' prop")
  }

  if (!section && !template) {
    throw new Error("NostoDynamicCard requires either 'section' or 'template' prop")
  }

  const fetchMarkup = useCallback(async () => {
    const params = new URLSearchParams()

    if (template) {
      params.set("view", template)
      params.set("layout", "none")
    } else if (section) {
      params.set("section_id", section)
    }

    if (variantId) {
      params.set("variant", variantId)
    }

    const response = await fetch(`/products/${handle}?${params}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.status} ${response.statusText}`)
    }

    let html = await response.text()

    // If using section rendering, extract the section content
    if (section) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      html = doc.body.firstElementChild?.innerHTML?.trim() || html
    }

    if (/<(body|html)/.test(html)) {
      throw new Error(
        `Invalid markup for ${template || section}, make sure that no <body> or <html> tags are included.`
      )
    }

    return html
  }, [handle, section, template, variantId])

  const loadContent = useCallback(async () => {
    try {
      setError(null)
      const html = await fetchMarkup()
      setMarkup(html)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content")
    }
  }, [fetchMarkup])

  useEffect(() => {
    loadContent()
  }, [handle, section, template, variantId, loadContent])

  if (error) {
    return <div>Error: {error}</div>
  }

  return <div dangerouslySetInnerHTML={{ __html: markup }} />
}
