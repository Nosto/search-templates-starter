import Results from "@/components/Autocomplete/Results/Results"
import { useRef } from "preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useAutocomplete } from "./useAutocomplete"
import SpeechToTextButton from "./SpeechToText/SpeechToText"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import { AutocompleteContextProvider } from "./AutocompleteContext"
import { AutocompleteConfig } from "@nosto/search-js/preact/autocomplete"
import { Store } from "@nosto/search-js/preact/common"

type Props = {
  onSubmit: (input: string, options?: SearchAnalyticsOptions) => void
  config: AutocompleteConfig
  store?: Store
}

export default function AutocompleteNative({ onSubmit, config, store }: Props) {
  const autocompleteRef = useRef<HTMLFormElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { input, showAutocomplete, setInput, setShowAutocomplete, onSearchSubmit, onKeyDown } = useAutocomplete({
    onSubmit,
    searchInputElement: searchInputRef.current,
    clickOutsideTarget: autocompleteRef.current
  })

  return (
    <AutocompleteContextProvider onSubmit={onSearchSubmit} config={config} store={store}>
      <form
        ref={autocompleteRef}
        onSubmit={e => {
          e.preventDefault()
          onSearchSubmit(input)
        }}
      >
        <SearchInput
          onSearchInput={target => setInput(target.value)}
          componentProps={{
            value: input,
            onFocus: () => setShowAutocomplete(true),
            ref: searchInputRef
          }}
        />
        <SpeechToTextButton />
        <button type="submit">Search</button>
        {showAutocomplete && <Results onKeyDown={onKeyDown} />}
      </form>
    </AutocompleteContextProvider>
  )
}
