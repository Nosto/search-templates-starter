import { useProductFilters } from "@nosto/search-js/preact/hooks"
import styles from "./selectedFilters.module.css"
import { Button } from "./elements"

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
              <Button name="base" onClick={() => filter?.remove()} icon="close" />
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
