/**
 * Redirects to the search page with the given query
 * @param query - The search query to redirect with
 */
export function redirectToSearch(query: string): void {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) {
    return
  }

  const searchParams = new URLSearchParams()
  searchParams.set("q", trimmedQuery)

  const url = new URL("/", window.location.origin)
  url.search = searchParams.toString()

  window.location.href = url.href
}
