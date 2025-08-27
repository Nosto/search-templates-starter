import Products from "@/components/Autocomplete/Products/Products"
import { useEffect, useState, useCallback } from "preact/hooks"
import { useActions } from "@nosto/search-js/preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"

type Props = {
  onSubmit: (input: string) => void
}

export default function Autocomplete({ onSubmit }: Props) {
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

  useEffect(debounceSearch, [input, debounceSearch])

  const handleSearch = () => {
    if (input.trim()) {
      onSubmit?.(input)
    }
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSearch()
      }}
    >
      <SearchInput
        onSearchInput={target => setInput(target.value)}
        componentProps={{
          onBlur: () => setShowAutocomplete(false),
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
