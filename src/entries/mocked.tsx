import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { Search } from "@/components/Search/Search"
import "@/variable.css"
import { serpConfig } from "@/config"
import { render } from "preact"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import { mockConfig, mockInitialState } from "../../mocks/mocks"

function MockedApp() {
  const config = {
    ...serpConfig,
    ...mockConfig,
    initialState: mockInitialState
  }

  return (
    <SearchPageProvider config={config}>
      <SearchQueryHandler />
      <SidebarProvider>
        <Search />
        <Serp />
      </SidebarProvider>
    </SearchPageProvider>
  )
}

render(
  <ErrorBoundary>
    <MockedApp />
  </ErrorBoundary>,
  document.getElementById("app")!
)
