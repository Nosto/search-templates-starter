import { useNostoAppState, useResponse } from "@nosto/search-js/preact/hooks"
import style from "./Results.module.css"
import Keywords from "./Keywords"
import Products from "./Products"
import { History } from "./History"
import { useRovingFocus } from "@/hooks/useRovingFocus"

type ResultsProps = {
  onSubmit: (query: string) => void
}

export default function Results({ onSubmit }: ResultsProps) {
  const { keywords, products } = useResponse()
  const historyItems = useNostoAppState(state => state.historyItems)
  const rovingFocus = useRovingFocus()

  const hasResults = !!(keywords?.hits?.length || products?.hits?.length)
  const hasHistory = !!historyItems?.length

  if (!hasResults && !hasHistory) {
    return null
  }

  // Calculate total items for indexing
  const historyCount = historyItems?.length || 0
  const keywordCount = keywords?.hits?.length || 0

  return (
    <div className={style.autocomplete} data-nosto-element="autocomplete">
      <div className={`${style.container} ${style.paddingContainer}`}>
        <div className={style.items}>
          <div className={style.section}>
            {hasHistory && <History onSubmit={onSubmit} rovingFocus={rovingFocus} startIndex={0} />}
            {hasResults && (
              <Keywords keywords={keywords} onSubmit={onSubmit} rovingFocus={rovingFocus} startIndex={historyCount} />
            )}
          </div>

          {hasResults && (
            <Products products={products} rovingFocus={rovingFocus} startIndex={historyCount + keywordCount} />
          )}
        </div>
      </div>
    </div>
  )
}
