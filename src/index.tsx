import { render } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { initNosto } from "./utils/initNosto"
import Serp from "./components/Serp"
import { Search } from "./components/Search"
import "./styles/index.css"
import { serpConfig } from "./config"

initNosto()

export function App() {
  return (
    <>
      <SearchPageProvider config={serpConfig}>
        <Search />
        <Serp />
      </SearchPageProvider>
    </>
  )
}
// TODO: Serp and autocomplete components should be later injected by CSS selector instead
render(<App />, document.getElementById("app")!)
