import { useProductFilters } from "@nosto/search-js/preact/hooks"
import { useSidebar } from "@/contexts/SidebarContext"
import Button from "@/elements/Button/Button"

export default function ClearFiltersButton() {
  const { filters, removeAll } = useProductFilters()
  const { setOpen } = useSidebar()

  if (filters.length === 0) {
    return null
  }

  const handleClearFilters = () => {
    removeAll()
    setOpen(false)
  }

  return (
    <Button
      onClick={handleClearFilters}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClearFilters()
        }
      }}
      aria-label="Clear all filters"
      type="button"
    >
      Clear Filters
    </Button>
  )
}
