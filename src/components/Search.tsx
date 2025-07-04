import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { useActions } from "@nosto/search-js/preact/hooks"
import AutocompleteWrapper from "./Autocomplete/AutocompleteWrapper"
import { autocompleteConfig } from "../config"

export function Search() {
  const { newSearch } = useActions()

  const onSearch = (value: string) => {
    newSearch({
      query: value
    })
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 4, width: "100%", justifyContent: "center" }}>
        <AutocompletePageProvider config={autocompleteConfig}>
          <AutocompleteWrapper onSubmit={onSearch} />
        </AutocompletePageProvider>
      </div>
    </div>
  )
}
