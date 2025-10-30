import { createContext } from "preact"
import { useContext } from "preact/hooks"
import { ComponentChildren } from "preact"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import { AutocompletePageProvider, AutocompleteConfig } from "@nosto/search-js/preact/autocomplete"
import { Store } from "@nosto/search-js/preact/common"

type AutocompleteContextValue = {
  onSubmit: (query: string, options?: SearchAnalyticsOptions) => void
}

const AutocompleteContext = createContext<AutocompleteContextValue | undefined>(undefined)

type Props = {
  children: ComponentChildren
  onSubmit: (query: string, options?: SearchAnalyticsOptions) => void
  config: AutocompleteConfig
  store?: Store
}

export function AutocompleteContextProvider({ children, onSubmit, config, store }: Props) {
  const contextValue = {
    onSubmit
  }

  return (
    <AutocompletePageProvider config={config} store={store}>
      <AutocompleteContext.Provider value={contextValue}>{children}</AutocompleteContext.Provider>
    </AutocompletePageProvider>
  )
}

export function useAutocompleteContext() {
  const context = useContext(AutocompleteContext)
  if (!context) {
    throw new Error("useAutocompleteContext must be used within an AutocompleteContextProvider")
  }
  return context
}
