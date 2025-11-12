import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, useCallback } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variables.css"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { autocompleteConfig, categoryConfig, selectors, serpConfig } from "@/config"
import { useActions } from "@nosto/search-js/preact/hooks"
import Category from "@/components/Category/Category"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import { tagging } from "@/mapping/tagging"
import { nostojs } from "@nosto/nosto-js"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import Portal from "@/elements/Portal/Portal"
import AutocompleteInjected from "@/components/Autocomplete/AutocompleteInjected"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"

function SerpApp() {
  const { newSearch } = useActions()

  const onSubmit = useCallback(
    (query: string, options?: SearchAnalyticsOptions) => {
      nostojs(api => api.recordSearchSubmit(query))
      newSearch({ query }, options)
    },
    [newSearch]
  )

  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <AutocompletePageProvider config={autocompleteConfig}>
          <Portal target={selectors.dropdown}>
            <AutocompleteInjected onSubmit={onSubmit} />
          </Portal>
        </AutocompletePageProvider>
        <Portal target={selectors.results} clear>
          <Serp />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

function CategoryApp() {
  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <Portal target={selectors.results} clear>
          <Category />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

async function init() {
  await new Promise(nostojs)
  const dummy = document.createElement("div")
  switch (tagging.pageType()) {
    case "category":
      render(
        <CategoryPageProvider config={categoryConfig}>
          <CategoryApp />
        </CategoryPageProvider>,
        dummy
      )
      break
    case "search":
      render(
        <SearchPageProvider config={serpConfig}>
          <SerpApp />
        </SearchPageProvider>,
        dummy
      )
  }
}
init()
