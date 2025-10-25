import Products from "@/components/Products/Products"
import Toolbar from "@/components/Toolbar/Toolbar"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"
import { ContentChildrenProps, wrapContent } from "@/components/ContentWrapper/ContentWrapper"
import { InfiniteScroll } from "@nosto/search-js/preact/common"
import NoResults from "@/components/NoResults/NoResults"

/**
 * The main content body for search results pages with standard pagination.
 * Displays toolbar, product grid, and bottom toolbar when products are found.
 * Shows NoResults component when no search results are available and not loading.
 *
 * @param foundProducts - Whether any products were found for the current search
 * @param loading - Whether search results are currently being loaded
 * @returns Search results content with toolbar and products, or NoResults if empty
 */
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

/**
 * Alternative search results body implementation with infinite scroll functionality.
 * Similar to SerpBody but uses infinite scroll for loading additional results
 * instead of traditional pagination controls. Includes expanded root margin for better UX.
 *
 * @param foundProducts - Whether any products were found for the current search
 * @param loading - Whether search results are currently being loaded
 * @returns Search results content with infinite scroll enabled, or NoResults if empty
 */
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

// replace with following line to enable infinite scroll
// export default wrapContent("search", SerpBodyInfiniteScroll)
export default wrapContent("search", SerpBody)
