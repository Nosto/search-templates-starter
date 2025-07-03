import Products from "./Products"
import Toolbar from "./Toolbar"
import BottomToolbar from "./BottomToolbar"
import SelectedFilters from "./SelectedFilters"
import { ContentChildrenProps, wrapContent } from "./ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import Loader from "./elements/Loader"
import NoResults from "./NoResults"

export function SerpBody({ loading, foundProducts }: ContentChildrenProps) {
  if (loading) return <Loader />
  return foundProducts ? (
    <>
      <SelectedFilters />
      <Toolbar />
      <Products />
      <BottomToolbar />
    </>
  ) : (
    <NoResults />
  )
}

export function SerpBodyInfiniteScroll({ loading, foundProducts }: ContentChildrenProps) {
  if (!foundProducts) return loading ? <Loader /> : <NoResults />
  return (
    <>
      <SelectedFilters />
      <Toolbar />
      <InfiniteScroll
        observerOptions={{
          rootMargin: "100% 0px"
        }}
      >
        <Products />
      </InfiniteScroll>
    </>
  )
}

// replace with following line to enable infinite scroll
// export default wrapContent("search", SerpBodyInfiniteScroll)
export default wrapContent("search", SerpBody)
