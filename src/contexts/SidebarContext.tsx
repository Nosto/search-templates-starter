import { createContext } from "preact"
import { useContext, useState } from "preact/hooks"
import { JSX } from "preact"

type SidebarContextType = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

type SidebarProviderProps = {
  children: JSX.Element | JSX.Element[]
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const setOpen = (open: boolean) => {
    setIsOpen(open)
  }

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const contextValue: SidebarContextType = {
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
