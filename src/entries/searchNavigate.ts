import { searchPath } from "@/config"
import { QUERY_PARAM } from "@/mapping/url/constants"

/**
 * Navigates to the search page with the given query using SPA navigation
 * @param query - The search query to navigate with
 */
export function searchNavigate(query: string) {
  const url = new URL(searchPath, window.location.origin)
  url.searchParams.set(QUERY_PARAM, query)

  window.history.pushState(null, "", url.pathname + url.search)
}
