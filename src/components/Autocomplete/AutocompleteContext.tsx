import { createContext } from "preact"
import { useContext } from "preact/hooks"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"

type AutocompleteContextValue = {
  onSubmit: (query: string, options?: SearchAnalyticsOptions) => void
}

const AutocompleteContext = createContext<AutocompleteContextValue | undefined>(undefined)

export function useAutocompleteContext() {
  const context = useContext(AutocompleteContext)
  if (!context) {
    throw new Error("useAutocompleteContext must be used within an AutocompleteContextProvider")
  }
  return context
}

export default AutocompleteContext
