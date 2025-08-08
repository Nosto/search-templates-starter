import { useNostoAppState, useSelectedFiltersCount, useSort } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions } from "@/config"
import Icon from "@/elements/Icon/Icon"
import Select from "@/elements/Select/Select"
import { toggleButtonId } from "@/components/Sidebar/Sidebar"
import style from "./Toolbar.module.css"
import Button from "@/elements/Button/Button"

type Props = {
  selectedFiltersCount: number
  className?: string
}

function ToggleMobileSidebarButton({ selectedFiltersCount, className }: Props) {
  return (
    <Button light className={`${style.mobile} ${style.filter} ${className}`}>
      <label for={toggleButtonId} className={style.label}>
        <Icon name="filter" />
        <span>Filter</span>
      </label>
      {selectedFiltersCount > 0 && <span className={style.badge}>{selectedFiltersCount}</span>}
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
    <div className={style.container} style={loading ? style.loading : ""}>
      {!loading && (
        <span className={style.total} data-nosto-element="totalResults">
          {docCount} products
        </span>
      )}
      <div className={style.buttons}>
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
