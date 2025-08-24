import { useRange } from "@nosto/search-js/preact/hooks"
import { useState } from "preact/hooks"
import RangeInput from "@/elements/RangeInput/RangeInput"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import styles from "./Facet.module.css"
import cl from "@/utils/cl"

type Props = {
  facet: SearchStatsFacet
}

export default function RangeFacet({ facet }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const isSelected = min !== range[0] || max !== range[1]
  const [active, setActive] = useState(isSelected)

  return (
    <li className={cl(styles.dropdown, active && styles.active)}>
      <span
        className={styles.anchor}
        onClick={() => {
          setActive(!active)
        }}
      >
        <span className={styles.title}>{facet.name}</span>
        {isSelected && <span className={styles.count}>{1}</span>}
        <span className={styles.icon}>
          <Icon name={active ? "arrow-up" : "arrow-down"} />
        </span>
      </span>
      <div className={styles.menu} aria-expanded={active}>
        <div className={styles.range}>
          <div className={styles.rangeContainer}>
            <label htmlFor={`ns-${facet.id}-range`}>Max: {range[1] || max}</label>
            <RangeInput
              type="range"
              id={`ns-${facet.id}-range`}
              min={min}
              max={max}
              value={range[1] || max}
              onChange={e => {
                const value = parseFloat(e.currentTarget.value)
                updateRange([min, value])
              }}
            />
            <div className={styles.rangeLabels}>
              <span>{min}</span>
              <span>{max}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
