import { useProductFilters } from "@nosto/search-js/preact/hooks"
import styles from "./SelectedFilters.module.css"
import Pill from "@/elements/Pill/Pill"

export default function SelectedFilters() {
  const { filters } = useProductFilters()

  return (
    filters.length > 0 && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {filters.map(filter =>
            filter ? (
              <Pill
                key={`${filter.name}: ${filter.value}`}
                onClick={e => {
                  e.preventDefault()
                  filter.remove()
                }}
              >
                {filter.name}: {filter.value}
              </Pill>
            ) : null
          )}
        </div>
      </div>
    )
  )
}
