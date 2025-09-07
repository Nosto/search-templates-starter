import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { dispatchNostoEvent } from "@nosto/search-js/preact/events"
import { render, createPortal } from "preact/compat"
import { useEffect } from "preact/hooks"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Products from "@/components/Autocomplete/Products/Products"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"

function App() {
  useEffect(() => {
    // Connect the existing #search input to handle form submissions
    const searchForm = document.getElementById("search-form") as HTMLFormElement
    const searchInput = document.getElementById("search") as HTMLInputElement

    if (searchForm && searchInput) {
      const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        const query = searchInput.value.trim()
        if (query) {
          dispatchNostoEvent({
            event: "actions/newSearch",
            params: {
              query: { query }, // SearchQuery expects an object with query property
              targetStore: "search"
            }
          })
        }
      }

      searchForm.addEventListener("submit", handleFormSubmit)

      return () => {
        searchForm.removeEventListener("submit", handleFormSubmit)
      }
    }
  }, [])

  const serpElement = document.getElementById("serp")
  const dropdownElement = document.getElementById("dropdown")

  return (
    <>
      {/* Portal SERP to #serp element */}
      {serpElement &&
        createPortal(
          <SearchPageProvider config={serpConfig}>
            <SearchQueryHandler />
            <Serp />
          </SearchPageProvider>,
          serpElement
        )}

      {/* Portal Autocomplete to #dropdown element */}
      {dropdownElement &&
        createPortal(
          <AutocompletePageProvider config={autocompleteConfig}>
            <Products />
          </AutocompletePageProvider>,
          dropdownElement
        )}
    </>
  )
}

// Mount the single app
render(<App />, document.body)
