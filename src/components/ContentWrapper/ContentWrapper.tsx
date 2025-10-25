import { JSX } from "preact"
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./ContentWrapper.module.css"
import { cl } from "@nosto/search-js/utils"

export type ContentChildrenProps = { loading: boolean; foundProducts: boolean }

type ContentWrapperProps = {
  type: string
  children: (props: ContentChildrenProps) => JSX.Element | null
}

/**
 * A wrapper component that manages the layout and loading states for content areas.
 * Provides a consistent structure with sidebar integration and handles empty/loading states.
 * Only renders content when the application is initialized and manages loading indicators.
 *
 * @param type - The data-nosto-element attribute value for analytics tracking
 * @param children - A render function that receives loading and foundProducts state
 * @returns A layout wrapper with sidebar and content area, or null if not initialized
 */
function ContentWrapper({ type, children }: ContentWrapperProps) {
  const { foundProducts, loading, initialized } = useNostoAppState(state => ({
    foundProducts: (state.response.products?.total || 0) > 0,
    loading: state.loading,
    initialized: state.initialized
  }))

  if (!initialized) {
    return null
  }

  return (
    <div className={styles.wrapper} data-nosto-element={type}>
      {foundProducts && <FilterSidebar />}
      <div className={cl(styles.container, loading && styles.loading)}>{children({ loading, foundProducts })}</div>
    </div>
  )
}

/**
 * Higher-order function that wraps a content component with the ContentWrapper layout.
 * Creates a new component that automatically handles layout, sidebar, and loading states.
 *
 * @param type - The data-nosto-element attribute for analytics tracking
 * @param Component - A render function component that receives ContentChildrenProps
 * @returns A new component wrapped with ContentWrapper functionality
 */
export function wrapContent(type: string, Component: ContentWrapperProps["children"]) {
  // eslint-disable-next-line react/display-name
  return () => <ContentWrapper type={type}>{Component}</ContentWrapper>
}
