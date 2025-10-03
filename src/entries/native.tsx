import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { Search } from "@/components/Search/Search"
import "@/variable.css"
import { render } from "preact"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import Category from "@/components/Category/Category"
import { tagging } from "@/mapping/tagging"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import { nostojs } from "@nosto/nosto-js"
import { initContext } from "./initContext"
import { categoryConfig, serpConfig } from "@/config"

function SerpApp() {
  const { config, store } = initContext({
    ...serpConfig,
    pageType: "search"
  })
  return (
    <SearchPageProvider config={config} store={store}>
      <SearchQueryHandler />
      <SidebarProvider>
        <Search />
        <Serp />
      </SidebarProvider>
    </SearchPageProvider>
  )
}

function CategoryApp() {
  const { config, store } = initContext({
    ...categoryConfig,
    pageType: "category"
  })
  return (
    <CategoryPageProvider config={config} store={store}>
      <SearchQueryHandler />
      <SidebarProvider>
        <Category />
      </SidebarProvider>
    </CategoryPageProvider>
  )
}

async function init() {
  await new Promise(nostojs)
  const App = tagging.pageType() === "category" ? CategoryApp : SerpApp
  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.getElementById("app")!
  )
}
init()
