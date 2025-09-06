import Products from "@/components/Autocomplete/Products/Products"
import { useEffect, useState, useCallback, useRef } from "preact/hooks"
import { useActions } from "@nosto/search-js/preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useEventListener } from "@/utils/useEventListener"

type Props = {
  onSubmit: (input: string) => void
}

export default function Autocomplete({ onSubmit }: Props) {
  const [input, setInput] = useState<string>("")
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const { newSearch } = useActions()
  const autocompleteRef = useRef<HTMLFormElement>(null)

  const debounceSearch = useCallback(() => {
    const handler = setTimeout(() => {
      if (input.length >= 3) {
        newSearch({ query: input })
      }
    }, 300)
    return () => clearTimeout(handler)
  }, [input, newSearch])

  useEffect(debounceSearch, [input, debounceSearch])

  const handleClickOutside = useCallback((event: Event) => {
    if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
      setShowAutocomplete(false)
    }
  }, [])

  useEventListener({
    target: document,
    eventName: "click",
    listener: handleClickOutside,
    condition: showAutocomplete
  })

  const handleSearch = () => {
    if (input.trim()) {
      onSubmit?.(input)
    }
  }

  return (
    <form
      ref={autocompleteRef}
      onSubmit={e => {
        e.preventDefault()
        handleSearch()
      }}
    >
      <SearchInput
        onSearchInput={target => setInput(target.value)}
        componentProps={{
          onFocus: () => setShowAutocomplete(true)
        }}
      />
      <button type="submit">Search</button>
      {showAutocomplete && (
        <div>
          <Products />
        </div>
      )}
    </form>
  )
}
