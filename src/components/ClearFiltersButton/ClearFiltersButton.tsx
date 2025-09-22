import { useProductFilters } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"

export default function ClearFiltersButton() {
  const { filters, removeAll } = useProductFilters()

  if (filters.length === 0) {
    return null
  }

  return (
    <Button
      onClick={() => {
        removeAll()
      }}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          removeAll()
        }
      }}
      aria-label="Clear all filters"
      type="button"
    >
      Clear Filters
    </Button>
  )
}
