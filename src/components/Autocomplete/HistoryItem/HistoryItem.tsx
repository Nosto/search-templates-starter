import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import styles from "./HistoryItem.module.css"
import { cl } from "@nosto/search-js/utils"

type HistoryItemProps = {
  item: string
  highlighted: boolean
  onSubmit: (query: string) => void
}

export function HistoryItem({ item, highlighted, onSubmit }: HistoryItemProps) {
  return (
    <HistoryElement key={item} onSubmit={() => onSubmit(item)}>
      <div className={cl(styles.container, highlighted && styles.highlighted)}>
        <div className={styles.name}>{item}</div>
      </div>
    </HistoryElement>
  )
}
