import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import AutocompleteNative from "@/components/Autocomplete/AutocompleteNative"
import { autocompleteConfig } from "@/config"
import style from "./Search.module.css"
import { useActions } from "@nosto/search-js/preact/hooks"
import { useCallback } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"

export default function Search() {
  const { newSearch } = useActions()

  const onSubmit = useCallback(
    (query: string, options?: SearchAnalyticsOptions) => {
      nostojs(api => api.recordSearchSubmit(query))
      newSearch({ query }, options)
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
