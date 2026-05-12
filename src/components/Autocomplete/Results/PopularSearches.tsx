import { SearchPopularSearches } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import PopularSearch from "../Item/PopularSearch"

export type SearchesProps = {
  searches: SearchPopularSearches
}

export default function PopularSearches({ searches }: SearchesProps) {
  if (!searches?.hits?.length) {
    return null
  }

  return (
    <div
      className={
        "flex min-w-[150px] flex-col border-r border-[var(--ns-color-grey-light)] p-[var(--ns-space-1)] max-md:min-w-0 max-md:border-b max-md:border-r-0"
      }
    >
      <Heading>Popular searches</Heading>
      <div className={"flex flex-col"}>
        {searches.hits.map(search => (
          <PopularSearch key={search.query} search={search} />
        ))}
      </div>
    </div>
  )
}
