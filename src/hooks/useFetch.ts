import { useEffect, useState } from "preact/hooks"

export function useFetch(url: string) {
  const [html, setHtml] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
