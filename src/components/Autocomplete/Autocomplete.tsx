import Results from "@/components/Autocomplete/Results/Results"
import { useState, useCallback, useRef } from "preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"

type Props = {
  onSubmit: (input: string) => void
}

export default function Autocomplete({ onSubmit }: Props) {
  const [input, setInput] = useState<string>("")
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const autocompleteRef = useRef<HTMLFormElement>(null)

  useDebouncedSearch({ input })

  const onClickOutside = useCallback((event: Event) => {
    if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
      setShowAutocomplete(false)
    }
  }, [])

  useDomEvents(showAutocomplete ? document.body : null, {
    onClick: onClickOutside
  })

  const onSearchSubmit = (query: string) => {
    if (query.trim()) {
      onSubmit(query)
      setShowAutocomplete(false)
    }
  }

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
          onFocus: () => setShowAutocomplete(true),
          autocomplete: "off"
        }}
      />
      <button type="submit">Search</button>
      {showAutocomplete && <Results onSubmit={onSearchSubmit} />}
    </form>
  )
}
