import { useProductFilters } from "@nosto/search-js/preact/hooks"
import styles from "./SelectedFilters.module.css"
import Pill from "@/elements/Pill/Pill"

function formatFilterValue(filter: { name?: string; value?: string } | undefined) {
  if (!filter) return ""

  // Check if this is a range filter by looking for a pattern like "10-50" or "1-5"
  const isRangeFilter = filter?.value && /^\d+(\.\d+)?[-–]\d+(\.\d+)?$/.test(filter.value)

  if (isRangeFilter && filter?.name) {
    return `${filter.name}: ${filter.value}`
  }

  return filter?.value
}

export default function SelectedFilters() {
  const { filters } = useProductFilters()

  return (
    filters.length > 0 && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {filters.map(filter => (
            <Pill
              key={`${filter?.name}: ${filter?.value}`}
              onClick={e => {
                e.preventDefault()
                filter?.remove()
              }}
            >
              {formatFilterValue(filter)}
            </Pill>
          ))}
        </div>
      </div>
    )
  )
}
