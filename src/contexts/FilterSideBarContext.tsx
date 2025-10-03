import { createContext } from "preact"
import { useContext, useState } from "preact/hooks"
import { ComponentChildren } from "preact"

type FilterSideBarContextType = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const FilterSideBarContext = createContext<FilterSideBarContextType | undefined>(undefined)

type FilterSideBarProviderProps = {
  children: ComponentChildren
  initialOpen?: boolean
}

export function FilterSideBarProvider({ children, initialOpen = false }: FilterSideBarProviderProps) {
  const [isOpen, setOpen] = useState(initialOpen)

  const toggle = () => {
    setOpen(!isOpen)
  }

  const contextValue = {
    isOpen,
    setOpen,
    toggle
  }

  return <FilterSideBarContext.Provider value={contextValue}>{children}</FilterSideBarContext.Provider>
}

export function useFilterSideBar() {
  const context = useContext(FilterSideBarContext)
  if (context === undefined) {
    throw new Error("useFilterSideBar must be used within a FilterSideBarProvider")
  }
  return context
}
