import Results from "@/components/Autocomplete/Results/Results"
import { useRef } from "preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useAutocomplete } from "./useAutocomplete"
import { useAutocompleteNavigation } from "@/hooks/useAutocompleteNavigation"
import { SpeechToTextButton } from "./SpeechToText/SpeechToText"

type Props = {
  onSubmit: (input: string) => void
}

export default function AutocompleteNative({ onSubmit }: Props) {
  const autocompleteRef = useRef<HTMLFormElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { input, showAutocomplete, setInput, setShowAutocomplete, onSearchSubmit } = useAutocomplete({
    onSubmit,
    searchInputElement: searchInputRef.current,
    clickOutsideTarget: autocompleteRef.current
  })

  useAutocompleteNavigation({
    formRef: autocompleteRef,
    isOpen: showAutocomplete,
    onClose: () => setShowAutocomplete(false),
    onSubmit: onSearchSubmit
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
      {showAutocomplete && <Results onSubmit={onSearchSubmit} />}
    </form>
  )
}
