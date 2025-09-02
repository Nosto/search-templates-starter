import { init } from "@nosto/search-js/preact/inject"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Products from "@/components/Autocomplete/Products/Products"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"

init({
  autocomplete: {
    config: autocompleteConfig,
    inputCssSelector: "#search",
    formCssSelector: "#search-form",
    dropdownCssSelector: "#dropdown",
    onNavigateToSearch: query => {
      location.href = `/?q=${query.query}`
    },
    renderAutocomplete: () => <Products />
  },
  serp: {
    config: serpConfig,
    cssSelector: "#serp",
    render: () => (
      <>
        <SearchQueryHandler />
        <Serp />
      </>
    )
  }
})
