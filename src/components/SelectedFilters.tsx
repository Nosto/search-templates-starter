import { useProductFilters } from "@nosto/search-js/preact/hooks"
import styles from "../styles/components/selectedFilters.module.css"
import buttonStyles from "../styles/components/button.module.css"

export default function SelectedFilters() {
  const { filters, removeAll } = useProductFilters()

  return (
    filters.length > 0 && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {filters.map(filter => (
            <div key={`${filter?.name}: ${filter?.value}`} className={styles.filter}>
              <span>
                {filter?.name}: {filter?.value}
              </span>
              <button className={buttonStyles.action} onClick={() => filter?.remove()}>
                ×
              </button>
            </div>
          ))}
        </div>
        <span
          className={styles.clear}
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
