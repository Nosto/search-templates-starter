import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import HistoryItem from "../HistoryItem/HistoryItem"
import Heading from "@/elements/Heading/Heading"

export default function History() {
  const historyItems = useNostoAppState(state => state.historyItems)

  if (!historyItems) {
    return null
  }

  return (
    <div className="flex flex-col border-r border-ns-thin border-ns-grey-light min-w-[150px] p-ns-1 max-md:border-r-0 max-md:border-b max-md:min-w-auto">
      <Heading>Recent searches</Heading>
      {historyItems.map(item => (
        <HistoryItem key={item} item={item} />
      ))}
    </div>
  )
}
