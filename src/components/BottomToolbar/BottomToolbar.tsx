import { useSizeOptions } from "@nosto/search-js/preact/hooks"
import { defaultConfig, sizes } from "@/config"
import Pagination from "@/components/Pagination/Pagination"
import Select from "@/elements/Select/Select"

export default function BottomToolbar() {
  const { from, to, size, total, handleSizeChange, sizeOptions } = useSizeOptions(sizes, defaultConfig.serpSize)
  const options = sizeOptions.map(v => ({ value: v, label: `${v} items per page` }))

  return (
    <div className="my-ns-4">
      <div className="flex items-center flex-wrap justify-center box-border text-ns-black w-full p-ns-2 my-ns-2 min-[375px]:justify-between">
        <div>
          {from} - {total < to ? total : to} of {total} items
        </div>
        {sizeOptions.length > 0 && (
          <Select
            value={size}
            onChange={e => handleSizeChange(Number((e.target as HTMLSelectElement)?.value))}
            options={options}
            label={"Items per page"}
          />
        )}
      </div>
      <Pagination />
    </div>
  )
}
