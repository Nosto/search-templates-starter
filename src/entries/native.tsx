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
import { getInitialStore } from "@/utils/initialStore"

type InitialStore = Awaited<ReturnType<typeof getInitialStore>>

function SerpApp({ initialStore }: { initialStore: InitialStore }) {
  return (
    <SearchPageProvider config={serpConfig} store={initialStore}>
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

function CategoryApp({ initialStore }: { initialStore: InitialStore }) {
  return (
    <CategoryPageProvider config={categoryConfig} store={initialStore}>
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
  const pageType = tagging.pageType()
  const App = pageType === "category" ? CategoryApp : SerpApp
  const initialStore = await getInitialStore(pageType === "category" ? "category" : "search")

  render(
    <ErrorBoundary>
      <App initialStore={initialStore} />
    </ErrorBoundary>,
    document.body
  )
}
init()
