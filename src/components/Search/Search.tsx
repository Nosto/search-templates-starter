import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import Autocomplete from "@/components/Autocomplete/Autocomplete"
import { autocompleteConfig } from "@/config"
import style from "./Search.module.css"
import { useActions } from "@nosto/search-js/preact/hooks"
import { useCallback } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"
import { DropdownProvider } from "@/contexts/DropdownContext"

export function Search() {
  const { newSearch } = useActions()

  const onSubmit = useCallback(
    (query: string) => {
      nostojs(api => api.recordSearchSubmit(query))
      newSearch({ query })
    },
    [newSearch]
  )

  return (
    <div className={style.wrapper}>
      <DropdownProvider>
        <AutocompletePageProvider config={autocompleteConfig}>
          <Autocomplete onSubmit={onSubmit} />
        </AutocompletePageProvider>
      </DropdownProvider>
    </div>
  )
}
