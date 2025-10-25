import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import AutocompleteNative from "@/components/Autocomplete/AutocompleteNative"
import { autocompleteConfig } from "@/config"
import style from "./Search.module.css"
import { useActions } from "@nosto/search-js/preact/hooks"
import { useCallback } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"

/**
 * The main search interface component that combines autocomplete functionality with search submission.
 * Integrates with Nosto's search tracking to record search events and handles search state management.
 * Provides a complete search experience with autocomplete suggestions and search submission handling.
 *
 * @returns A search interface with autocomplete functionality and search submission tracking
 */
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
      <AutocompletePageProvider config={autocompleteConfig}>
        <AutocompleteNative onSubmit={onSubmit} />
      </AutocompletePageProvider>
    </div>
  )
}
