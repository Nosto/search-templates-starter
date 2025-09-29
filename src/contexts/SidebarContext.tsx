import { createContext } from "preact"
import { useContext, useState, useCallback } from "preact/hooks"
import { ComponentChildren } from "preact"

type SidebarContextType = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  activeFacets: Set<string>
  setFacetActive: (facetId: string, isActive: boolean) => void
  collapseAllFacets: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

type SidebarProviderProps = {
  children: ComponentChildren
  initialOpen?: boolean
}

export function SidebarProvider({ children, initialOpen = false }: SidebarProviderProps) {
  const [isOpen, setOpen] = useState(initialOpen)
  const [activeFacets, setActiveFacets] = useState<Set<string>>(new Set())

  const toggle = () => {
    setOpen(!isOpen)
  }

  const setFacetActive = useCallback((facetId: string, isActive: boolean) => {
    setActiveFacets(prev => {
      const newSet = new Set(prev)
      if (isActive) {
        newSet.add(facetId)
      } else {
        newSet.delete(facetId)
      }
      return newSet
    })
  }, [])

  const collapseAllFacets = useCallback(() => {
    setActiveFacets(new Set())
  }, [])

  const contextValue = {
    isOpen,
    setOpen,
    toggle,
    activeFacets,
    setFacetActive,
    collapseAllFacets
  }

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
