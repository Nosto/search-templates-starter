import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, createPortal } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { autocompleteConfig, serpConfig } from "@/config"
import FormSubmitHandler from "./FormSubmitHandler"
import InputEventHandler from "./InputEventHandler"

function App() {
  // TODO: wait for elements is missing
  const dropdownElement = document.querySelector<HTMLElement>("#dropdown")
  const searchInput = document.querySelector<HTMLInputElement>("#search")
  const searchForm = document.querySelector<HTMLFormElement>("#search-form")

  return (
    <SearchPageProvider config={serpConfig}>
      <SidebarProvider>
        <SearchQueryHandler />
        {searchInput && <FormSubmitHandler inputElement={searchInput} formElement={searchForm} />}

        {dropdownElement &&
          searchInput &&
          createPortal(
            <AutocompletePageProvider config={autocompleteConfig}>
              <InputEventHandler inputElement={searchInput} />
              <Products />
            </AutocompletePageProvider>,
            dropdownElement
          )}
        <Serp />
      </SidebarProvider>  
    </SearchPageProvider>
  )
}

const serpElement = document.querySelector<HTMLElement>("#serp")
if (serpElement) {
  render(<App />, serpElement)
}
