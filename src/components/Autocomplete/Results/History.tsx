import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import HistoryItem from "../Item/HistoryItem"
import Heading from "@/elements/Heading/Heading"

export default function History() {
  const historyItems = useNostoAppState(state => state.historyItems)

  if (!historyItems) {
    return null
  }

  return (
    <div
      className={
        "flex min-w-[150px] flex-col border-r border-[var(--ns-color-grey-light)] p-[var(--ns-space-1)] max-md:min-w-0 max-md:border-b max-md:border-r-0"
      }
    >
      <Heading>Recent searches</Heading>
      {historyItems.map(item => (
        <HistoryItem key={item} item={item} />
      ))}
    </div>
  )
}
