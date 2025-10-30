import Results from "@/components/Autocomplete/Results/Results"
import { useRef } from "preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useAutocomplete } from "./useAutocomplete"
import SpeechToTextButton from "./SpeechToText/SpeechToText"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import { OnSubmitProvider } from "./OnSubmitContext"

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
      <SpeechToTextButton onSubmit={onSearchSubmit} />
      <button type="submit">Search</button>
      {showAutocomplete && (
        <OnSubmitProvider onSubmit={onSearchSubmit}>
          <Results onKeyDown={onKeyDown} />
        </OnSubmitProvider>
      )}
    </form>
  )
}
