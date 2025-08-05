import { render } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import { Search } from "@/components/Search/Search"
import "./variable.css"
import { initConfig, serpConfig } from "./config"
import { init } from "@nosto/nosto-js"

export function App() {
  init(initConfig)

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
