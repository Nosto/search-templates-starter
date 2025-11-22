import { config } from "@/config"
import { QUERY_PARAM } from "@/mapping/url/constants"

/**
 * Redirects to the search page with the given query
 * @param query - The search query to redirect with
 */
export function searchRedirect(query: string) {
  const url = new URL(config.searchPath, window.location.origin)
  url.searchParams.set(QUERY_PARAM, query)

  window.location.href = url.href
}
