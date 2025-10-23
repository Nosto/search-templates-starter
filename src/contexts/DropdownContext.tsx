import { createContext } from "preact"
import { useContext, useState } from "preact/hooks"
import { ComponentChildren } from "preact"

type DropdownContextType = {
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

type DropdownProviderProps = {
  children: ComponentChildren
  initialHighlightedIndex?: number
}

export function DropdownProvider({ children, initialHighlightedIndex = 0 }: DropdownProviderProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(initialHighlightedIndex)

  const contextValue = {
    highlightedIndex,
    setHighlightedIndex,
  }

  return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>
}

export function useDropdown() {
  const context = useContext(DropdownContext)
  if (context === undefined) {
    throw new Error("useDropdown must be used within a DropdownProvider")
  }
  return context
}
