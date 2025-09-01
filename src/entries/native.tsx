import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { Search } from "@/components/Search/Search"
import "@/variable.css"
import { serpConfig } from "@/config"
import { render } from "preact"

function App() {
  return (
    <>
      <SearchPageProvider config={serpConfig}>
        <SearchQueryHandler />
        <Search />
        <Serp />
      </SearchPageProvider>
    </>
  )
}

render(<App />, document.getElementById("app")!)
