import Products from "@/components/Products/Products"
import Toolbar from "@/components/Toolbar/Toolbar"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import Loader from "@/elements/Loader/Loader"
import NoResults from "@/components/NoResults/NoResults"

export function SerpBody({ loading, foundProducts, onToggleSidebar }: ContentChildrenProps) {
  if (loading) return <Loader />
  return foundProducts ? (
    <>
      <SelectedFilters />
      <Toolbar onToggleSidebar={onToggleSidebar} />
      <Products />
      <BottomToolbar />
    </>
  ) : (
    <NoResults />
  )
}

export function SerpBodyInfiniteScroll({ loading, foundProducts, onToggleSidebar }: ContentChildrenProps) {
  if (!foundProducts) return loading ? <Loader /> : <NoResults />
  return (
    <>
      <SelectedFilters />
      <Toolbar onToggleSidebar={onToggleSidebar} />
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
