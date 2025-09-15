import { useProductFilters } from "@nosto/search-js/preact/hooks"
import styles from "./SelectedFilters.module.css"
import Pill from "@/elements/Pill/Pill"

export default function SelectedFilters() {
  const { filters, removeAll } = useProductFilters()

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
              {filter?.value}
            </Pill>
          ))}
        </div>
        <button
          className={styles.clear}
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
        </button>
      </div>
    )
  )
}
