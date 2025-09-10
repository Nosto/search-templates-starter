import Products from "@/components/Products/Products"
import Toolbar from "@/components/Toolbar/Toolbar"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import NoResults from "@/components/NoResults/NoResults"

export function CategoryBody({ foundProducts }: ContentChildrenProps) {
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

export function CategoryBodyInfiniteScroll({ loading, foundProducts }: ContentChildrenProps) {
  if (!foundProducts && !loading) return <NoResults />
  return (
    <>
      <SelectedFilters />
      <Toolbar />
      <InfiniteScroll>
        <Products />
      </InfiniteScroll>
    </>
  )
}

// replace with following line to enable infinite scroll
// export default wrapContent("category", CategoryBodyInfiniteScroll)
export default wrapContent("category", CategoryBody)
