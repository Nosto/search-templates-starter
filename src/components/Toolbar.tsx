import { useNostoAppState, useSelectedFiltersCount, useSort } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions } from "../config"
import Icon from "./elements/Icon"
import Select from "./elements/Select"
import { toggleButtonId } from "./Sidebar"

function ToggleMobileSidebarButton({
  selectedFiltersCount,
  className
}: {
  selectedFiltersCount: number
  className?: string
}) {
  return (
    <label
      for={toggleButtonId}
      className={`ns-act-btn ns-act-btn-light ns-filters ns-d-inline-flex ns-d-md-none ns-text-align-center ns-align-items-center ${className}`}
    >
      <Icon name="filter" />
      <span>Filter</span>
      {selectedFiltersCount > 0 && (
        <span className="ns-total-count ns-d-inline-block ns-text-align-center ns-font-3 ns-font-bold ns-color-white ns-background-primary ns-ml-1">
          {selectedFiltersCount}
        </span>
      )}
    </label>
  )
}

export default function Toolbar() {
  const { loading, response } = useNostoAppState(state => pick(state, "loading", "response"))
  const { activeSort, setSort } = useSort(sortOptions)
  const selectedFiltersCount = useSelectedFiltersCount()

  const docCount = response.products?.total ?? 0

  const options = sortOptions.map(o => ({ value: o.id, label: o.value.name }))

  return (
    <div
      class="ns-header-controls ns-d-flex ns-flex-column ns-flex-md-row ns-d-none ns-d-md-flex  ns-flex-wrap align-center ns-justify-content-between ns-pt-o ns-pr-2 ns-pb-1 ns-pl-2"
      style={loading ? "opacity: 0.3; justify-content: end !important;" : ""}
    >
      {!loading && (
        <span
          class="ns-d-inline ns-text-align-center ns-order-3 ns-d-md-block ns-order-md-first ns-align-self-md-center ns-color-black"
          data-nosto-element="totalResults"
        >
          {docCount} products
        </span>
      )}
      <div class="ns-d-flex ns-flex-wrap ns-justify-content-between ns-d-md-block nos-w-100 ns-mb-4">
        <ToggleMobileSidebarButton selectedFiltersCount={selectedFiltersCount} />
        <Select
          value={activeSort}
          onChange={e => setSort((e.target as HTMLSelectElement)?.value)}
          className="ns-selection-dropdown-sort-menu"
          options={options}
          label={"Sort by"}
        />
      </div>
    </div>
  )
}
