import { useProductFilters } from "@nosto/search-js/preact/hooks"
import styles from "./SelectedFilters.module.css"
import Pill from "@/elements/Pill/Pill"

export default function SelectedFilters() {
  const { filters } = useProductFilters()

  // Group filters by name
  const groupedFilters = filters.reduce(
    (groups, filter) => {
      if (!filter) return groups

      const name = filter.name
      if (!groups[name]) {
        groups[name] = []
      }
      groups[name].push(filter)
      return groups
    },
    {} as Record<string, typeof filters>
  )

  const hasFilters = Object.keys(groupedFilters).length > 0

  return (
    hasFilters && (
      <div className={styles.wrapper}>
        <div className={styles.header}>Selected Filters:</div>
        <div className={styles.container}>
          {Object.entries(groupedFilters).map(([name, filtersInGroup]) => (
            <div key={name} className={styles.group}>
              <div className={styles.name}>{name}:</div>
              <div className={styles.values}>
                {filtersInGroup.map(filter => (
                  <Pill
                    key={`${filter!.name}: ${filter!.value}`}
                    onClick={e => {
                      e.preventDefault()
                      filter!.remove()
                    }}
                  >
                    {filter!.value}
                  </Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )
}
