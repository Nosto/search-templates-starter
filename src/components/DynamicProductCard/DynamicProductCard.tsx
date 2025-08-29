import { useState, useEffect, useRef, useCallback } from "preact/hooks"
import { ComponentChildren } from "preact"
import styles from "./DynamicProductCard.module.css"

export interface DynamicProductCardProps {
  /** The product handle to fetch data for. Required. */
  handle: string
  /** The section to use for rendering the product. section or template is required. */
  section?: string
  /** The template to use for rendering the product. section or template is required. */
  template?: string
  /** The variant ID to fetch specific variant data. Optional. */
  variantId?: string
  /** If true, the component will display placeholder content while loading. Defaults to false. */
  placeholder?: boolean
  /** If true, the component will only fetch data when it comes into view. Defaults to false. */
  lazy?: boolean
  /** Placeholder content to show while loading */
  children?: ComponentChildren
}

export default function DynamicProductCard({
  handle,
  section,
  template,
  variantId,
  placeholder = false,
  lazy = false,
  children
}: DynamicProductCardProps) {
  const [markup, setMarkup] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const elementRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Validate required props
  if (!handle) {
    throw new Error("DynamicProductCard requires a 'handle' prop")
  }

  if (!section && !template) {
    throw new Error("DynamicProductCard requires either 'section' or 'template' prop")
  }

  const fetchMarkup = useCallback(async (): Promise<string> => {
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

    // Validate markup doesn't contain invalid tags
    if (/<(body|html)/.test(html)) {
      throw new Error(
        `Invalid markup for ${template || section}, make sure that no <body> or <html> tags are included.`
      )
    }

    return html
  }, [handle, section, template, variantId])

  const loadContent = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const html = await fetchMarkup()
      setMarkup(html)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content")
    } finally {
      setLoading(false)
    }
  }, [fetchMarkup])

  useEffect(() => {
    if (!lazy) {
      loadContent()
    } else if (elementRef.current) {
      // Set up intersection observer for lazy loading
      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadContent()
            observerRef.current?.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      observerRef.current.observe(elementRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [handle, section, template, variantId, lazy, loadContent])

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  if (error) {
    return (
      <div className={styles.container} data-loading="false" data-error="true" ref={elementRef}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.container} data-loading="true" ref={elementRef}>
        {placeholder && children ? children : <div className={styles.loader}>Loading...</div>}
      </div>
    )
  }

  return (
    <div
      className={styles.container}
      data-loading="false"
      ref={elementRef}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
