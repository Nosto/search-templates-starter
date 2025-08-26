import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./History.module.css"
import { useContext } from "preact/hooks"
import HistoryElement from "../HistoryElement/HistoryElement"
import { AutocompleteContext } from "@nosto/search-js/preact/inject"

export function History() {
  const historyItems = useNostoAppState(state => state.historyItems)
  const { highlightedElementIndex } = useContext(AutocompleteContext)

  if (!historyItems) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Recent searches</div>
      {historyItems.map((item, index) => (
        <HistoryElement key={item} item={item} highlighted={index === highlightedElementIndex} />
      ))}
    </div>
  )
}