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

function SerpApp() {
  return (
    <SearchPageProvider config={serpConfig}>
      <SearchQueryHandler />
      <SidebarProvider>
        <Search />
        <Serp />
      </SidebarProvider>
    </SearchPageProvider>
  )
}

function CategoryApp() {
  return (
    <CategoryPageProvider config={categoryConfig}>
      <SearchQueryHandler />
      <SidebarProvider>
        <Category />
      </SidebarProvider>
    </CategoryPageProvider>
  )
}

async function init() {
  const App = tagging.pageType() === "category" ? CategoryApp : SerpApp
  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.getElementById("app")!
  )
}
init()