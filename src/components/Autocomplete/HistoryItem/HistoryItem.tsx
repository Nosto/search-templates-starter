import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import styles from "./HistoryItem.module.css"

type HistoryItemProps = {
  item: string
  onSubmit: (query: string) => void
}

export default function HistoryItem({ item, onSubmit }: HistoryItemProps) {
  return (
    <HistoryElement key={item} class={styles.container} onSubmit={() => onSubmit(item)}>
      <div className={styles.name}>{item}</div>
    </HistoryElement>
  )
}
