import { useFacets } from "@nosto/search-js/preact/hooks"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import TermsFilterDropdown from "./TermsFilterDropdown"
import RangeFilterDropdown from "./RangeFilterDropdown"
import styles from "./FilterBar.module.css"

export default function FilterBar() {
  const { facets } = useFacets()

  if (!facets || facets.length === 0) {
    return null
  }

  return (
    <div className={styles.filterBar}>
      {facets.map(facet => {
        switch (facet.type) {
          case "terms":
            return <TermsFilterDropdown key={facet.id} facet={facet as SearchTermsFacet} />
          case "stats":
            return <RangeFilterDropdown key={facet.id} facet={facet as SearchStatsFacet} />
          default:
            return null
        }
      })}
    </div>
  )
}
