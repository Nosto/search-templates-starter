import { useNostoAppState, useSelectedFiltersCount, useSort, useSizeOptions } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions, defaultConfig, sizes } from "@/config"
import Select from "@/elements/Select/Select"
import style from "./Toolbar.module.css"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"
import { useFilterSideBar } from "@/contexts/FilterSideBarContext"

type Props = {
  selectedFiltersCount: number
  className?: string
}

function ToggleFilterSideBarButton({ selectedFiltersCount, className }: Props) {
  const { toggle } = useFilterSideBar()

  return (
    <Button light className={cl(style.filter, className)} onClick={toggle}>
      <div className={style.label}>
        <span>Filter</span>
      </div>
      {selectedFiltersCount > 0 && <span className={style.badge}>{selectedFiltersCount}</span>}
    </Button>
  )
}

export default function Toolbar() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { activeSort, setSort } = useSort(sortOptions)
  const selectedFiltersCount = useSelectedFiltersCount()
  const { from, to, total } = useSizeOptions(sizes, defaultConfig.serpSize)

  const options = sortOptions.map(o => ({ value: o.id, label: o.value.name }))

  return (
    <div className={cl(style.container, loading && style.loading)}>
      <div className={style.leftSide}>
        <ToggleFilterSideBarButton selectedFiltersCount={selectedFiltersCount} />
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
