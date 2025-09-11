import { useFacet } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "./Facet.module.css"

type Props = {
  facet: SearchTermsFacet
}

export default function Facet({ facet }: Props) {
  const { toggleProductFilter } = useFacet(facet)

  return (
    <div className={styles.facet}>
      <h3 className={styles.title}>{facet.name}</h3>
      <div className={styles.options}>
        {facet.data?.map(value => (
          <Button
            key={value.value}
            className={`${styles.option} ${value.selected ? styles.selected : ""}`}
            data-nosto-element="facet-setting"
            onClick={e => {
              e.preventDefault()
              toggleProductFilter(facet.field, value.value, !value.selected)
            }}
            aria-pressed={value.selected}
            type="button"
          >
            {value.value} ({value.count})
          </Button>
        ))}
      </div>
    </div>
  )
}
