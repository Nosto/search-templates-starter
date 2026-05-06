import { useSelectedFiltersCount, useSort, useSizeOptions } from "@nosto/search-js/preact/hooks"
import { sortOptions, defaultSize, sizes } from "@/config"
import Select from "@/elements/Select/Select"
import styles from "./Toolbar.module.css"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"
import { useFilterSidebar } from "@/contexts/SidebarContext"

type Props = {
  selectedFiltersCount: number
  className?: string
}

function ToggleFilterSidebarButton({ selectedFiltersCount, className }: Props) {
  const { toggle } = useFilterSidebar()

  return (
    <Button light className={cl(styles.filter, className)} onClick={toggle}>
      <div className={styles.label}>
        <span>Filter</span>
      </div>
      {selectedFiltersCount > 0 && <span className={styles.badge}>{selectedFiltersCount}</span>}
    </Button>
  )
}

export default function Toolbar() {
  const { activeSort, setSort } = useSort(sortOptions)
  const selectedFiltersCount = useSelectedFiltersCount()
  const { from, to, total } = useSizeOptions(sizes, defaultSize)

  const options = sortOptions.map(o => ({ value: o.id, label: o.value.name }))

  return (
    <div className={cl(styles.container)}>
      <div className={styles.leftSide}>
        <ToggleFilterSidebarButton selectedFiltersCount={selectedFiltersCount} />
      </div>
      <div className={styles.rightSide}>
        <span className={styles.total} data-nosto-element="totalResults">
          {from} - {total < to ? total : to} of {total} items
        </span>
        <Select
          value={activeSort}
          onChange={e => setSort((e.target as HTMLSelectElement)?.value)}
          className={styles.sortMenu}
          options={options}
          label={"Sort by"}
        />
      </div>
    </div>
  )
}
