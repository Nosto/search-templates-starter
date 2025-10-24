import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, useState, useEffect, useCallback } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { autocompleteConfig, categoryConfig, selectors, serpConfig } from "@/config"
import { disableNativeAutocomplete } from "@nosto/search-js/utils"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { useActions, useHistory } from "@nosto/search-js/preact/hooks"
import Category from "@/components/Category/Category"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import { tagging } from "@/mapping/tagging"
import { nostojs } from "@nosto/nosto-js"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import { getInitialQuery } from "@/mapping/url/getInitialQuery"
import Portal from "@/elements/Portal/Portal"
import { useShowAutocomplete } from "@/hooks/useShowAutocomplete"

/**
 * Application entry point in Injected mode
 */
async function init() {
  await new Promise(nostojs)
  switch (tagging.pageType()) {
    case "category":
      render(
        <CategoryPageProvider config={categoryConfig}>
          <CategoryApp />
        </CategoryPageProvider>,
        document.createElement("div")
      )
      break
    case "search":
    default:
      render(
        <SearchPageProvider config={serpConfig}>
          <SerpApp />
        </SearchPageProvider>,
        document.createElement("div")
      )
  }
}
init()

/**
 * Autocomplete injection point
 */

type Props = {
  onSubmit: (input: string) => void
}

function AutocompleteApp({ onSubmit }: Props) {
  const [input, setInput] = useState<string>(getInitialQuery())

  const searchInput = document.querySelector<HTMLInputElement>(selectors.searchInput)!
  const searchForm = document.querySelector<HTMLFormElement>(selectors.searchForm)!

  const { showAutocomplete, setShowAutocomplete } = useShowAutocomplete({ searchInput })

  useEffect(() => {
    searchInput.value = getInitialQuery()
    disableNativeAutocomplete(searchInput)
  }, [searchInput])

  useDebouncedSearch({ input })

  useDomEvents(searchInput, {
    onInput: () => setInput(searchInput.value),
    onFocus: () => setShowAutocomplete(true)
  })

  const { addQuery } = useHistory()

  const onSearchSubmit = (query: string) => {
    if (query.trim()) {
      addQuery(query)
      searchInput.value = query
      onSubmit(query)
    }
    searchInput.blur()
    setShowAutocomplete(false)
  }

  useDomEvents(searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  return showAutocomplete ? <Results onSubmit={onSearchSubmit} /> : null
}

/**
 * Category injection point
 */

function CategoryApp() {
  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <Portal target={selectors.results}>
          <Category />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

/**
 * Search results page injection point
 */

function SerpApp() {
  const { newSearch } = useActions()

  const onSubmit = useCallback(
    (query: string) => {
      nostojs(api => api.recordSearchSubmit(query))
      newSearch({ query })
    },
    [newSearch]
  )

  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <AutocompletePageProvider config={autocompleteConfig}>
          <Portal target={selectors.dropdown}>
            <AutocompleteApp onSubmit={onSubmit} />
          </Portal>
        </AutocompletePageProvider>
        <Portal target={selectors.results}>
          <Serp />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
