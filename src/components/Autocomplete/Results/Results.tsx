import { useNostoAppState, useResponse } from "@nosto/search-js/preact/hooks"
import Keywords from "./Keywords"
import Products from "./Products"
import History from "./History"
import { useRovingFocus } from "@/hooks/useRovingFocus"

type ResultsProps = {
  onKeyDown: (e: KeyboardEvent) => void
}

export default function Results({ onKeyDown }: ResultsProps) {
  const { keywords, products } = useResponse()

  const containerRef = useRovingFocus<HTMLDivElement>(".ns-autocomplete-element")

  const hasResults = !!(keywords?.hits?.length || products?.hits?.length)
  const hasHistory = !!useNostoAppState(state => state.historyItems?.length)

  if (!hasResults && !hasHistory) {
    return null
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="absolute flex flex-col items-start bg-ns-white box-border mx-auto left-0 right-0 z-ns-autocomplete max-w-ns-autocomplete border border-ns-thin border-ns-grey-light rounded-ns-3 shadow-ns-autocomplete w-[calc(100%-var(--ns-width-autocomplete-offset))] font-ns text-ns-4 md:w-auto" data-nosto-element="autocomplete" onKeyDown={onKeyDown}>
      <div className="mt-auto w-full p-ns-1" ref={containerRef}>
        <div className="flex flex-row max-md:flex-col">
          <div className="flex flex-row max-md:grid max-md:grid-cols-2">
            {hasHistory && <History />}
            {hasResults && <Keywords keywords={keywords} />}
          </div>

          {hasResults && <Products products={products} />}
        </div>
      </div>
    </div>
  )
}
