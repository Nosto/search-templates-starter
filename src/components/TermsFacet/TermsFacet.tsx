import { useFacet } from "@nosto/search-js/preact/hooks"
import { useEffect, useRef } from "preact/hooks"
import Icon from "@/elements/Icon/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import Pill from "@/elements/Pill/Pill"
import styles from "./TermsFacet.module.css"

type Props = {
  facet: SearchTermsFacet
  /** Changes to this token collapse the facet */
  resetToken?: number
}

export default function TermsFacet({ facet, resetToken }: Props) {
  const { active, selectedFiltersCount, toggleActive, toggleProductFilter } = useFacet(facet)
  const prevToken = useRef<number | undefined>(resetToken)

  useEffect(() => {
    if (prevToken.current !== resetToken) {
      prevToken.current = resetToken
      if (active) {
        // Toggle to collapse if currently open
        toggleActive()
      }
    }
  }, [resetToken, active, toggleActive])

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
          {facet.data?.map(value => (
            <Pill
              key={value.value}
              selected={value.selected}
              onClick={e => {
                e.preventDefault()
                toggleProductFilter(facet.field, value.value, !value.selected)
              }}
            >
              {value.value} ({value.count})
            </Pill>
          ))}
        </div>
      </div>
    </li>
  )
}
