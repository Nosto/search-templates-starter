import {
  useFacets,
  useNostoAppState,
  useSelectedFiltersCount,
  useSort,
  useProductFilters
} from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions } from "@/config"
import Facet from "@/components/Facet/Facet"
import RangeFacet from "@/components/Facet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import Select from "@/elements/Select/Select"
import Button from "@/elements/Button/Button"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import cl from "@/utils/cl"
import styles from "./FilteringAndSorting.module.css"

export const toggleButtonId = "toggle-mobile-sidebar"

type ToggleButtonProps = {
  className?: string
}

function ToggleSidebarButton({ className }: ToggleButtonProps = {}) {
  return (
    <Button className={cl(styles.close, className)}>
      <label htmlFor={toggleButtonId} aria-label="Close sidebar filters">
        <Icon name="close" />
      </label>
    </Button>
  )
}

type ToggleMobileButtonProps = {
  selectedFiltersCount: number
  className?: string
}

function ToggleMobileSidebarButton({ selectedFiltersCount, className }: ToggleMobileButtonProps) {
  return (
    <Button light className={cl(styles.mobile, styles.filter, className)}>
      <label htmlFor={toggleButtonId} className={styles.label}>
        <Icon name="filter" />
        <span>Filter</span>
      </label>
      {selectedFiltersCount > 0 && <span className={styles.badge}>{selectedFiltersCount}</span>}
    </Button>
  )
}

export default function FilteringAndSorting() {
  const { loading: facetsLoading, facets } = useFacets()
  const { loading, response } = useNostoAppState(state => pick(state, "loading", "response"))
  const { activeSort, setSort } = useSort(sortOptions)
  const selectedFiltersCount = useSelectedFiltersCount()
  const { filters, removeAll } = useProductFilters()

  const docCount = response.products?.total ?? 0
  const options = sortOptions.map(o => ({ value: o.id, label: o.value.name }))

  return (
    <div className={styles.container}>
      {/* Toolbar/Sorting Section */}
      <div className={styles.toolbar} style={loading ? styles.loading : ""}>
        {!loading && (
          <span className={styles.total} data-nosto-element="totalResults">
            {docCount} products
          </span>
        )}
        <div className={styles.buttons}>
          <ToggleMobileSidebarButton selectedFiltersCount={selectedFiltersCount} />
          <Select
            value={activeSort}
            onChange={e => setSort((e.target as HTMLSelectElement)?.value)}
            className={styles.sortMenu}
            options={options}
            label={"Sort by"}
          />
        </div>
      </div>

      {/* Selected Filters Section */}
      {filters.length > 0 && (
        <div className={styles.selectedFilters}>
          <div className={styles.selectedFiltersContainer}>
            {filters.map(filter => (
              <div key={`${filter?.name}: ${filter?.value}`} className={styles.selectedFilter}>
                <span className={styles.selectedFilterLabel}>
                  {filter?.name}: {filter?.value}
                </span>
                <Button className={styles.selectedFilterButton} onClick={() => filter?.remove()} icon="close" />
              </div>
            ))}
          </div>
          <button
            className={styles.clearFilters}
            onClick={() => {
              removeAll()
            }}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                removeAll()
              }
            }}
            aria-label="Clear all filters"
            type="button"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Sidebar/Filtering Section */}
      {facets?.length > 0 && (
        <>
          <input type="checkbox" id={toggleButtonId} className={styles.toggle} />
          <label className={styles.backdrop} htmlFor={toggleButtonId} aria-label="Close sidebar" />
          <div className={styles.sidebar} style={facetsLoading ? "opacity: 0.3;" : ""}>
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={styles.title}>Filters</span>
                <ToggleSidebarButton />
              </div>
              <div>
                <ul className={styles.facets}>
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
      )}
    </div>
  )
}
