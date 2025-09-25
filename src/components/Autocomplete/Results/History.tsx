import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import { HistoryItem } from "../HistoryItem/HistoryItem"
import styles from "./History.module.css"

export type KeywordsProps = {
  onSubmit: (query: string) => void
}

export function History({ onSubmit }: KeywordsProps) {
  const historyItems = useNostoAppState(state => state.historyItems)
  //   const { highlightedElementIndex } = useContext(AutocompleteContext)
  const highlightedElementIndex = -1

  if (!historyItems) {
    return null
  }

  return (
    <div className={styles.historyColumn}>
      <div className={styles.header}>Recent searches</div>
      {historyItems.map((item, index) => (
        <HistoryItem key={item} item={item} onSubmit={onSubmit} highlighted={index === highlightedElementIndex} />
      ))}
    </div>
  )
}
