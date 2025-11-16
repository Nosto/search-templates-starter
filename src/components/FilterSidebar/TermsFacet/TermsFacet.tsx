import { useFacet } from "@nosto/search-js/preact/hooks"
import Icon from "@/elements/Icon/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import Pill from "@/elements/Pill/Pill"
import { useOptimistic } from "@/hooks/useOptimistic"
import styles from "./TermsFacet.module.css"

type Props = {
  facet: SearchTermsFacet
}

export default function TermsFacet({ facet }: Props) {
  const { active, toggleActive, toggleProductFilter } = useFacet(facet)

  const [optimisticData, setOptimisticData] = useOptimistic(facet.data || [], (currentData, update) => {
    const typedUpdate = update as { value: string; selected: boolean }
    return currentData.map(item =>
      item.value === typedUpdate.value ? { ...item, selected: typedUpdate.selected } : item
    )
  })

  const optimisticSelectedCount = optimisticData.filter(item => item.selected).length

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
        {optimisticSelectedCount > 0 && <span className={styles.count}>{optimisticSelectedCount}</span>}
        <span className={styles.icon}>
          <Icon name={active ? "arrow-up" : "arrow-down"} circle={true} />
        </span>
      </button>
      <div className={styles.menu} id={`${facet.id}-sub-menu`}>
        <div className={styles.pillContainer} role="menu">
          {optimisticData.map(value => (
            <Pill
              key={value.value}
              selected={value.selected}
              secondary={`(${value.count})`}
              onClick={e => {
                e.preventDefault()
                setOptimisticData({ value: value.value, selected: !value.selected })
                toggleProductFilter(facet.field, value.value, !value.selected)
              }}
            >
              {value.value}
            </Pill>
          ))}
        </div>
      </div>
    </li>
  )
}
