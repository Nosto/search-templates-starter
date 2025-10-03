import { createContext } from "preact"
import { useContext, useState } from "preact/hooks"
import { ComponentChildren } from "preact"

type FilterSidebarContextType = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const FilterSidebarContext = createContext<FilterSidebarContextType | undefined>(undefined)

type FilterSidebarProviderProps = {
  children: ComponentChildren
  initialOpen?: boolean
}

export function FilterSidebarProvider({ children, initialOpen = false }: FilterSidebarProviderProps) {
  const [isOpen, setOpen] = useState(initialOpen)

  const toggle = () => {
    setOpen(!isOpen)
  }

  const contextValue = {
    isOpen,
    setOpen,
    toggle
  }

  return <FilterSidebarContext.Provider value={contextValue}>{children}</FilterSidebarContext.Provider>
}

export function useFilterSidebar() {
  const context = useContext(FilterSidebarContext)
  if (context === undefined) {
    throw new Error("useFilterSidebar must be used within a FilterSidebarProvider")
  }
  return context
}
