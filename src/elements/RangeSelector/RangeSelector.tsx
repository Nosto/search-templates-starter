import { useState } from "preact/hooks"
import Icon from "@/elements/Icon/Icon"
import Checkbox from "@/elements/Checkbox/Checkbox"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import { useRangeSelector } from "@nosto/search-js/preact/hooks"
import styles from "./RangeSelector.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  /** The stats facet to display range options for */
  facet: SearchStatsFacet
  /** Size of auto-generated buckets (default: 100) */
  rangeSize?: number
}

export default function RangeSelector({ facet, rangeSize = 100 }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { min, max, range, ranges, updateRange, handleMinChange, handleMaxChange, isSelected } = useRangeSelector(
    facet.id,
    rangeSize
  )
  const [active, setActive] = useState(false)

  const toggleActive = () => {
    setActive(!active)
  }

  const handleRangeToggle = (rangeItem: (typeof ranges)[0]) => {
    if (rangeItem.selected) {
      updateRange([undefined, undefined])
    } else {
      updateRange([rangeItem.min, rangeItem.max])
    }
  }

  const selectedCount = ranges.filter(r => r.selected).length

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
        <div className={styles.bucketContainer}>
          {ranges.map(rangeItem => (
            <Checkbox
              key={`${rangeItem.min}-${rangeItem.max}`}
              value={`${rangeItem.min} - ${rangeItem.max}`}
              selected={rangeItem.selected ?? false}
              onChange={() => handleRangeToggle(rangeItem)}
              className={styles.bucketItem}
            />
          ))}
        </div>
      </div>
    </li>
  )
}
