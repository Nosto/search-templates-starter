import { useState } from "preact/hooks"
import Icon from "@/elements/Icon/Icon"
import Checkbox from "@/elements/Checkbox/Checkbox"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import { useRangeSelector } from "@nosto/search-js/preact/hooks"
import styles from "./RangeSelector.module.css"
import { cl } from "@nosto/search-js/utils"

type RangeBucket = {
  min: number
  max: number
  label: string
}

type Props = {
  /** The stats facet to display range options for */
  facet: SearchStatsFacet
  /** Optional custom bucket definitions. If not provided, buckets are auto-generated using rangeSize */
  buckets?: RangeBucket[]
  /** Size of auto-generated buckets (default: 100). Ignored if custom buckets are provided */
  rangeSize?: number
}

export default function RangeSelector({ facet, buckets: customBuckets, rangeSize = 100 }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { min, max, range, ranges, updateRange, handleMinChange, handleMaxChange, isSelected } = useRangeSelector(
    facet.id,
    rangeSize
  )
  const [active, setActive] = useState(false)

  const buckets =
    customBuckets ||
    ranges.map(r => ({
      min: r.min,
      max: r.max,
      label: `${r.min} - ${r.max}`
    }))

  const toggleActive = () => {
    setActive(!active)
  }

  const isBucketSelected = (bucket: RangeBucket) => {
    const matchingRange = ranges.find(r => r.min === bucket.min && r.max === bucket.max)
    return matchingRange?.selected ?? false
  }

  const handleBucketToggle = (bucket: RangeBucket) => {
    if (isBucketSelected(bucket)) {
      updateRange([undefined, undefined])
    } else {
      updateRange([bucket.min, bucket.max])
    }
  }

  const selectedCount = buckets.filter(isBucketSelected).length

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
          {buckets.map(bucket => (
            <Checkbox
              key={`${bucket.min}-${bucket.max}`}
              value={bucket.label}
              selected={isBucketSelected(bucket)}
              onChange={() => handleBucketToggle(bucket)}
              className={styles.bucketItem}
            />
          ))}
        </div>
      </div>
    </li>
  )
}
