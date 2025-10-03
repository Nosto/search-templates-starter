import { useFacets } from "@nosto/search-js/preact/hooks"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import TermsDropdown from "./TermsDropdown"
import RangeDropdown from "./RangeDropdown"
import styles from "./FilterTopBar.module.css"

export default function FilterTopBar() {
  const { facets } = useFacets()

  if (!facets || facets.length === 0) {
    return null
  }

  return (
    <div className={styles.bar}>
      {facets.map(facet => {
        switch (facet.type) {
          case "terms":
            return <TermsDropdown key={facet.id} facet={facet as SearchTermsFacet} />
          case "stats":
            return <RangeDropdown key={facet.id} facet={facet as SearchStatsFacet} />
          default:
            return null
        }
      })}
    </div>
  )
}
