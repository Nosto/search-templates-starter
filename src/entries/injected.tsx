import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, useCallback } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { autocompleteConfig, categoryConfig, selectors, serpConfig } from "@/config"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useActions } from "@nosto/search-js/preact/hooks"
import Category from "@/components/Category/Category"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import { tagging } from "@/mapping/tagging"
import { nostojs } from "@nosto/nosto-js"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import Portal from "@/elements/Portal/Portal"
import { useAutocomplete } from "@/components/Autocomplete/useAutocomplete"

type Props = {
  onSubmit: (input: string) => void
}

function Autocomplete({ onSubmit }: Props) {
  const dropdownElement = document.querySelector<HTMLElement>(selectors.dropdown)!
  const searchInput = document.querySelector<HTMLInputElement>(selectors.searchInput)!
  const searchForm = document.querySelector<HTMLFormElement>(selectors.searchForm)!

  const { input, showAutocomplete, onSearchSubmit, handleInputChange, handleFocus } = useAutocomplete({
    onSubmit,
    searchInputElement: searchInput,
    clickOutsideTarget: dropdownElement,
    isInjected: true
  })

  useDomEvents(searchInput, {
    onInput: () => handleInputChange(searchInput.value),
    onFocus: handleFocus
  })

  useDomEvents(searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  return showAutocomplete ? <Results onSubmit={onSearchSubmit} /> : null
}

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
            <Autocomplete onSubmit={onSubmit} />
          </Portal>
        </AutocompletePageProvider>
        <Portal target={selectors.results}>
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
        <Portal target={selectors.results}>
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
    default:
      render(
        <SearchPageProvider config={serpConfig}>
          <SerpApp />
        </SearchPageProvider>,
        dummy
      )
  }
}
init()
