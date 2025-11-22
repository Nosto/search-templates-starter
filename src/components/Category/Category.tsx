import Products from "@/components/Products/Products"
import Toolbar from "@/components/Toolbar/Toolbar"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import NoResults from "@/components/NoResults/NoResults"
import { config } from "@/config"

export function CategoryBody({ foundProducts, loading }: ContentChildrenProps) {
  if (!foundProducts && !loading) return <NoResults />
  return (
    <>
      <Toolbar />
      <Products />
      <BottomToolbar />
    </>
  )
}

export function CategoryBodyInfiniteScroll({ foundProducts, loading }: ContentChildrenProps) {
  if (!foundProducts && !loading) return <NoResults />
  return (
    <>
      <Toolbar />
      <InfiniteScroll
        observerOptions={{
          rootMargin: "50% 0px"
        }}
      >
        <Products />
      </InfiniteScroll>
    </>
  )
}

const Component = config.infiniteScroll ? CategoryBodyInfiniteScroll : CategoryBody
export default wrapContent("category", Component)
