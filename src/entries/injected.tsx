import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, createPortal } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Products from "@/components/Autocomplete/Products/Products"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"
import FormSubmitHandler from "./FormSubmitHandler"
import InputEventHandler from "./InputEventHandler"

function App() {
  const dropdownElement = document.querySelector<HTMLElement>("#dropdown")
  const searchInput = document.querySelector<HTMLInputElement>("#search")
  const searchForm = document.querySelector<HTMLFormElement>("#search-form")

  return (
    <SearchPageProvider config={serpConfig}>
      <SearchQueryHandler />
      {searchInput && <FormSubmitHandler inputElement={searchInput} formElement={searchForm} />}

      {dropdownElement &&
        createPortal(
          <AutocompletePageProvider config={autocompleteConfig}>
            <InputEventHandler selector="#search" />
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
