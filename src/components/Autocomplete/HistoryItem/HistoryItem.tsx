import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import styles from "./HistoryItem.module.css"

type HistoryItemProps = {
  item: string
  onSubmit: (query: string) => void
}

export function HistoryItem({ item, onSubmit }: HistoryItemProps) {
  return (
    <HistoryElement key={item} onSubmit={() => onSubmit(item)}>
      <div className={styles.container} role="button" tabIndex={0}>
        <div className={styles.name}>{item}</div>
      </div>
    </HistoryElement>
  )
}
