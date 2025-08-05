import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { useActions } from "@nosto/search-js/preact/hooks"
import AutocompleteWrapper from "./Autocomplete/AutocompleteWrapper"
import { autocompleteConfig } from "../config"
import style from "./Autocomplete/autocomplete.module.css"

export function Search() {
  const { newSearch } = useActions()

  const onSearch = (value: string) => {
    newSearch({
      query: value,
      products: {
        size: 24
      }
    })
  }

  return (
    <div>
      <div className={style.wrapper}>
        <AutocompletePageProvider config={autocompleteConfig}>
          <AutocompleteWrapper onSubmit={onSearch} />
        </AutocompletePageProvider>
      </div>
    </div>
  )
}
