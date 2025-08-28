import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import { Search } from "@/components/Search/Search"
import "@/variable.css"
import { serpConfig } from "@/config"
import { render } from "preact"
import { LocationProvider, Route, Router } from "preact-iso"
import NotFound from "@/components/NotFound"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"

function App() {
  return (
    <>
      <LocationProvider>
        <SearchPageProvider config={serpConfig}>
          <Search />
          <SearchQueryHandler />
          <Router>
            <Route path="/" component={Serp} />
            <Route default component={NotFound} />
          </Router>
        </SearchPageProvider>
      </LocationProvider>
    </>
  )
}

render(<App />, document.getElementById("app")!)
