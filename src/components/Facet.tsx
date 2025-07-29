import { useFacet } from "@nosto/search-js/preact/hooks"
import Checkbox from "./elements/Checkbox"
import Icon from "./elements/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "../styles/components/facet.module.css"

export default function Facet({ facet }: { facet: SearchTermsFacet }) {
  const { active, selectedFiltersCount, toggleActive, toggleProductFilter } = useFacet(facet)

  return (
    <li class={`${styles.dropdown} ${active ? styles.active : ""}`} aria-expanded={!!active}>
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
      <div className={styles.submenu} id={`${facet.id}-sub-menu`}>
        <ul role="menu">
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
