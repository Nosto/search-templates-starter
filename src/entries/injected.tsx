import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, useCallback } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
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

/**
 * The search results page application for injected mode.
 * Integrates search functionality into existing websites by rendering components
 * into specific DOM selectors. Includes autocomplete and search results display.
 *
 * @returns A search application that injects into existing website structure
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
            <AutocompleteInjected onSubmit={onSubmit} />
          </Portal>
        </AutocompletePageProvider>
        <Portal target={selectors.results}>
          <Serp />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

/**
 * The category browsing application for injected mode.
 * Injects category functionality into existing websites using DOM selectors.
 * Provides category product filtering and display capabilities.
 *
 * @returns A category browsing application for injection into existing sites
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
 * Initializes the injected application based on page type detection.
 * Creates appropriate provider wrappers and renders the correct app component
 * for either search or category functionality in injected mode.
 */
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
