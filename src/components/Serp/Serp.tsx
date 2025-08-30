import ProductGrid from "@/components/ProductGrid/ProductGrid"
import ProductEditorial from "@/components/ProductEditorial/ProductEditorial"
import FilteringAndSorting from "@/components/FilteringAndSorting/FilteringAndSorting"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import Loader from "@/elements/Loader/Loader"
import NoResults from "@/components/NoResults/NoResults"

export function SerpBody({ loading, foundProducts }: ContentChildrenProps) {
  if (loading) return <Loader />
  return foundProducts ? (
    <>
      <SelectedFilters />
      <FilteringAndSorting />
      <ProductGrid />
      <ProductEditorial />
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
      <FilteringAndSorting />
      <InfiniteScroll
        observerOptions={{
          rootMargin: "100% 0px"
        }}
      >
        <ProductGrid />
      </InfiniteScroll>
      <ProductEditorial />
    </>
  )
}

// replace with following line to enable infinite scroll
// export default wrapContent("search", SerpBodyInfiniteScroll)
export default wrapContent("search", SerpBody)
