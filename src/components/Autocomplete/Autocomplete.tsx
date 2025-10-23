import Results from "@/components/Autocomplete/Results/Results"
import { useRef } from "preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useAutocomplete } from "./useAutocomplete"

type Props = {
  onSubmit: (input: string) => void
}

export default function Autocomplete({ onSubmit }: Props) {
  const autocompleteRef = useRef<HTMLFormElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { input, showAutocomplete, onSearchSubmit, handleInputChange, handleFocus } = useAutocomplete({
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
        onSearchInput={target => handleInputChange(target.value)}
        componentProps={{
          value: input,
          onFocus: handleFocus,
          ref: searchInputRef
        }}
      />
      <button type="submit">Search</button>
      {showAutocomplete && <Results onSubmit={onSearchSubmit} />}
    </form>
  )
}
