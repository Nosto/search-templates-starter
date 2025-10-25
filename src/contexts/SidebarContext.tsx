import { createContext } from "preact"
import { useContext, useState } from "preact/hooks"
import { ComponentChildren } from "preact"

type SidebarContextType = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

type SidebarProviderProps = {
  children: ComponentChildren
  initialOpen?: boolean
}

/**
 * Context provider that manages sidebar open/closed state throughout the application.
 * Provides functions to control sidebar visibility and state queries.
 *
 * @param children - Child components that will have access to the sidebar context
 * @param initialOpen - Initial state of the sidebar (defaults to false/closed)
 * @returns A context provider that manages sidebar state for its children
 */
export function SidebarProvider({ children, initialOpen = false }: SidebarProviderProps) {
  const [isOpen, setOpen] = useState(initialOpen)

  const toggle = () => {
    setOpen(!isOpen)
  }

  const contextValue = {
    isOpen,
    setOpen,
    toggle
  }

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

/**
 * Custom hook to access the sidebar context state and controls.
 * Must be used within a SidebarProvider component tree.
 *
 * @returns Object containing isOpen state, setOpen function, and toggle function
 * @throws Error if used outside of SidebarProvider context
 */
export function useFilterSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useFilterSidebar must be used within a SidebarProvider")
  }
  return context
}
