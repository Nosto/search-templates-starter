import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import Heading from "@/elements/Heading/Heading"
import styles from "./History.module.css"

export type HistoryProps = {
  onSubmit: (query: string) => void
}

export function History({ onSubmit }: HistoryProps) {
  const historyItems = useNostoAppState(state => state.historyItems)

  if (!historyItems?.length) {
    return null
  }

  return (
    <div className={styles.historySection}>
      <Heading>Recent searches</Heading>
      <div className={styles.pillContainer}>
        {historyItems.map(item => (
          <HistoryElement key={item} onSubmit={() => onSubmit(item)}>
            <span className={styles.pill}>{item}</span>
          </HistoryElement>
        ))}
      </div>
    </div>
  )
}
