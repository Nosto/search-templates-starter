import { JSX } from "preact"
import Sidebar from "@/components/Sidebar/Sidebar"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./ContentWrapper.module.css"
import { cl } from "@nosto/search-js/utils"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"

export type ContentChildrenProps = { loading: boolean; foundProducts: boolean }

type ContentWrapperProps = {
  type: string
  children: (props: ContentChildrenProps) => JSX.Element
}

/**
 * Inner wrapper component that has access to sidebar context
 */
function ContentWrapperInner({ type, children }: ContentWrapperProps) {
  const { foundProducts, loading, initialized } = useNostoAppState(state => ({
    foundProducts: (state.response.products?.total || 0) > 0,
    loading: state.loading,
    initialized: state.initialized
  }))

  const { isOpen, setOpen } = useSidebar()

  if (!initialized) {
    return null
  }

  return (
    <div className={styles.wrapper} data-nosto-element={type}>
      {foundProducts && <Sidebar isOpen={isOpen} onSetOpen={setOpen} />}
      <div className={cl(styles.container, loading && styles.loading)}>{children({ loading, foundProducts })}</div>
    </div>
  )
}

/**
 * ContentWrapper takes a function to render non-empty results in the content area.
 * On loading the Loader is used and for empty results the NoResults component is used.
 */
function ContentWrapper({ type, children }: ContentWrapperProps) {
  return (
    <SidebarProvider>
      <ContentWrapperInner type={type}>{children}</ContentWrapperInner>
    </SidebarProvider>
  )
}

export function wrapContent(type: string, Component: ContentWrapperProps["children"]) {
  // eslint-disable-next-line react/display-name
  return () => <ContentWrapper type={type}>{Component}</ContentWrapper>
}
