import Products from "./Products"
import Toolbar from "./Toolbar"
import BottomToolbar from "./BottomToolbar"
import SelectedFilters from "./SelectedFilters"
import { wrapContent } from "./ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import Loader from "./elements/Loader"
import NoResults from "./NoResults"

export function CategoryBody({ loading, foundProducts }: { loading: boolean; foundProducts: boolean }) {
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

export function CategoryBodyInfiniteScroll({ loading, foundProducts }: { loading: boolean; foundProducts: boolean }) {
  if (!foundProducts) return loading ? <Loader /> : <NoResults />
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
