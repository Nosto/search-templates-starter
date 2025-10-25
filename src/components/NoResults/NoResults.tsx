import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./NoResults.module.css"

/**
 * A component displayed when no search results or products are found.
 * Shows the current search query to help users understand why no results were returned.
 * Provides a clear message indicating the search yielded no matches.
 *
 * @returns A no results message displaying the current search query
 */
export default function NoResults() {
  const query = useNostoAppState(state => state.response.query)

  return (
    <div className={style.container}>
      <div>No results found for &apos;{query}&apos;</div>
    </div>
  )
}
