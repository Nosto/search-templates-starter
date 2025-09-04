import { nostojs } from "@nosto/nosto-js"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { useActions } from "@nosto/search-js/preact/hooks"
import Autocomplete from "@/components/Autocomplete/Autocomplete"
import { autocompleteConfig } from "@/config"
import style from "./Search.module.css"

export function Search() {
  const { newSearch } = useActions()

  const onSearch = (value: string) => {
    nostojs(api => {
      api.recordSearchSubmit(value)
    })
    newSearch({
      query: value
    })
  }

  return (
    <div>
      <div className={style.wrapper}>
        <AutocompletePageProvider config={autocompleteConfig}>
          <Autocomplete onSubmit={onSearch} />
        </AutocompletePageProvider>
      </div>
    </div>
  )
}
