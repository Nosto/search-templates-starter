import Results from "@/components/Autocomplete/Results/Results"
import { useDomEvents } from "@/hooks/useDomEvents"
import { selectors } from "@/config"
import { useAutocomplete } from "./useAutocomplete"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import { AutocompleteContextProvider } from "@/contexts/AutocompleteContext"
import { AutocompleteConfig } from "@nosto/search-js/preact/autocomplete"
import { Store } from "@nosto/search-js/preact/common"

type Props = {
  onSubmit: (input: string, options?: SearchAnalyticsOptions) => void
  config: AutocompleteConfig
  store?: Store
}

export default function AutocompleteInjected({ onSubmit, config, store }: Props) {
  const dropdownElement = document.querySelector<HTMLElement>(selectors.dropdown)!
  const searchInput = document.querySelector<HTMLInputElement>(selectors.searchInput)!
  const searchForm = document.querySelector<HTMLFormElement>(selectors.searchForm)!

  const { input, showAutocomplete, setInput, setShowAutocomplete, onSearchSubmit, onKeyDown } = useAutocomplete({
    onSubmit,
    searchInputElement: searchInput,
    clickOutsideTarget: dropdownElement,
    isInjected: true
  })

  useDomEvents(searchInput, {
    onInput: () => setInput(searchInput.value),
    onFocus: () => setShowAutocomplete(true),
    onKeyDown
  })

  useDomEvents(searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  return showAutocomplete ? (
    <AutocompleteContextProvider onSubmit={onSearchSubmit} config={config} store={store}>
      <Results onKeyDown={onKeyDown} />
    </AutocompleteContextProvider>
  ) : null
}
