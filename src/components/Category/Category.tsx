import ProductGrid from "@/components/ProductGrid/ProductGrid"
import ProductEditorial from "@/components/ProductEditorial/ProductEditorial"
import FilteringAndSorting from "@/components/FilteringAndSorting/FilteringAndSorting"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"
import { wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import Loader from "@/elements/Loader/Loader"
import NoResults from "@/components/NoResults/NoResults"

type Props = {
  loading: boolean
  foundProducts: boolean
}

export function CategoryBody({ loading, foundProducts }: Props) {
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

export function CategoryBodyInfiniteScroll({ loading, foundProducts }: Props) {
  if (!foundProducts) return loading ? <Loader /> : <NoResults />
  return (
    <>
      <SelectedFilters />
      <FilteringAndSorting />
      <InfiniteScroll>
        <ProductGrid />
      </InfiniteScroll>
      <ProductEditorial />
    </>
  )
}

// replace with following line to enable infinite scroll
// export default wrapContent("category", CategoryBodyInfiniteScroll)
export default wrapContent("category", CategoryBody)
