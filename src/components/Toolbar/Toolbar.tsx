import { useNostoAppState, useSelectedFiltersCount, useSort } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions } from "@/config"
import Icon from "@/elements/Icon/Icon"
import Select from "@/elements/Select/Select"
import style from "./Toolbar.module.css"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"

type Props = {
  selectedFiltersCount: number
  className?: string
  onToggleSidebar: () => void
}

function ToggleSidebarButton({ selectedFiltersCount, className, onToggleSidebar }: Props) {
  return (
    <Button light className={cl(style.mobile, style.filter, className)} onClick={onToggleSidebar}>
      <div className={style.label}>
        <Icon name="filter" />
        <span>Filter</span>
      </div>
      {selectedFiltersCount > 0 && <span className={style.badge}>{selectedFiltersCount}</span>}
    </Button>
  )
}

type ToolbarProps = {
  toggleSidebar: () => void
}

export default function Toolbar({ toggleSidebar }: ToolbarProps) {
  const { loading, response } = useNostoAppState(state => pick(state, "loading", "response"))
  const { activeSort, setSort } = useSort(sortOptions)
  const selectedFiltersCount = useSelectedFiltersCount()

  const docCount = response.products?.total ?? 0

  const options = sortOptions.map(o => ({ value: o.id, label: o.value.name }))

  return (
    <div className={cl(style.container, loading && style.loading)}>
      {!loading && (
        <span className={style.total} data-nosto-element="totalResults">
          {docCount} products
        </span>
      )}
      <div className={style.buttons}>
        <ToggleSidebarButton selectedFiltersCount={selectedFiltersCount} onToggleSidebar={toggleSidebar} />
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
