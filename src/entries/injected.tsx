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
import { searchRedirect } from "./searchRedirect"

type AutocompleteProps = {
  onSubmit: (query: string, options?: SearchAnalyticsOptions) => void
}

function Autocomplete({ onSubmit }: AutocompleteProps) {
  const handleSubmit = useCallback(
    (query: string, options?: SearchAnalyticsOptions) => {
      const trimmedQuery = query.trim()
      if (!trimmedQuery) {
        return
      }
      nostojs(api => api.recordSearchSubmit(trimmedQuery))
      onSubmit(trimmedQuery, options)
    },
    [onSubmit]
  )

  return (
    <AutocompletePageProvider config={autocompleteConfig}>
      <Portal target={selectors.dropdown}>
        <AutocompleteInjected onSubmit={handleSubmit} />
      </Portal>
    </AutocompletePageProvider>
  )
}

function SerpApp() {
  const { newSearch } = useActions()

  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <Autocomplete onSubmit={(query, options) => newSearch({ query }, options)} />
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
        <Autocomplete onSubmit={searchRedirect} />
        <Portal target={selectors.results} clear>
          <Category />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

function DefaultApp() {
  return (
    <ErrorBoundary>
      <Autocomplete onSubmit={searchRedirect} />
    </ErrorBoundary>
  )
}

async function init() {
  const api = await new Promise(nostojs)
  // wait for tagging to be available
  await api.pageTaggingAsync()
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
      break
    default:
      render(<DefaultApp />, dummy)
      break
  }
}
init()
