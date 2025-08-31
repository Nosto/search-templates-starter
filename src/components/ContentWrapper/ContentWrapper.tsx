import { JSX } from "preact"
import { useState } from "preact/hooks"
import Sidebar from "@/components/Sidebar/Sidebar"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./ContentWrapper.module.css"
import cl from "@/utils/cl"

export type ContentChildrenProps = {
  loading: boolean
  foundProducts: boolean
  toggleSidebar: () => void
}

type ContentWrapperProps = {
  type: string
  children: (props: ContentChildrenProps) => JSX.Element
}

/**
 * ContentWrapper takes a function to render non-empty results in the content area.
 * On loading the Loader is used and for empty results the NoResults component is used.
 */
function ContentWrapper({ type, children }: ContentWrapperProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const { foundProducts, loading, initialized } = useNostoAppState(state => ({
    foundProducts: (state.response.products?.total || 0) > 0,
    loading: state.loading,
    initialized: state.initialized
  }))

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev)
  }

  if (!initialized) {
    return null
  }

  return (
    <div className={styles.wrapper} data-nosto-element={type}>
      {foundProducts && <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />}
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
