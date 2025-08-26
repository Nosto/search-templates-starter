import { init } from "@nosto/search-js/preact/inject"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Products from "@/components/Autocomplete/Products/Products"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
// import { render } from "preact"

function injectSearch() {
  init({
    autocomplete: {
      config: {
        defaultCurrency: "EUR"
      },
      inputCssSelector: "#search",
      formCssSelector: "#search-form",
      dropdownCssSelector: "#dropdown",
      onNavigateToSearch: query => {
        location.href = `/?q=${query.query}`
      },
      renderAutocomplete: () => <Products />,
      query: {
        keywords: {
          fields: ["keyword", "_highlight.keyword"],
          size: 5,
          facets: ["*"]
        }
      }
    },
    serp: {
      config: {
        defaultCurrency: "EUR"
      },
      cssSelector: "#serp",
      render: () => (
        <>
          <SearchQueryHandler />
          <Serp />
        </>
      )
    }
  })
}

injectSearch()
