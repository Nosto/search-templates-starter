import { useEffect, useState } from "preact/hooks"

export function useFetch(url: string | null) {
  const [html, setHtml] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) {
      setHtml("")
      return
    }

    const fetchHtml = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }

        const htmlContent = await response.text()
        setHtml(htmlContent)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch")
        setHtml("")
      } finally {
        setLoading(false)
      }
    }

    fetchHtml()
  }, [url])

  return { html, loading, error }
}
