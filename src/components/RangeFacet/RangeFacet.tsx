import { useRange } from "@nosto/search-js/preact/hooks"
import { useState, useEffect } from "preact/hooks"
import DualRange from "@/elements/DualRange/DualRange"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import styles from "./RangeFacet.module.css"
import { cl } from "@nosto/search-js/utils"
import { useFacetCollapse } from "@/contexts/FacetCollapseContext"

type Props = {
  facet: SearchStatsFacet
}

export default function RangeFacet({ facet }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const isSelected = min !== range[0] || max !== range[1]
  const [active, setActive] = useState(isSelected)
  const { shouldCollapse, resetCollapseFlag } = useFacetCollapse()

  // Handle collapse event from context
  useEffect(() => {
    if (shouldCollapse) {
      setActive(false)
      resetCollapseFlag()
    }
  }, [shouldCollapse, resetCollapseFlag])

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
        <DualRange
          min={min}
          max={max}
          value={[range[0], range[1]]}
          onChange={updateRange}
          id={`ns-${facet.id}-range`}
        />
      </div>
    </li>
  )
}
