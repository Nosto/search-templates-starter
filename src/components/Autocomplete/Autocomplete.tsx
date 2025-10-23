import Results from "@/components/Autocomplete/Results/Results"
import { useState, useCallback, useRef, useEffect } from "preact/hooks"
import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { useHistory } from "@nosto/search-js/preact/hooks"
import { disableNativeAutocomplete } from "@nosto/search-js/utils"
import { getInitialQuery } from "@/mapping/url/getInitialQuery"
import { useDropdown } from "@/contexts/DropdownContext"

type Props = {
  onSubmit: (input: string) => void
}

export default function Autocomplete({ onSubmit }: Props) {
  const [input, setInput] = useState<string>(getInitialQuery())
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const autocompleteRef = useRef<HTMLFormElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { highlightNext, highlightPrevious, executeHighlighted } = useDropdown()

  useDebouncedSearch({ input })

  useEffect(() => {
    if (searchInputRef.current) {
      disableNativeAutocomplete(searchInputRef.current)
    }
  }, [])

  const onClickOutside = useCallback((event: Event) => {
    if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
      setShowAutocomplete(false)
    }
  }, [])

  useDomEvents(showAutocomplete ? document.body : null, {
    onClick: onClickOutside
  })

  const { addQuery } = useHistory()

  const onSearchSubmit = (query: string) => {
    if (query.trim()) {
      addQuery(query)
      setInput(query.trim())
      searchInputRef.current!.blur()
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
          value: input,
          onFocus: () => setShowAutocomplete(true),
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              highlightNext()
            }
            if (event.key === "ArrowUp") {
              event.preventDefault()
              highlightPrevious()
            }
            if (event.key === "Enter") {
              if (executeHighlighted()) {
                event.preventDefault()
              }
            }
            if (event.key === "Escape") {
              setShowAutocomplete(false)
              searchInputRef.current!.blur()
            }
          },
          ref: searchInputRef
        }}
      />
      <button type="submit">Search</button>
      {showAutocomplete && <Results onSubmit={onSearchSubmit} />}
    </form>
  )
}
