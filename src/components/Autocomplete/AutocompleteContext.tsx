import { createContext } from "preact"
import { useContext } from "preact/hooks"
import { ComponentChildren } from "preact"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"

type AutocompleteContextValue = {
  onSubmit: (query: string, options?: SearchAnalyticsOptions) => void
}

const AutocompleteContext = createContext<AutocompleteContextValue | undefined>(undefined)

type Props = {
  children: ComponentChildren
  onSubmit: (query: string, options?: SearchAnalyticsOptions) => void
}

export function AutocompleteContextProvider({ children, onSubmit }: Props) {
  const contextValue = {
    onSubmit
  }

  return <AutocompleteContext.Provider value={contextValue}>{children}</AutocompleteContext.Provider>
}

export function useAutocompleteContext() {
  const context = useContext(AutocompleteContext)
  if (!context) {
    throw new Error("useAutocompleteContext must be used within an AutocompleteContextProvider")
  }
  return context
}
