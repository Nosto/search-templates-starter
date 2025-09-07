import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { dispatchNostoEvent } from "@nosto/search-js/preact/events"
import { render } from "preact"
import { useEffect } from "preact/hooks"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Products from "@/components/Autocomplete/Products/Products"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"

// Render SERP to #serp element
function SerpApp() {
  return (
    <SearchPageProvider config={serpConfig}>
      <SearchQueryHandler />
      <Serp />
    </SearchPageProvider>
  )
}

// Wrapper component for autocomplete that handles search input connection
function AutocompleteApp() {
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

  return (
    <AutocompletePageProvider config={autocompleteConfig}>
      <Products />
    </AutocompletePageProvider>
  )
}

// Mount components to their respective DOM elements
const serpElement = document.getElementById("serp")
const dropdownElement = document.getElementById("dropdown")

if (serpElement) {
  render(<SerpApp />, serpElement)
}

if (dropdownElement) {
  render(<AutocompleteApp />, dropdownElement)
}
