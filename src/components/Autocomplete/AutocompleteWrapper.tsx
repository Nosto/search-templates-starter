import Autocomplete from "./Autocomplete"
import { useEffect, useState, useCallback } from "preact/hooks"
import { useActions } from "@nosto/search-js/preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"

export default function AutocompleteWrapper({ onSubmit }: { onSubmit: (input: string) => void }) {
  const [input, setInput] = useState<string>("")
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const { newSearch } = useActions()

  const debounceSearch = useCallback(() => {
    const handler = setTimeout(() => {
      if (input.length >= 3) {
        newSearch({ query: input })
      }
    }, 300)
    return () => clearTimeout(handler)
  }, [input, newSearch])

  useEffect(debounceSearch, [input])

  const handleSearch = () => {
    if (input.trim()) {
      onSubmit(input)
    }
  }

  return (
    <div>
      <SearchInput
        onSearchInput={target => setInput(target.value)}
        componentProps={{
          onBlur: () => setShowAutocomplete(false),
          onFocus: () => setShowAutocomplete(true)
        }}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      {showAutocomplete && (
        <div>
          <Autocomplete />
        </div>
      )}
    </div>
  )
}
