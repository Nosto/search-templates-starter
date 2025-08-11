import { useProductFilters } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"

export default function SelectedFilters() {
  const { filters, removeAll } = useProductFilters()

  return (
    filters.length > 0 && (
      <div className="flex flex-wrap items-center p-ns-2">
        <div className="flex flex-wrap items-center relative w-full flex-[0_0_83.333333%] max-w-[83.333333%] gap-ns-2">
          {filters.map(filter => (
            <div
              key={`${filter?.name}: ${filter?.value}`}
              className="flex items-center p-ns-1 text-ns-4 border border-ns-grey rounded-ns-3"
            >
              <span className="text-ns-black">
                {filter?.name}: {filter?.value}
              </span>
              <Button
                className="text-right items-center cursor-pointer p-ns-1 text-ns-black"
                onClick={() => filter?.remove()}
                icon="close"
              />
            </div>
          ))}
        </div>
        <span
          className="cursor-pointer relative w-full flex-[0_0_16.666667%] max-w-[16.666667%] text-right text-ns-link text-ns-4 ml-auto mr-0"
          onClick={() => {
            removeAll()
          }}
        >
          Clear Filters
        </span>
      </div>
    )
  )
}
