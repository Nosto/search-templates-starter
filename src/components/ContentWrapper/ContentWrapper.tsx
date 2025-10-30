import { JSX } from "preact"
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import { cl } from "@nosto/search-js/utils"

export type ContentChildrenProps = { loading: boolean; foundProducts: boolean }

type ContentWrapperProps = {
  type: string
  children: (props: ContentChildrenProps) => JSX.Element | null
}

/**
 * ContentWrapper takes a function to render non-empty results in the content area.
 * On loading nothing is shown and for empty results the NoResults component is used.
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
      className="font-ns text-ns-4 min-h-ns-content flex flex-col p-0 my-0 mx-auto md:!flex-row"
      data-nosto-element={type}
    >
      {foundProducts && <FilterSidebar />}
      <div className={cl("block w-full box-border p-0 [position:initial] md:inline-block", loading && "relative")}>
        {children({ loading, foundProducts })}
      </div>
    </div>
  )
}

export function wrapContent(type: string, Component: ContentWrapperProps["children"]) {
  // eslint-disable-next-line react/display-name
  return () => <ContentWrapper type={type}>{Component}</ContentWrapper>
}
