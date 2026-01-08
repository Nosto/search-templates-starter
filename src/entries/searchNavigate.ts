import { searchPath } from "@/config"
import { QUERY_PARAM } from "@/mapping/url/constants"

/**
 * Navigates to the search page with the given query using SPA navigation
 * @param query - The search query to navigate with
 * @param mode - Navigation mode, "history" for SPA navigation without reload
 */
export function searchNavigate(query: string, mode?: "history") {
  const url = new URL(searchPath, window.location.origin)
  url.searchParams.set(QUERY_PARAM, query)
  if (mode === "history") {
    window.history.pushState(null, "", url.pathname + url.search)
  } else {
    window.location.href = url.href
  }
}
