import { useNostoAppState, useSelectedFiltersCount, useSort, useSizeOptions } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions, defaultConfig, sizes } from "@/config"
import Select from "@/elements/Select/Select"
import style from "./Toolbar.module.css"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"
import { useFilterSidebar } from "@/contexts/SidebarContext"

type Props = {
  selectedFiltersCount: number
  className?: string
}

/**
 * A button component that toggles the filter sidebar visibility.
 * Displays the current number of selected filters as a badge when filters are active.
 * Integrates with the SidebarContext to control sidebar state.
 *
 * @param selectedFiltersCount - Number of currently active filters to display in badge
 * @param className - Additional CSS classes to apply to the button
 * @returns A filter toggle button with selected filters count badge
 */
function ToggleFilterSidebarButton({ selectedFiltersCount, className }: Props) {
  const { toggle } = useFilterSidebar()

  return (
    <Button light className={cl(style.filter, className)} onClick={toggle}>
      <div className={style.label}>
        <span>Filter</span>
      </div>
      {selectedFiltersCount > 0 && <span className={style.badge}>{selectedFiltersCount}</span>}
    </Button>
  )
}

/**
 * The main toolbar component for search and category pages.
 * Provides filter toggle button, results count display, and sort options.
 * Shows loading states and manages responsive layout between left and right sections.
 *
 * @returns A toolbar with filter controls, results summary, and sorting options
 */
export default function Toolbar() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { activeSort, setSort } = useSort(sortOptions)
  const selectedFiltersCount = useSelectedFiltersCount()
  const { from, to, total } = useSizeOptions(sizes, defaultConfig.serpSize)

  const options = sortOptions.map(o => ({ value: o.id, label: o.value.name }))

  return (
    <div className={cl(style.container, loading && style.loading)}>
      <div className={style.leftSide}>
        <ToggleFilterSidebarButton selectedFiltersCount={selectedFiltersCount} />
      </div>
      <div className={style.rightSide}>
        {!loading && (
          <span className={style.total} data-nosto-element="totalResults">
            {from} - {total < to ? total : to} of {total} items
          </span>
        )}
        <Select
          value={activeSort}
          onChange={e => setSort((e.target as HTMLSelectElement)?.value)}
          className={style.sortMenu}
          options={options}
          label={"Sort by"}
        />
      </div>
    </div>
  )
}
