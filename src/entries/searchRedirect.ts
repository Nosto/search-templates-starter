import { searchPath } from "@/config"
import { QUERY_PARAM } from "@/mapping/url/constants"

/**
 * Redirects to the search page with the given query
 * @param query - The search query to redirect with
 */
export function searchRedirect(query: string) {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) {
    return
  }

  const url = new URL(searchPath, window.location.origin)
  url.searchParams.set(QUERY_PARAM, trimmedQuery)

  window.location.href = url.href
}
