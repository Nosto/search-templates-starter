import { useNostoAppState, useSelectedFiltersCount, useSort } from "@nosto/search-js/preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { sortOptions } from "@/config"
import Icon from "@/elements/Icon/Icon"
import Select from "@/elements/Select/Select"
import { toggleButtonId } from "@/components/Sidebar/Sidebar"
import Button from "@/elements/Button/Button"
import cl from "@/utils/cl"

type Props = {
  selectedFiltersCount: number
  className?: string
}

function ToggleMobileSidebarButton({ selectedFiltersCount, className }: Props) {
  return (
    <Button light className={cl("flex items-center md:!hidden", className)}>
      <label for={toggleButtonId} className="flex justify-center items-center gap-ns-2">
        <Icon name="filter" />
        <span>Filter</span>
      </label>
      {selectedFiltersCount > 0 && (
        <span className="rounded-full px-[0.35rem] py-[0.1rem] inline-block text-center text-ns-3 font-ns-bold text-ns-white bg-ns-primary ml-ns-1">
          {selectedFiltersCount}
        </span>
      )}
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
    <div
      className={cl(
        "flex flex-col flex-wrap items-center justify-between px-ns-2 pb-ns-1 z-ns-header-control md:flex-row",
        loading && "opacity-30 !justify-end"
      )}
    >
      {!loading && (
        <span
          className="inline-block text-center order-3 text-ns-black md:self-center md:order-[-1] md:block"
          data-nosto-element="totalResults"
        >
          {docCount} products
        </span>
      )}
      <div className="flex flex-wrap justify-between w-full mb-ns-4 md:block md:w-auto">
        <ToggleMobileSidebarButton selectedFiltersCount={selectedFiltersCount} />
        <Select
          value={activeSort}
          onChange={e => setSort((e.target as HTMLSelectElement)?.value)}
          options={options}
          label={"Sort by"}
        />
      </div>
    </div>
  )
}
