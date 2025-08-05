import { useRange } from "@nosto/search-js/preact/hooks"
import { useState } from "preact/hooks"
import RangeInput from "./elements/RangeInput"
import Icon from "./elements/Icon"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import styles from "./Facet.module.css"

export default function RangeFacet({ facet }: { facet: SearchStatsFacet }) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const isSelected = min !== range[0] || max !== range[1]
  const [active, setActive] = useState(isSelected)

  return (
    <li className={`${styles.dropdown} ${active ? styles.active : ""}`}>
      <span
        className={styles.anchor}
        onClick={() => {
          setActive(!active)
        }}
      >
        <span className={styles.anchorTitle}>{facet.name}</span>
        {isSelected && <span className={styles.anchorCount}>{1}</span>}
        <span className={styles.dropdownAnchorIcon}>
          <Icon name={active ? "arrow-up" : "arrow-down"} />
        </span>
      </span>
      <div className={styles.submenu} aria-expanded={active}>
        <div className={styles.range}>
          <div className={styles.rangeInput}>
            <label for={`ns-${facet.id}-min`}>Min.</label>
            <RangeInput
              id={`ns-${facet.id}-min`}
              min={min}
              max={max}
              value={range[0]}
              onChange={e => {
                const value = parseFloat(e.currentTarget.value) || undefined
                updateRange([value, range[1]])
              }}
            />
          </div>
          <div className={styles.rangeInput}>
            <label for={`ns-${facet.id}-max`}>Max.</label>
            <RangeInput
              id={`ns-${facet.id}-max`}
              min={min}
              max={max}
              value={range[1]}
              onChange={e => {
                const value = parseFloat(e.currentTarget.value) || undefined
                updateRange([range[0], value])
              }}
            />
          </div>
        </div>
      </div>
    </li>
  )
}
