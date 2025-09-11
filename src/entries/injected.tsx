import { render } from "preact"
import { createPortal } from "preact/compat"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { dispatchNostoEvent } from "@nosto/search-js/preact/events"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { useEffect } from "preact/hooks"

function onSearchSubmit(query: string) {
  // TODO change location in case not on search page
  dispatchNostoEvent({
    event: "actions/newSearch",
    params: { query: { query }, targetStore: "search" }
  })
}

function AutocompletePortal() {
  const dropdownElement = document.getElementById("dropdown")

  useEffect(() => {
    if (!dropdownElement) return

    const searchInput = document.getElementById("search") as HTMLInputElement
    const searchForm = document.getElementById("search-form") as HTMLFormElement

    if (!searchInput || !searchForm) return

    const handleInput = () => {
      // Trigger autocomplete on input change
      const query = searchInput.value.trim()
      if (query.length > 0) {
        dispatchNostoEvent({
          event: "actions/newSearch",
          params: { query: { query }, targetStore: "autocomplete" }
        })
      }
    }

    const handleFormSubmit = (e: Event) => {
      e.preventDefault()
      const query = searchInput.value.trim()
      if (query) {
        onSearchSubmit(query)
      }
    }

    searchInput.addEventListener("input", handleInput)
    searchForm.addEventListener("submit", handleFormSubmit)

    return () => {
      searchInput.removeEventListener("input", handleInput)
      searchForm.removeEventListener("submit", handleFormSubmit)
    }
  }, [dropdownElement])

  if (!dropdownElement) return null

  return createPortal(
    <AutocompletePageProvider config={autocompleteConfig}>
      <Results onSubmit={onSearchSubmit} />
    </AutocompletePageProvider>,
    dropdownElement
  )
}

function App() {
  const serpElement = document.getElementById("serp")

  if (!serpElement) return <AutocompletePortal />

  return (
    <SearchPageProvider config={serpConfig}>
      <AutocompletePortal />
      {createPortal(
        <SidebarProvider>
          <SearchQueryHandler />
          <Serp />
        </SidebarProvider>,
        serpElement
      )}
    </SearchPageProvider>
  )
}

render(<App />, document.body)
