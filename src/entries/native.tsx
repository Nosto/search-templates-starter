import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { Search } from "@/components/Search/Search"
import "@/variable.css"
import { serpConfig } from "@/config"
import { render } from "preact"
import { SidebarProvider } from "@/contexts/SidebarContext"

function App() {
  return (
    <>
      <SearchPageProvider config={serpConfig}>
        <SidebarProvider>
          <SearchQueryHandler />
          <Search />
          <Serp />
        </SidebarProvider>
      </SearchPageProvider>
    </>
  )
}

render(<App />, document.getElementById("app")!)
