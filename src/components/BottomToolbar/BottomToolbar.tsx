import { useSizeOptions } from "@nosto/search-js/preact/hooks"
import { defaultConfig, sizes } from "@/config"
import Pagination from "@/components/Pagination/Pagination"
import Select from "@/elements/Select/Select"

export default function BottomToolbar() {
  const { size, handleSizeChange, sizeOptions } = useSizeOptions(sizes, defaultConfig.serpSize)
  const options = sizeOptions.map(v => ({ value: v, label: `${v} items per page` }))

  return (
    <div className="my-ns-4 mx-0">
      <div className="flex items-center flex-nowrap justify-center box-border text-ns-black w-full p-ns-2 my-ns-2 mx-0 gap-ns-3 min-[375px]:relative min-[375px]:[&>:not(:first-child):last-child]:absolute min-[375px]:[&>:not(:first-child):last-child]:right-0">
        <Pagination />
        {options.length > 0 && (
          <Select
            value={size}
            onChange={e => handleSizeChange(Number((e.target as HTMLSelectElement)?.value))}
            options={options}
            label={"Items per page"}
          />
        )}
      </div>
    </div>
  )
}
