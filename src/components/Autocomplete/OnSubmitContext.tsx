import { createContext } from "preact"
import { useContext } from "preact/hooks"
import { ComponentChildren } from "preact"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"

type OnSubmitContextType = {
  onSubmit: (query: string, options?: SearchAnalyticsOptions) => void
}

const OnSubmitContext = createContext<OnSubmitContextType | undefined>(undefined)

type OnSubmitProviderProps = {
  children: ComponentChildren
  onSubmit: (query: string, options?: SearchAnalyticsOptions) => void
}

export function OnSubmitProvider({ children, onSubmit }: OnSubmitProviderProps) {
  const contextValue = {
    onSubmit
  }

  return <OnSubmitContext.Provider value={contextValue}>{children}</OnSubmitContext.Provider>
}

export function useOnSubmit() {
  const context = useContext(OnSubmitContext)
  if (context === undefined) {
    throw new Error("useOnSubmit must be used within an OnSubmitProvider")
  }
  return context.onSubmit
}
