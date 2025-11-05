import Products from "@/components/Products/Products"
import Toolbar from "@/components/Toolbar/Toolbar"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import NoResults from "@/components/NoResults/NoResults"
import { infiniteScroll } from "@/config"

export function SerpBody({ foundProducts, loading }: ContentChildrenProps) {
  if (!foundProducts && !loading) return <NoResults />
  return (
    <>
      <Toolbar />
      <Products />
      <BottomToolbar />
    </>
  )
}

export function SerpBodyInfiniteScroll({ foundProducts, loading }: ContentChildrenProps) {
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

const Component = infiniteScroll ? SerpBodyInfiniteScroll : SerpBody
export default wrapContent("search", Component)
