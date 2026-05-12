import { useNostoAppState, useResponse } from "@nosto/search-js/preact/hooks"
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
    <div
      className={
        "absolute left-0 right-0 z-[var(--ns-z-index-autocomplete)] mx-auto box-border flex w-[calc(100%_-_var(--ns-width-autocomplete-offset))] max-w-[var(--ns-max-width-autocomplete)] flex-col items-start rounded-[var(--ns-border-radius-3)] border border-[var(--ns-color-grey-light)] bg-[var(--ns-color-white)] font-[var(--ns-font-family)] text-[length:var(--ns-font-size-4)] shadow-[var(--ns-box-shadow-autocomplete)] md:w-auto"
      }
      data-nosto-element="autocomplete"
      onKeyDown={onKeyDown}
    >
      <div className={`${"mt-auto w-full"} ${"p-[var(--ns-space-1)]"}`} ref={containerRef}>
        <div className={"flex flex-row max-md:flex-col"}>
          <div className={"flex flex-row max-md:grid max-md:grid-cols-2"}>
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
