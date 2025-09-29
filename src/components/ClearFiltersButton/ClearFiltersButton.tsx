import { useCallback } from "preact/hooks"
import { useProductFilters } from "@nosto/search-js/preact/hooks"
import { useSidebar } from "@/contexts/SidebarContext"
import Button from "@/elements/Button/Button"

type Props = {
  onCleared?: () => void
}

export default function ClearFiltersButton({ onCleared }: Props = {}) {
  const { filters, removeAll } = useProductFilters()
  const { setOpen } = useSidebar()

  const handleClearFilters = useCallback(() => {
    removeAll()
    setOpen(false)
    onCleared?.()
  }, [removeAll, setOpen, onCleared])

  if (filters.length === 0) {
    return null
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
