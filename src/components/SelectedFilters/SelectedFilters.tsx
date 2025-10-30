import { useProductFilters } from "@nosto/search-js/preact/hooks"
import Pill from "@/elements/Pill/Pill"

export default function SelectedFilters() {
  const { filters } = useProductFilters()

  return (
    filters.length > 0 && (
      <div className="flex flex-wrap items-center p-ns-2">
        <div className="flex flex-wrap items-center relative w-full flex-[0_0_83.333333%] max-w-[83.333333%]">
          {filters.map(filter => (
            <Pill
              key={`${filter?.name}: ${filter?.value}`}
              onClick={e => {
                e.preventDefault()
                filter?.remove()
              }}
            >
              {filter?.name}: {filter?.value}
            </Pill>
          ))}
        </div>
      </div>
    )
  )
}
