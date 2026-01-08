import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, useCallback, useEffect, useState } from "preact/compat"
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

type PageMode = "search" | "category" | "default"

type SearchTriggerDetail = {
  query: string
  options?: SearchAnalyticsOptions
}

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

function CategoryApp({
  onSwitchToSearch
}: {
  onSwitchToSearch: (query: string, options?: SearchAnalyticsOptions) => void
}) {
  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <Autocomplete onSubmit={onSwitchToSearch} />
        <Portal target={selectors.results} clear>
          <Category />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

function DefaultApp({
  onSwitchToSearch
}: {
  onSwitchToSearch: (query: string, options?: SearchAnalyticsOptions) => void
}) {
  return (
    <ErrorBoundary>
      <Autocomplete onSubmit={onSwitchToSearch} />
    </ErrorBoundary>
  )
}

function SearchModeWrapper({ query, options }: SearchTriggerDetail) {
  const { newSearch } = useActions()

  // Trigger search when mounted
  useEffect(() => {
    newSearch({ query }, options)
  }, [newSearch, query, options])

  return <SerpApp />
}

function App({ initialMode }: { initialMode: PageMode }) {
  const [mode, setMode] = useState<PageMode>(initialMode)
  const [searchTrigger, setSearchTrigger] = useState<SearchTriggerDetail | null>(null)

  const switchToSearch = useCallback((query: string, options?: SearchAnalyticsOptions) => {
    setSearchTrigger({ query, options })
    setMode("search")
  }, [])

  switch (mode) {
    case "search":
      return (
        <SearchPageProvider config={serpConfig}>
          {searchTrigger ? <SearchModeWrapper {...searchTrigger} /> : <SerpApp />}
        </SearchPageProvider>
      )
    case "category":
      return (
        <CategoryPageProvider config={categoryConfig}>
          <CategoryApp onSwitchToSearch={switchToSearch} />
        </CategoryPageProvider>
      )
    default:
      return <DefaultApp onSwitchToSearch={switchToSearch} />
  }
}

async function init() {
  const api = await new Promise(nostojs)
  // wait for tagging to be available
  await api.pageTaggingAsync()
  const initialMode = (tagging.pageType() || "default") as PageMode
  const dummy = document.createElement("div")
  render(<App initialMode={initialMode} />, dummy)
}
init()
