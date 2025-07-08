import { JSX } from "preact"
import Sidebar from "./Sidebar"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"

export type ContentChildrenProps = { loading: boolean; foundProducts: boolean }

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

  if (!initialized) {
    return null
  }

  return (
    <div
      class="ns-serp ns-d-flex ns-flex-column ns-flex-md-row ns-font-inherit ns-p-4 ns-my-0 ns-mx-auto"
      data-nosto-element={type}
    >
      {foundProducts && <Sidebar />}
      <div
        class="ns-d-block ns-d-md-inline ns-w-100 ns-border-box ns-p-0 ns-pl-md-5"
        style={{ position: loading ? "relative" : "initial" }}
      >
        {children({ loading, foundProducts })}
      </div>
    </div>
  )
}

export function wrapContent(type: string, Component: ContentWrapperProps["children"]) {
  return () => <ContentWrapper type={type}>{Component}</ContentWrapper>
}
