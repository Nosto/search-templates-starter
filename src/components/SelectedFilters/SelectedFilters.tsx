import { useProductFilters } from "@nosto/search-js/preact/hooks"
import styles from "./SelectedFilters.module.css"
import Button from "@/elements/Button/Button"

export default function SelectedFilters() {
  const { filters, removeAll } = useProductFilters()

  return (
    filters.length > 0 && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {filters.map(filter => (
            <div key={`${filter?.name}: ${filter?.value}`} className={styles.filter}>
              <span className={styles.label}>
                {filter?.name}: {filter?.value}
              </span>
              <Button className={styles.button} onClick={() => filter?.remove()} icon="close" />
            </div>
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
