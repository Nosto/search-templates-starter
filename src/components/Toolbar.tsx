import { useNostoAppState, useSelectedFiltersCount, useSort } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions } from "../config"
import Icon from "./elements/Icon"
import Select from "./elements/Select"
import { toggleButtonId } from "./Sidebar"
import style from "../styles/components/toolbar.module.css"
import buttonStyle from "../styles/elements/button.module.css"

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
      className={`${buttonStyle["action-button-light"]} ${style["hide-desktop"]} ${className}`}
    >
      <Icon name="filter" />
      <span>Filter</span>
      {selectedFiltersCount > 0 && <span className={style["button-text"]}>{selectedFiltersCount}</span>}
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
    <div className={style.container} style={loading ? "opacity: 0.3; justify-content: end !important;" : ""}>
      {!loading && (
        <span className={style.total} data-nosto-element="totalResults">
          {docCount} products
        </span>
      )}
      <div className={style["buttons-container"]}>
        <ToggleMobileSidebarButton selectedFiltersCount={selectedFiltersCount} />
        <Select
          value={activeSort}
          onChange={e => setSort((e.target as HTMLSelectElement)?.value)}
          className={style["sort-menu"]}
          options={options}
          label={"Sort by"}
        />
      </div>
    </div>
  )
}
