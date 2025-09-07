import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { useActions } from "@nosto/search-js/preact/hooks"
import { render, createPortal } from "preact/compat"
import { useEffect } from "preact/hooks"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Products from "@/components/Autocomplete/Products/Products"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"

function FormSubmitHandler() {
  const { newSearch } = useActions()

  useEffect(() => {
    const searchForm = document.querySelector<HTMLFormElement>("#search-form")
    const searchInput = document.querySelector<HTMLInputElement>("#search")

    if (searchForm && searchInput) {
      const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        const query = searchInput.value.trim()
        if (query) {
          newSearch({
            query: { query }
          })
        }
      }

      searchForm.addEventListener("submit", handleFormSubmit)

      return () => {
        searchForm.removeEventListener("submit", handleFormSubmit)
      }
    }
  }, [newSearch])

  return null
}

function AutocompleteInputHandler() {
  const { newSearch } = useActions()

  useEffect(() => {
    const searchInput = document.querySelector<HTMLInputElement>("#search")

    if (searchInput) {
      const handleInputChange = () => {
        const query = searchInput.value.trim()
        newSearch({ query })
      }

      searchInput.addEventListener("input", handleInputChange)

      return () => {
        searchInput.removeEventListener("input", handleInputChange)
      }
    }
  }, [newSearch])

  return null
}

function App() {
  const dropdownElement = document.querySelector<HTMLElement>("#dropdown")

  return (
    <SearchPageProvider config={serpConfig}>
      <SearchQueryHandler />
      <FormSubmitHandler />

      {dropdownElement &&
        createPortal(
          <AutocompletePageProvider config={autocompleteConfig}>
            <AutocompleteInputHandler />
            <Products />
          </AutocompletePageProvider>,
          dropdownElement
        )}

      <Serp />
    </SearchPageProvider>
  )
}

const serpElement = document.querySelector<HTMLElement>("#serp")
if (serpElement) {
  render(<App />, serpElement)
}
