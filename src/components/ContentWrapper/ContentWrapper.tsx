import { JSX } from "preact"
import { useState, useEffect } from "preact/hooks"
import Sidebar from "@/components/Sidebar/Sidebar"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./ContentWrapper.module.css"
import { cl } from "@nosto/search-js/utils"

export type ContentChildrenProps = { loading: boolean; foundProducts: boolean; toggleSidebar: () => void }

type ContentWrapperProps = {
  type: string
  children: (props: ContentChildrenProps) => JSX.Element
}

/**
 * ContentWrapper takes a function to render non-empty results in the content area.
 * On loading the Loader is used and for empty results the NoResults component is used.
 */
function ContentWrapper({ type, children }: ContentWrapperProps) {
  const { foundProducts, loading, initialized } = useNostoAppState(state => ({
    foundProducts: (state.response.products?.total || 0) > 0,
    loading: state.loading,
    initialized: state.initialized
  }))

  // Manage sidebar state at this level
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Handle responsive behavior - automatically close on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check initial size

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (!initialized) {
    return null
  }

  return (
    <div className={styles.wrapper} data-nosto-element={type}>
      {foundProducts && (
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} onClose={() => setIsSidebarOpen(false)} />
      )}
      <div className={cl(styles.container, loading && styles.loading)}>
        {children({ loading, foundProducts, toggleSidebar })}
      </div>
    </div>
  )
}

export function wrapContent(type: string, Component: ContentWrapperProps["children"]) {
  // eslint-disable-next-line react/display-name
  return () => <ContentWrapper type={type}>{Component}</ContentWrapper>
}
