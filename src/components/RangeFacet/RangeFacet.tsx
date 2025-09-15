import { useRange } from "@nosto/search-js/preact/hooks"
import { useState } from "preact/hooks"
import RangeInput from "@/elements/RangeInput/RangeInput"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import styles from "./RangeFacet.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  facet: SearchStatsFacet
}

export default function RangeFacet({ facet }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const isSelected = min !== range[0] || max !== range[1]
  const [active, setActive] = useState(isSelected)

  return (
    <li className={cl(styles.dropdown, active && styles.active)}>
      <button
        className={styles.anchor}
        onClick={() => {
          setActive(!active)
        }}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setActive(!active)
          }
        }}
        aria-controls={`${facet.id}-range-menu`}
        aria-expanded={active}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name} range filter`}
        type="button"
      >
        <span className={styles.title}>{facet.name}</span>
        {isSelected && <span className={styles.count}>{1}</span>}
        <span className={styles.icon}>
          <Icon name={active ? "arrow-up" : "arrow-down"} circle={true} />
        </span>
      </button>
      <div className={styles.menu} id={`${facet.id}-range-menu`} aria-expanded={active}>
        <div className={styles.range}>
          <div className={styles.input}>
            <label htmlFor={`ns-${facet.id}-min`}>Min.</label>
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
          <div className={styles.input}>
            <label htmlFor={`ns-${facet.id}-max`}>Max.</label>
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
