import { useSizeOptions } from "@nosto/search-js/preact/hooks"
import { defaultSize, sizes } from "@/config"
import Pagination from "@/components/Pagination/Pagination"
import Select from "@/elements/Select/Select"

export default function BottomToolbar() {
  const { size, handleSizeChange, sizeOptions } = useSizeOptions(sizes, defaultSize)
  const options = sizeOptions.map(v => ({ value: v, label: `${v} items per page` }))

  return (
    <div className={"my-[var(--ns-space-4)]"}>
      <div
        className={
          "my-[var(--ns-space-2)] flex w-full box-border flex-nowrap items-center justify-center gap-[var(--ns-space-3)] p-[var(--ns-space-2)] text-[var(--ns-color-black)] min-[375px]:relative min-[375px]:justify-center min-[375px]:[&>:not(:first-child):last-child]:absolute min-[375px]:[&>:not(:first-child):last-child]:right-0"
        }
      >
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
