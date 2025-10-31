import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import Search from "@/components/Search/Search"
import "@/variable.css"
import "@/viewTransition.css"
import { categoryConfig, serpConfig } from "@/config"
import { render } from "preact"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import Category from "@/components/Category/Category"
import { tagging } from "@/mapping/tagging"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import { nostojs } from "@nosto/nosto-js"
import Portal from "@/elements/Portal/Portal"

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
