import { useFacets } from "@nosto/search-js/preact/hooks"
import Facet from "@/components/Facet/Facet"
import RangeFacet from "@/components/Facet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import cl from "@/utils/cl"

export const toggleButtonId = "toggle-mobile-sidebar"

type Props = {
  className?: string
}

function ToggleSidebarButton({ className }: Props = {}) {
  return (
    <Button
      className={cl(
        "border-0 max-w-ns-mobile-close-sidebar top-[10px] right-[10px] absolute block text-right items-center text-ns-3 cursor-pointer md:hidden",
        className
      )}
    >
      <label for={toggleButtonId}>
        <Icon name="close" />
      </label>
    </Button>
  )
}

export default function SideBar() {
  const { loading, facets } = useFacets()

  return facets?.length > 0 ? (
    <>
      <input type="checkbox" id={toggleButtonId} className="peer hidden" />
      <label
        className="fixed top-0 left-0 z-ns-sidebar-backdrop opacity-50 w-full h-full bg-ns-black hidden peer-checked:block md:peer-checked:hidden"
        for={toggleButtonId}
      />
      <div
        className={cl(
          // Base mobile styles - hidden by default
          "top-0 left-0 z-ns-sidebar-wrapper max-w-ns-mobile-sidebar transition-all duration-300 ease-in-out hidden h-full",
          // Responsive flex layout
          "flex-[0_0_25%] max-w-[25%] lg:flex-[0_0_16.666667%] lg:max-w-[16.666667%]",
          // Mobile toggle states
          "peer-checked:block peer-checked:fixed peer-checked:max-h-full",
          // Tablet and up - always show sidebar, override mobile toggle behavior
          "md:block md:peer-checked:static md:peer-checked:max-h-none"
        )}
        style={loading ? "opacity: 0.3;" : ""}
      >
        <div className="overflow-y-auto relative bg-ns-white h-full mr-0 p-ns-5 min-w-ns-mobile-sidebar md:min-w-0">
          <div className="flex items-baseline p-ns-4 border-b border-ns-grey-light">
            <span className="font-ns-medium text-ns-black">Filters</span>
            <ToggleSidebarButton />
          </div>
          <div>
            <ul className="list-none p-0 m-0">
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
