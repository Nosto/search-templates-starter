import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import Serp from "@/components/Serp/Serp"
import { Search } from "@/components/Search/Search"
import "@/variable.css"
import { serpConfig } from "@/config"
import { render } from "preact"
// import { render } from "preact"

function Native() {
  return (
    <>
      <SearchPageProvider config={serpConfig}>
        <Search />
        <Serp />
      </SearchPageProvider>
    </>
  )
}

render(<Native />, document.getElementById("app")!)
