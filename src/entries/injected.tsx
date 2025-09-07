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

  return (
    <SearchPageProvider config={serpConfig}>
      <SearchQueryHandler />
      <FormSubmitHandler />

      {dropdownElement &&
        createPortal(
          <AutocompletePageProvider config={autocompleteConfig}>
            <InputEventHandler />
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
