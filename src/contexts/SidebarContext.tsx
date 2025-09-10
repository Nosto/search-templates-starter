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

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
