import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import HistoryItem from "../Item/HistoryItem"
import Heading from "@/elements/Heading/Heading"
import styles from "./History.module.css"

export default function History() {
  const historyItems = useNostoAppState(state => state.historyItems)

  if (!historyItems) {
    return null
  }

  return (
    <div className={styles.historyColumn}>
      <Heading>Recent searches</Heading>
      {historyItems.map(item => (
        <HistoryItem key={item} item={item} />
      ))}
    </div>
  )
}
