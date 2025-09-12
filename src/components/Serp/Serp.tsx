import Products from "@/components/Products/Products"
import Toolbar from "@/components/Toolbar/Toolbar"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import NoResults from "@/components/NoResults/NoResults"

export function SerpBody({ foundProducts }: ContentChildrenProps) {
  return foundProducts ? (
    <>
      <Toolbar />
      <Products />
      <BottomToolbar />
    </>
  ) : (
    <NoResults />
  )
}

export function SerpBodyInfiniteScroll({ loading, foundProducts }: ContentChildrenProps) {
  if (!foundProducts && !loading) return <NoResults />
  return (
    <>
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
