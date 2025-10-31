import { SearchPopularSearches } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import style from "./Results.module.css"
import PopularSearch from "../Item/PopularSearch"

export type SearchesProps = {
  searches: SearchPopularSearches
}

export default function PopularSearches({ searches }: SearchesProps) {
  if (!searches?.hits?.length) {
    return null
  }

  return (
    <div className={style.suggestionsColumn}>
      <Heading>Popular searches</Heading>
      <div className={style.keywords}>
        {searches.hits.map(search => (
          <PopularSearch key={search.query} search={search} />
        ))}
      </div>
    </div>
  )
}
