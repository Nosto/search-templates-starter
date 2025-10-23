import { useNostoAppState, useResponse } from "@nosto/search-js/preact/hooks"
import style from "./Results.module.css"
import Keywords from "./Keywords"
import Products from "./Products"
import { History } from "./History"
import { useRovingFocus } from "@/hooks/useRovingFocus"
import { useEffect, useRef } from "preact/hooks"

type ResultsProps = {
  onSubmit: (query: string) => void
}

export default function Results({ onSubmit }: ResultsProps) {
  const { keywords, products } = useResponse()
  const historyItems = useNostoAppState(state => state.historyItems)
  const rovingFocus = useRovingFocus()
  const containerRef = useRef<HTMLDivElement>(null)

  const hasResults = !!(keywords?.hits?.length || products?.hits?.length)
  const hasHistory = !!historyItems?.length

  // Configure roving focus when container is available
  useEffect(() => {
    if (containerRef.current) {
      rovingFocus.setConfig({
        parentElement: containerRef.current,
        focusableSelector: "[data-roving-focus-item]"
      })
    }
  }, [rovingFocus, hasResults, hasHistory])

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
