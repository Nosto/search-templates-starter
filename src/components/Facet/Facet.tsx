import { useFacet } from "@nosto/search-js/preact/hooks"
import Icon from "@/elements/Icon/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import Pill from "@/elements/Pill/Pill"
import ColorCircle from "@/elements/ColorCircle/ColorCircle"
import styles from "./Facet.module.css"

type Props = {
  facet: SearchTermsFacet
}

export default function Facet({ facet }: Props) {
  const { active, selectedFiltersCount, toggleActive, toggleProductFilter } = useFacet(facet)
  const isColorFacet = facet.field === "color" || facet.id === "color"

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
          <Icon name={active ? "arrow-up" : "arrow-down"} />
        </span>
      </button>
      <div className={styles.menu} id={`${facet.id}-sub-menu`}>
        <div className={styles.pillContainer} role="menu">
          {facet.data?.map(value => (
            <Pill
              key={value.value}
              selected={value.selected}
              onClick={e => {
                e.preventDefault()
                toggleProductFilter(facet.field, value.value, !value.selected)
              }}
            >
              {isColorFacet && <ColorCircle color={value.value} />}
              {value.value} ({value.count})
            </Pill>
          ))}
        </div>
      </div>
    </li>
  )
}
