import { createContext } from "preact"
import { useContext, useCallback, useState } from "preact/hooks"
import { ComponentChildren } from "preact"

type FacetCollapseContextType = {
  collapseAll: () => void
  shouldCollapse: boolean
  resetCollapseFlag: () => void
}

const FacetCollapseContext = createContext<FacetCollapseContextType | undefined>(undefined)

type FacetCollapseProviderProps = {
  children: ComponentChildren
}

export function FacetCollapseProvider({ children }: FacetCollapseProviderProps) {
  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collapseAll = useCallback(() => {
    setShouldCollapse(true)
  }, [])

  const resetCollapseFlag = useCallback(() => {
    setShouldCollapse(false)
  }, [])

  const contextValue = {
    collapseAll,
    shouldCollapse,
    resetCollapseFlag
  }

  return <FacetCollapseContext.Provider value={contextValue}>{children}</FacetCollapseContext.Provider>
}

export function useFacetCollapse() {
  const context = useContext(FacetCollapseContext)
  if (context === undefined) {
    throw new Error("useFacetCollapse must be used within a FacetCollapseProvider")
  }
  return context
}
