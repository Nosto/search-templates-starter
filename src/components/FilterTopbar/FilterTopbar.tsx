import { useFacets } from "@nosto/search-js/preact/hooks"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import TermsDropdown from "./TermsDropdown/TermsDropdown"
import RangeDropdown from "./RangeDropdown/RangeDropdown"
import ClearFiltersButton from "./ClearFiltersButton/ClearFiltersButton"

export default function FilterTopbar() {
  const { facets } = useFacets()

  if (!facets || facets.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-ns-2 items-center py-ns-2 px-0 border-b border-ns-thin border-ns-grey-light max-md:flex-col max-md:items-stretch max-md:gap-ns-1">
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
      <ClearFiltersButton />
    </div>
  )
}
