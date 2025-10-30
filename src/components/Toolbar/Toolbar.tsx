import { useNostoAppState, useSelectedFiltersCount, useSort, useSizeOptions } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions, defaultConfig, sizes } from "@/config"
import Select from "@/elements/Select/Select"
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
    <Button light className={cl("flex items-center", className)} onClick={toggle}>
      <div className="flex justify-center items-center gap-ns-2">
        <span>Filter</span>
      </div>
      {selectedFiltersCount > 0 && <span className="rounded-ns-pill py-[0.1rem] px-[0.35rem] inline-block text-center text-ns-3 font-ns-bold text-ns-white bg-ns-primary ml-ns-1">{selectedFiltersCount}</span>}
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
    <div className={cl("flex flex-row flex-wrap items-center justify-between p-[0_var(--ns-space-2)_var(--ns-space-1)_var(--ns-space-2)] z-ns-header-control", loading && "opacity-30 !justify-end")}>
      <div className="flex items-center">
        <ToggleFilterSidebarButton selectedFiltersCount={selectedFiltersCount} />
      </div>
      <div className="flex flex-wrap gap-ns-3 items-center w-auto justify-end mb-0">
        {!loading && (
          <span className="inline-block text-center text-ns-black" data-nosto-element="totalResults">
            {from} - {total < to ? total : to} of {total} items
          </span>
        )}
        <Select
          value={activeSort}
          onChange={e => setSort((e.target as HTMLSelectElement)?.value)}
          className="min-w-auto"
          options={options}
          label={"Sort by"}
        />
      </div>
    </div>
  )
}
