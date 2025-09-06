import { init } from "@nosto/search-js/preact/inject"
import { dispatchNostoEvent } from "@nosto/search-js/preact/events"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"

init({
  autocomplete: {
    config: autocompleteConfig,
    inputCssSelector: "#search",
    formCssSelector: "#search-form",
    dropdownCssSelector: "#dropdown",
    onNavigateToSearch: query => {
      dispatchNostoEvent({
        event: "actions/newSearch",
        params: { query, targetStore: "search" }
      })
    },
    renderAutocomplete: () => <Results onSubmit={query => {
      // Navigate to search with the string query
      window.location.href = `/search/?q=${encodeURIComponent(query)}`
    }} />
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
