import { render } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import { Search } from "@/components/Search/Search"
import "./variable.css"
import { serpConfig } from "./config"

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
