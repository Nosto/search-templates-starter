import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import { HistoryItem } from "../HistoryItem/HistoryItem"
import Heading from "@/elements/Heading/Heading"
import styles from "./History.module.css"

export type KeywordsProps = {
  onSubmit: (query: string) => void
}

export function History({ onSubmit }: KeywordsProps) {
  const historyItems = useNostoAppState(state => state.historyItems)

  if (!historyItems) {
    return null
  }

  return (
    <div className={styles.historyColumn}>
      <Heading>Recent searches</Heading>
      {historyItems.map(item => (
        <HistoryItem key={item} item={item} onSubmit={onSubmit} />
      ))}
    </div>
  )
}
