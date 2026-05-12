import { useNostoAppState, useResponse } from "@nosto/search-js/preact/hooks"
import { autocompleteResultsStyles as styles } from "@/styles/classNames"
import Keywords from "./Keywords"
import Products from "./Products"
import History from "./History"
import PopularSearches from "./PopularSearches"
import { useRovingFocus } from "@/hooks/useRovingFocus"
import Categories from "./Categories"

type ResultsProps = {
  onKeyDown: (e: KeyboardEvent) => void
}

export default function Results({ onKeyDown }: ResultsProps) {
  const { categories, keywords, products, popularSearches } = useResponse()
  const containerRef = useRovingFocus<HTMLDivElement>(".ns-autocomplete-element")

  const hasResults = !!(
    categories?.hits?.length ||
    keywords?.hits?.length ||
    products?.hits?.length ||
    popularSearches?.hits?.length
  )
  const hasHistory = !!useNostoAppState(state => state.historyItems?.length)

  if (!hasResults && !hasHistory) {
    return null
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.autocomplete} data-nosto-element="autocomplete" onKeyDown={onKeyDown}>
      <div className={`${styles.container} ${styles.paddingContainer}`} ref={containerRef}>
        <div className={styles.items}>
          <div className={styles.section}>
            {hasHistory && <History />}
            {hasResults && <Keywords keywords={keywords} />}
            {hasResults && <Categories categories={categories} />}
            {hasResults && <PopularSearches searches={popularSearches} />}
          </div>
          {hasResults && <Products products={products} />}
        </div>
      </div>
    </div>
  )
}
