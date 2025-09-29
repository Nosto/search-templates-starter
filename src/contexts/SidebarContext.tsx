import { createContext } from "preact"
import { useContext, useState, useCallback } from "preact/hooks"
import { ComponentChildren } from "preact"

type SidebarContextType = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  openedFacets: Set<string>
  setFacetOpen: (facetId: string, isOpen: boolean) => void
  closeAllFacets: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

type SidebarProviderProps = {
  children: ComponentChildren
  initialOpen?: boolean
}

export function SidebarProvider({ children, initialOpen = false }: SidebarProviderProps) {
  const [isOpen, setOpen] = useState(initialOpen)
  const [openedFacets, setOpenedFacets] = useState<Set<string>>(new Set())

  const toggle = () => {
    setOpen(!isOpen)
  }

  const setFacetOpen = useCallback((facetId: string, isOpen: boolean) => {
    setOpenedFacets(prev => {
      const newSet = new Set(prev)
      if (isOpen) {
        newSet.add(facetId)
      } else {
        newSet.delete(facetId)
      }
      return newSet
    })
  }, [])

  const closeAllFacets = useCallback(() => {
    setOpenedFacets(new Set())
  }, [])

  const contextValue = {
    isOpen,
    setOpen,
    toggle,
    openedFacets,
    setFacetOpen,
    closeAllFacets
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
