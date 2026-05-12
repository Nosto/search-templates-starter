import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./styles"

export default function NoResults() {
  const query = useNostoAppState(state => state.response.query)

  return (
    <div className={styles.container}>
      <div>No results found for &apos;{query}&apos;</div>
    </div>
  )
}
