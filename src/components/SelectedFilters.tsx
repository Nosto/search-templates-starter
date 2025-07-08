import { useProductFilters } from "@nosto/search-js/preact/hooks"

export default function SelectedFilters() {
  const { filters, removeAll } = useProductFilters()

  return (
    filters.length > 0 && (
      <div class="ns-d-flex ns-flex-wrap ns-align-items-center ns-pl-2 ns-pr-2 ns-pt-2 ns-pb-2">
        <div class="ns-col-10 ns-d-flex ns-flex-wrap ns-align-items-center">
          {filters.map(filter => (
            <div
              key={`${filter?.name}: ${filter?.value}`}
              class="ns-selected-filter ns-d-flex ns-align-items-center ns-px-1 ns-mr-1 ns-mb-1 ns-font-4"
            >
              <span class="ns-color-black">
                {filter?.name}: {filter?.value}
              </span>
              <button
                className={`ns-act-btn ns-text-align-right ns-align-items-center ns-clickable ns-p-1 ns-color-black`}
                onClick={() => filter?.remove()}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <span
          class="ns-anchor ns-col-2 ns-text-align-right ns-color-link ns-font-4 ns-ml-2 ns-mr-0 ns-ml-auto"
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
