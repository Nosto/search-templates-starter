import { useSelectedFiltersCount, useSort, useSizeOptions } from "@nosto/search-js/preact/hooks"
import { sortOptions, defaultSize, sizes } from "@/config"
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
      <div className={"flex items-center justify-center gap-[var(--ns-space-2)]"}>
        <span>Filter</span>
      </div>
      {selectedFiltersCount > 0 && (
        <span
          className={
            "ml-[var(--ns-space-1)] inline-block rounded-[var(--ns-border-radius-pill)] bg-[var(--ns-color-primary)] px-[0.35rem] py-[0.1rem] text-center text-[length:var(--ns-font-size-3)] font-[var(--ns-weight-bold)] text-[var(--ns-color-white)]"
          }
        >
          {selectedFiltersCount}
        </span>
      )}
    </Button>
  )
}

export default function Toolbar() {
  const { activeSort, setSort } = useSort(sortOptions)
  const selectedFiltersCount = useSelectedFiltersCount()
  const { from, to, total } = useSizeOptions(sizes, defaultSize)

  const options = sortOptions.map(o => ({ value: o.id, label: o.value.name }))

  return (
    <div
      className={cl(
        "z-[var(--ns-header-control)] flex flex-row flex-wrap items-center justify-between px-[var(--ns-space-2)] pb-[var(--ns-space-1)] pt-0"
      )}
    >
      <div className={"flex items-center"}>
        <ToggleFilterSidebarButton selectedFiltersCount={selectedFiltersCount} />
      </div>
      <div className={"mb-0 flex w-auto flex-wrap items-center justify-end gap-[var(--ns-space-3)]"}>
        <span className={"inline-block text-center text-[var(--ns-color-black)]"} data-nosto-element="totalResults">
          {from} - {total < to ? total : to} of {total} items
        </span>
        <Select
          value={activeSort}
          onChange={e => setSort((e.target as HTMLSelectElement)?.value)}
          className={"min-w-0"}
          options={options}
          label={"Sort by"}
        />
      </div>
    </div>
  )
}
