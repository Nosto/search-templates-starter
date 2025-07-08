import { useFacets } from "@nosto/search-js/preact/hooks"
import Facet from "./Facet"
import RangeFacet from "./RangeFacet"
import Icon from "./elements/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"

export const toggleButtonId = "toggle-mobile-sidebar"

function ToggleSidebarButton({ className }: { className?: string } = {}) {
  return (
    <label
      className={`ns-act-btn ns-close-sidebar ns-absolute ns-d-block ns-d-md-none ns-text-align-right ns-align-items-center ns-clickable ns-font-3 ${className}`}
      for={toggleButtonId}
    >
      <Icon name="close" />
    </label>
  )
}

export default function SideBar() {
  const { loading, facets } = useFacets()

  return facets?.length > 0 ? (
    <>
      <input type="checkbox" id={toggleButtonId} class="ns-facet-sidebar-toggle ns-d-none" />
      <label
        class="ns-sidebar-backdrop ns-fixed ns-w-100 ns-h-100 ns-background-black ns-d-none"
        for={toggleButtonId}
      />
      <div
        class="ns-sidebar-wrapper ns-d-none ns-d-md-block ns-h-100 ns-col-3 ns-col-l-2"
        style={loading ? "opacity: 0.3;" : ""}
      >
        <div class="ns-sidebar-content ns-relative ns-background-white ns-h-100 ns-mr-0 ns-mr-md-auto">
          <div class="ns-sidebar-header ns-d-flex ns-align-items-baseline ns-p-4">
            <span class="ns-font-medium ns-font-5 ns-color-black">Filters</span>
            <ToggleSidebarButton />
          </div>
          <div class="ns-sidebar-menu">
            <ul class="ns-list-unstyled ns-p-0 ns-m-0">
              {facets?.map(facet => {
                switch (facet.type) {
                  case "terms":
                    return <Facet key={facet.id} facet={facet as SearchTermsFacet} />
                  case "stats":
                    return <RangeFacet key={facet.id} facet={facet as SearchStatsFacet} />
                  default:
                    return null
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  )
}
