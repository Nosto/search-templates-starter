import Products from "@/components/Products/Products"
import Toolbar from "@/components/Toolbar/Toolbar"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import Loader from "@/elements/Loader/Loader"
import NoResults from "@/components/NoResults/NoResults"
import { defaultConfig } from "@/config"

export function CategoryBody({ loading, foundProducts, onToggleSidebar }: ContentChildrenProps) {
  if (loading && !defaultConfig.useSkeletonLoading) return <Loader />
  return foundProducts || (loading && defaultConfig.useSkeletonLoading) ? (
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

export function CategoryBodyInfiniteScroll({ loading, foundProducts, onToggleSidebar }: ContentChildrenProps) {
  if (!foundProducts && !(loading && defaultConfig.useSkeletonLoading)) return loading ? <Loader /> : <NoResults />
  return (
    <>
      <SelectedFilters />
      <Toolbar onToggleSidebar={onToggleSidebar} />
      <InfiniteScroll>
        <Products />
      </InfiniteScroll>
    </>
  )
}

// replace with following line to enable infinite scroll
// export default wrapContent("category", CategoryBodyInfiniteScroll)
export default wrapContent("category", CategoryBody)
