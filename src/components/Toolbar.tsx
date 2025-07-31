import { useNostoAppState, useSelectedFiltersCount, useSort } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions } from "../config"
import Icon from "./elements/Icon"
import Select from "./elements/Select"
import { toggleButtonId } from "./Sidebar"
import style from "../styles/components/toolbar.module.css"
import { Button } from "./elements"

function ToggleMobileSidebarButton({
  selectedFiltersCount,
  className
}: {
  selectedFiltersCount: number
  className?: string
}) {
  return (
    <Button name="action-light" className={`${style.hideDesktop} ${className}`}>
      <label for={toggleButtonId} className={style.label}>
        <Icon name="filter" />
        <span>Filter</span>
      </label>
      {selectedFiltersCount > 0 && <span className={style.buttonText}>{selectedFiltersCount}</span>}
    </Button>
  )
}

export default function Toolbar() {
  const { loading, response } = useNostoAppState(state => pick(state, "loading", "response"))
  const { activeSort, setSort } = useSort(sortOptions)
  const selectedFiltersCount = useSelectedFiltersCount()

  const docCount = response.products?.total ?? 0

  const options = sortOptions.map(o => ({ value: o.id, label: o.value.name }))

  return (
    <div className={style.container} style={loading ? "opacity: 0.3; justify-content: end !important;" : ""}>
      {!loading && (
        <span className={style.total} data-nosto-element="totalResults">
          {docCount} products
        </span>
      )}
      <div className={style.buttonsContainer}>
        <ToggleMobileSidebarButton selectedFiltersCount={selectedFiltersCount} />
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
