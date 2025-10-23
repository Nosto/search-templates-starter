import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import { HistoryItem } from "../HistoryItem/HistoryItem"
import Heading from "@/elements/Heading/Heading"
import { RovingFocusGroup } from "@/components/RovingFocus/RovingFocusGroup"
import { RovingFocusItem } from "@/components/RovingFocus/RovingFocusItem"
import styles from "./History.module.css"

export type KeywordsProps = {
  onSubmit: (query: string) => void
}

export function History({ onSubmit }: KeywordsProps) {
  const historyItems = useNostoAppState(state => state.historyItems)
  // TODO: Keyboard navigation
  //   const { highlightedElementIndex } = useContext(AutocompleteContext)
  const highlightedElementIndex = -1

  if (!historyItems) {
    return null
  }

  return (
    <div className={styles.historyColumn}>
      <Heading>Recent searches</Heading>
      <RovingFocusGroup orientation="vertical" loop={true}>
        {historyItems.map((item, index) => (
          <RovingFocusItem key={item}>
            <HistoryItem item={item} onSubmit={onSubmit} highlighted={index === highlightedElementIndex} />
          </RovingFocusItem>
        ))}
      </RovingFocusGroup>
    </div>
  )
}
