import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import Autocomplete from "@/components/Autocomplete/Autocomplete"
import { autocompleteConfig } from "@/config"
import style from "./Search.module.css"
import { useActions } from "@nosto/search-js/preact/hooks"
import { useCallback } from "preact/hooks"

export function Search() {
  const { newSearch } = useActions()

  const onSubmit = useCallback(
    (query: string) => {
      newSearch({ query })
    },
    [newSearch]
  )

  return (
    <div className={style.wrapper}>
      <AutocompletePageProvider config={autocompleteConfig}>
        <Autocomplete onSubmit={onSubmit} />
      </AutocompletePageProvider>
    </div>
  )
}
