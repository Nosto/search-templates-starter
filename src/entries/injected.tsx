import { init } from "@nosto/search-js/preact/inject"
import { dispatchNostoEvent } from "@nosto/search-js/preact/events"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Products from "@/components/Autocomplete/Products/Products"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { autocompleteConfig, serpConfig } from "@/config"
import { SidebarProvider } from "@/contexts/SidebarContext"

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
    renderAutocomplete: () => <Products />
  },
  serp: {
    config: serpConfig,
    cssSelector: "#serp",
    render: () => (
      <SidebarProvider>
        <SearchQueryHandler />
        <Serp />
      </SidebarProvider>
    )
  }
})
