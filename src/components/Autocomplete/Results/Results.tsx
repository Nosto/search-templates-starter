import { useNostoAppState, useResponse } from "@nosto/search-js/preact/hooks"
import style from "./Results.module.css"
import Keywords from "./Keywords"
import Products from "./Products"
import History from "./History"
import { useRovingFocus } from "@/hooks/useRovingFocus"

type ResultsProps = {
  onSubmit: (query: string) => void
}

export default function Results({ onSubmit }: ResultsProps) {
  const { keywords, products } = useResponse()

  const containerRef = useRovingFocus<HTMLDivElement>(".ns-autocomplete-element")

  const hasResults = !!(keywords?.hits?.length || products?.hits?.length)
  const hasHistory = !!useNostoAppState(state => state.historyItems?.length)

  if (!hasResults && !hasHistory) {
    return null
  }

  return (
    <div className={style.autocomplete} data-nosto-element="autocomplete">
      <div className={`${style.container} ${style.paddingContainer}`} ref={containerRef}>
        <div className={style.items}>
          <div className={style.section}>
            {hasHistory && <History onSubmit={onSubmit} />}
            {hasResults && <Keywords keywords={keywords} onSubmit={onSubmit} />}
          </div>

          {hasResults && <Products products={products} />}
        </div>
      </div>
    </div>
  )
}
