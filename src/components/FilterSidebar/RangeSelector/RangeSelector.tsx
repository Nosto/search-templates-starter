import { useState } from "preact/hooks"
import Icon from "@/elements/Icon/Icon"
import RadioButton from "@/elements/RadioButton/RadioButton"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import { useRangeSelector } from "@nosto/search-js/preact/hooks"
import styles from "./RangeSelector.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  /** The stats facet to display range options for */
  facet: SearchStatsFacet
  /** Size of auto-generated buckets (default: 100) */
  rangeSize?: number
  /** Whether the selector is initially expanded (default: false) */
  defaultActive?: boolean
}

export default function RangeSelector({ facet, rangeSize = 100, defaultActive = false }: Props) {
  const { ranges, updateRange } = useRangeSelector(facet.id, rangeSize)
  const [active, setActive] = useState(defaultActive)

  const toggleActive = () => {
    setActive(!active)
  }

  const selectedCount = ranges.filter(r => r.selected).length

  // TODO currency formatting for price ranges

  return (
    <li className={cl(styles.dropdown, active && styles.active)}>
      <button
        className={styles.anchor}
        onClick={toggleActive}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleActive()
          }
        }}
        aria-controls={`${facet.id}-range-menu`}
        aria-expanded={active}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name} range selector`}
        type="button"
      >
        <span className={styles.title}>{facet.name}</span>
        {selectedCount > 0 && <span className={styles.count}>{selectedCount}</span>}
        <span className={styles.icon}>
          <Icon name={active ? "arrow-up" : "arrow-down"} circle={true} />
        </span>
      </button>
      <div className={styles.menu} id={`${facet.id}-range-menu`} aria-expanded={active}>
        <div className={styles.rangeContainer}>
          {ranges.map(rangeItem => (
            <RadioButton
              key={`${rangeItem.min}-${rangeItem.max}`}
              name={`${facet.id}-range`}
              value={`${rangeItem.min} - ${rangeItem.max}`}
              selected={rangeItem.selected ?? false}
              onChange={() =>
                rangeItem.selected ? updateRange([undefined, undefined]) : updateRange([rangeItem.min, rangeItem.max])
              }
              className={styles.rangeItem}
            />
          ))}
        </div>
      </div>
    </li>
  )
}
