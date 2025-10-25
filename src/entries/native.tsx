import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { Search } from "@/components/Search/Search"
import "@/variable.css"
import { categoryConfig, serpConfig } from "@/config"
import { render } from "preact"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import Category from "@/components/Category/Category"
import { tagging } from "@/mapping/tagging"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import { nostojs } from "@nosto/nosto-js"
import Portal from "@/elements/Portal/Portal"

/**
 * The main search results page application component for native mode.
 * Combines search functionality, sidebar state management, and renders into a portal target.
 * Provides search input and displays search results in a native application context.
 *
 * @returns A complete search application with search input and results display
 */
function SerpApp() {
  return (
    <SearchPageProvider config={serpConfig}>
      <SearchQueryHandler />
      <SidebarProvider>
        <Portal target="#app">
          <Search />
          <Serp />
        </Portal>
      </SidebarProvider>
    </SearchPageProvider>
  )
}

/**
 * The category page application component for browsing category-specific products.
 * Manages category page state and provides sidebar functionality for filtering category results.
 *
 * @returns A category browsing application with filtering capabilities
 */
function CategoryApp() {
  return (
    <CategoryPageProvider config={categoryConfig}>
      <SearchQueryHandler />
      <SidebarProvider>
        <Portal target="#app">
          <Category />
        </Portal>
      </SidebarProvider>
    </CategoryPageProvider>
  )
}

/**
 * Initializes the appropriate application based on the current page type.
 * Waits for Nosto JS to be available, then determines whether to render
 * the search app or category app based on page tagging information.
 */
async function init() {
  await new Promise(nostojs)
  const App = tagging.pageType() === "category" ? CategoryApp : SerpApp
  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.body
  )
}
init()
