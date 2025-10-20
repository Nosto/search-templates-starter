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
import Portal from "@/elements/Portal/Portal"

function SerpApp() {
  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <Portal target="#app">
          <Search />
          <Serp />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

function CategoryApp() {
  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <Portal target="#app">
          <Category />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

async function init() {
  await new Promise(nostojs)
  const pageType = tagging.pageType()
  const { config, store } =
    pageType === "category" ? initContext("category", categoryConfig) : initContext("search", serpConfig)

  switch (pageType) {
    case "category":
      render(
        <CategoryPageProvider config={config} store={store}>
          <CategoryApp />
        </CategoryPageProvider>,
        document.body
      )
      break
    case "search":
    default:
      render(
        <SearchPageProvider config={config} store={store}>
          <SerpApp />
        </SearchPageProvider>,
        document.body
      )
  }
}
init()
