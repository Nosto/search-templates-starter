import { init } from "@nosto/search-js/preact/inject"
import { dispatchNostoEvent } from "@nosto/search-js/preact/events"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"

function onNavigateToSearch(query: string) {
  dispatchNostoEvent({
    event: "actions/newSearch",
    params: { query: { query }, targetStore: "search" }
  })
  window.location.href = `/search/?q=${encodeURIComponent(query)}`
}

init({
  autocomplete: {
    config: autocompleteConfig,
    inputCssSelector: "#search",
    formCssSelector: "#search-form",
    dropdownCssSelector: "#dropdown",
    onNavigateToSearch: query => {
      // Handle SearchQuery object by extracting the query string
      const queryString = typeof query === "string" ? query : query.query || ""
      onNavigateToSearch(queryString)
    },
    renderAutocomplete: () => <Results onSubmit={onNavigateToSearch} />
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
