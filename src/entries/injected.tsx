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
import { useActions } from "@nosto/search-js/preact/hooks"

function Autocomplete() {
  const { newSearch } = useActions()
  // TODO: wait for elements is missing
  const dropdownElement = document.querySelector<HTMLElement>("#dropdown")!
  const searchInput = document.querySelector<HTMLInputElement>("#search")!
  const searchForm = document.querySelector<HTMLFormElement>("#search-form")!

  function onSubmit(query: string) {
    newSearch({ query })
  }

  return (
    <>
      <FormSubmitHandler inputElement={searchInput} formElement={searchForm} onSubmit={onSubmit} />
      {createPortal(
        <AutocompletePageProvider config={autocompleteConfig}>
          <InputEventHandler inputElement={searchInput} />
          <Results onSubmit={onSubmit} />
        </AutocompletePageProvider>,
        dropdownElement
      )}
    </>
  )
}

function App() {
  return (
    <SearchPageProvider config={serpConfig}>
      <SidebarProvider>
        <SearchQueryHandler />
        <Autocomplete />
        <Serp />
      </SidebarProvider>
    </SearchPageProvider>
  )
}

const serpElement = document.querySelector<HTMLElement>("#serp")
if (serpElement) {
  render(<App />, serpElement)
}
