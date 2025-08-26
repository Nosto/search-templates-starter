import { useFacet } from "@nosto/search-js/preact/hooks"
import Checkbox from "@/elements/Checkbox/Checkbox"
import Icon from "@/elements/Icon/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "./Facet.module.css"

type Props = {
  facet: SearchTermsFacet
}

export default function Facet({ facet }: Props) {
  const { active, selectedFiltersCount, toggleActive, toggleProductFilter } = useFacet(facet)

  return (
    <li className={`${styles.dropdown} ${active ? styles.active : ""}`} aria-expanded={!!active}>
      <span
        className={styles.anchor}
        data-nosto-element="facet"
        onClick={toggleActive}
        aria-controls={`${facet.id}-sub-menu`}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name}`}
      >
        <span className={styles.title}>{facet.name}</span>
        {selectedFiltersCount > 0 && <span className={styles.count}>{selectedFiltersCount}</span>}
        <span className={styles.icon}>
          <Icon name={active ? "arrow-up" : "arrow-down"} />
        </span>
      </span>
      <div className={styles.menu} id={`${facet.id}-sub-menu`}>
        <ul className={styles.list} role="menu">
          {facet.data?.map(value => (
            <li key={value.value} data-nosto-element="facet-setting" role="menuitem">
              <Checkbox
                value={value.value}
                selected={value.selected}
                onChange={e => {
                  e.preventDefault()
                  toggleProductFilter(facet.field, value.value, !value.selected)
                }}
              />
              <span className={styles.count}>{value.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
