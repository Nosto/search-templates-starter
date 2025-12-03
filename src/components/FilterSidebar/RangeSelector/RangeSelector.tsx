import { useState } from "preact/hooks"
import Icon from "@/elements/Icon/Icon"
import Checkbox from "@/elements/Checkbox/Checkbox"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import { useRange } from "@nosto/search-js/preact/hooks"
import styles from "./RangeSelector.module.css"
import { cl } from "@nosto/search-js/utils"

type RangeBucket = {
  min: number
  max: number
  label: string
}

type Props = {
  facet: SearchStatsFacet
  buckets?: RangeBucket[]
}

function generateDefaultBuckets(min: number, max: number): RangeBucket[] {
  const range = max - min
  const bucketSize = Math.ceil(range / 6)
  const buckets: RangeBucket[] = []

  for (let i = 0; i < 6; i++) {
    const bucketMin = min + i * bucketSize
    const bucketMax = i === 5 ? max : min + (i + 1) * bucketSize
    buckets.push({
      min: bucketMin,
      max: bucketMax,
      label: `${bucketMin} - ${bucketMax}`
    })
  }

  return buckets
}

export default function RangeSelector({ facet, buckets: customBuckets }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const [active, setActive] = useState(false)

  const buckets = customBuckets || generateDefaultBuckets(min, max)

  const toggleActive = () => {
    setActive(!active)
  }

  const isBucketSelected = (bucket: RangeBucket) => {
    return range[0] === bucket.min && range[1] === bucket.max
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
