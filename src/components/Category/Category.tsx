import Products from "@/components/Products/Products"
import Toolbar from "@/components/Toolbar/Toolbar"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import NoResults from "@/components/NoResults/NoResults"

/**
 * The main content body for category pages with standard pagination.
 * Displays toolbar, product grid, and bottom toolbar when products are found.
 * Shows NoResults component when no products are available and not loading.
 *
 * @param foundProducts - Whether any products were found in the current category
 * @param loading - Whether the category data is currently being loaded
 * @returns Category content with toolbar and products, or NoResults if empty
 */
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

/**
 * Alternative category body implementation with infinite scroll functionality.
 * Similar to CategoryBody but uses infinite scroll for loading additional products
 * instead of traditional pagination controls.
 *
 * @param foundProducts - Whether any products were found in the current category
 * @param loading - Whether the category data is currently being loaded
 * @returns Category content with infinite scroll enabled, or NoResults if empty
 */
export function CategoryBodyInfiniteScroll({ foundProducts, loading }: ContentChildrenProps) {
  if (!foundProducts && !loading) return <NoResults />
  return (
    <>
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
