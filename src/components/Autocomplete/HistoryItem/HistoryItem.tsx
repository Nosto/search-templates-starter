import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import styles from "./HistoryItem.module.css"

type HistoryItemProps = {
  item: string
  onSubmit: (query: string) => void
}

export function HistoryItem({ item, onSubmit }: HistoryItemProps) {
  const handleClick = () => onSubmit(item)
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onSubmit(item)
    }
  }

  return (
    <HistoryElement key={item} onSubmit={() => onSubmit(item)}>
      <div
        data-autocomplete-item
        className={styles.container}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className={styles.name}>{item}</div>
      </div>
    </HistoryElement>
  )
}
