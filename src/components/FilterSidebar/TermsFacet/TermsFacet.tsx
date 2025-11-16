import Icon from "@/elements/Icon/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import Pill from "@/elements/Pill/Pill"
import { useOptimisticFacet } from "@/hooks/useOptimisticFacet"
import styles from "./TermsFacet.module.css"

type Props = {
  facet: SearchTermsFacet
}

export default function TermsFacet({ facet }: Props) {
  const { active, toggleActive, optimisticData, selectedFiltersCount, toggleProductFilter } = useOptimisticFacet(facet)

  return (
    <li className={`${styles.dropdown} ${active ? styles.active : ""}`}>
      <button
        className={styles.anchor}
        data-nosto-element="facet"
        onClick={toggleActive}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleActive()
          }
        }}
        aria-controls={`${facet.id}-sub-menu`}
        aria-expanded={!!active}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name}`}
        type="button"
      >
        <span className={styles.title}>{facet.name}</span>
        {selectedFiltersCount > 0 && <span className={styles.count}>{selectedFiltersCount}</span>}
        <span className={styles.icon}>
          <Icon name={active ? "arrow-up" : "arrow-down"} circle={true} />
        </span>
      </button>
      <div className={styles.menu} id={`${facet.id}-sub-menu`}>
        <div className={styles.pillContainer} role="menu">
          {optimisticData.map(value => (
            <Pill
              key={value.value}
              selected={value.selected}
              secondary={`(${value.count})`}
              onClick={e => {
                e.preventDefault()
                toggleProductFilter(facet.field, value.value, !value.selected)
              }}
            >
              {value.value}
            </Pill>
          ))}
        </div>
      </div>
    </li>
  )
}
