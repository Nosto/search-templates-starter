import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import AutocompleteNative from "@/components/Autocomplete/AutocompleteNative"
import { autocompleteConfig } from "@/config"
import style from "./Search.module.css"
import { useActions } from "@nosto/search-js/preact/hooks"
import { useCallback } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"

export default function Search() {
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
      <AutocompletePageProvider config={autocompleteConfig}>
        <AutocompleteNative onSubmit={onSubmit} />
      </AutocompletePageProvider>
    </div>
  )
}
