import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, useCallback, useState } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variables.css"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { autocompleteConfig, categoryConfig, redirectOnSearch, searchPath, selectors, serpConfig } from "@/config"
import { useActions } from "@nosto/search-js/preact/hooks"
import Category from "@/components/Category/Category"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import { tagging } from "@/mapping/tagging"
import { nostojs } from "@nosto/nosto-js"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import Portal from "@/elements/Portal/Portal"
import AutocompleteInjected from "@/components/Autocomplete/AutocompleteInjected"
import { PageType, SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import { searchNavigate } from "./searchNavigate"
import { usePopState } from "@/hooks/usePopState"
import { QUERY_PARAM } from "@/mapping/url/constants"

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

type AppProps = {
  onSearch: (query: string, options?: SearchAnalyticsOptions) => void
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

function CategoryApp({ onSearch }: AppProps) {
  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <Autocomplete onSubmit={onSearch} />
        <Portal target={selectors.results} clear>
          <Category />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

function DefaultApp({ onSearch }: AppProps) {
  return (
    <ErrorBoundary>
      <Autocomplete onSubmit={onSearch} />
    </ErrorBoundary>
  )
}

function setTaggingPageType(pageType: PageType | undefined) {
  nostojs(api => api.setTaggingProvider("pageType", pageType))
}

function App() {
  const [pageType, setPageType] = useState(() => tagging.pageType())

  function onSearch(query: string) {
    if (redirectOnSearch) {
      searchNavigate(query)
    } else {
      searchNavigate(query, "history")
      setPageType("search")
      setTaggingPageType("search")
    }
  }

  usePopState(() => {
    if (redirectOnSearch) return
    const isSearchPage = location.pathname === searchPath
    const pageType = isSearchPage ? "search" : tagging.pageType()
    setPageType(pageType)
    setTaggingPageType(pageType)
  }, [setPageType])

  switch (pageType) {
    case "category":
      return (
        <CategoryPageProvider config={categoryConfig}>
          <CategoryApp onSearch={onSearch} />
        </CategoryPageProvider>
      )
    case "search":
      return (
        <SearchPageProvider config={serpConfig}>
          <SerpApp />
        </SearchPageProvider>
      )
    default:
      return <DefaultApp onSearch={onSearch} />
  }
}

function searchTermsProvider() {
  const params = new URLSearchParams(window.location.search)
  const searchParams = params.get(QUERY_PARAM)
  return searchParams ? [searchParams] : []
}

async function init() {
  const api = await new Promise(nostojs)
  // wait for tagging to be available
  await api.pageTaggingAsync()
  const dummy = document.createElement("div")
  nostojs(api => api.setTaggingProvider("searchTerms", searchTermsProvider))
  render(<App />, dummy)
}
init()
