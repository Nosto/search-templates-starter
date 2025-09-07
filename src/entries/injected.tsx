import { init } from "@nosto/search-js/preact/inject"
import { dispatchNostoEvent } from "@nosto/search-js/preact/events"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"

function onSearchSubmit(query: string) {
  // TODO change location in case not on search page
  dispatchNostoEvent({
    event: "actions/newSearch",
    params: { query: { query }, targetStore: "search" }
  })
}

init({
  autocomplete: {
    config: autocompleteConfig,
    inputCssSelector: "#search",
    formCssSelector: "#search-form",
    dropdownCssSelector: "#dropdown",
    onNavigateToSearch: query => {
      onSearchSubmit(query.query!)
    },
    renderAutocomplete: () => <Results onSubmit={onSearchSubmit} />
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
