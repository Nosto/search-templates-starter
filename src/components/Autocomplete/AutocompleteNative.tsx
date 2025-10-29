import Results from "@/components/Autocomplete/Results/Results"
import { useRef } from "preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useAutocomplete } from "./useAutocomplete"
import SpeechToTextButton from "./SpeechToText/SpeechToText"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import AutocompleteContext from "./AutocompleteContext"

type Props = {
  onSubmit: (input: string, options?: SearchAnalyticsOptions) => void
}

export default function AutocompleteNative({ onSubmit }: Props) {
  const autocompleteRef = useRef<HTMLFormElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { input, showAutocomplete, setInput, setShowAutocomplete, onSearchSubmit, onKeyDown } = useAutocomplete({
    onSubmit,
    searchInputElement: searchInputRef.current,
    clickOutsideTarget: autocompleteRef.current
  })

  return (
    <AutocompleteContext.Provider value={{ onSubmit: onSearchSubmit }}>
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
    </AutocompleteContext.Provider>
  )
}
