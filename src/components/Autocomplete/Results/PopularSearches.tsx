import { SearchPopularSearches } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import { styles } from "./styles"
import PopularSearch from "../Item/PopularSearch"

export type SearchesProps = {
  searches: SearchPopularSearches
}

export default function PopularSearches({ searches }: SearchesProps) {
  if (!searches?.hits?.length) {
    return null
  }

  return (
    <div className={styles.suggestionsColumn}>
      <Heading>Popular searches</Heading>
      <div className={styles.keywords}>
        {searches.hits.map(search => (
          <PopularSearch key={search.query} search={search} />
        ))}
      </div>
    </div>
  )
}
