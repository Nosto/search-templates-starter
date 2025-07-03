import { useSizeOptions } from "@nosto/search-js/preact/hooks"
import { defaultConfig, sizes } from "../config"
import Pagination from "./Pagination"
import Select from "./elements/Select"

export default function BottomToolbar() {
  const { from, to, size, total, handleSizeChange, sizeOptions } = useSizeOptions(sizes, defaultConfig.serpSize)
  const options = sizeOptions.map(v => ({ value: v, label: `${v} items per page` }))

  return (
    <div class="ns-my-4 ns-mx-0">
      <div class="ns-d-flex ns-align-items-center ns-flex-wrap ns-justify-content-center ns-justify-content-xs-between ns-border-box ns-color-black ns-w-100 ns-p-2 ns-my-2 ns-mx-0">
        <div>
          {from} - {total < to ? total : to} of {total} items
        </div>
        {sizeOptions.length > 0 && (
          <Select
            value={size}
            onChange={e => handleSizeChange(Number((e.target as HTMLSelectElement)?.value))}
            className="ns-selection-dropdown-size-menu"
            options={options}
            label={"Items per page"}
          />
        )}
      </div>
      <Pagination />
    </div>
  )
}
