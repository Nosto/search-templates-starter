import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./NoResults.module.css"

export default function NoResults() {
  const query = useNostoAppState(state => state.response.query)

  return (
    <div className={styles.container}>
      <div>No results found for &apos;{query}&apos;</div>
    </div>
  )
}
