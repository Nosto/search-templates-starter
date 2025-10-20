import Results from "@/components/Autocomplete/Results/Results"
import SearchBar from "@/components/Autocomplete/SearchBar"
import { useState, useCallback, useRef, useEffect } from "preact/hooks"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { useHistory } from "@nosto/search-js/preact/hooks"
import { disableNativeAutocomplete } from "@nosto/search-js/utils"
import { getInitialQuery } from "@/mapping/url/getInitialQuery"
import styles from "./Autocomplete.module.css"

type Props = {
  onSubmit: (input: string) => void
}

export default function Autocomplete({ onSubmit }: Props) {
  const [input, setInput] = useState<string>(getInitialQuery())
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const autocompleteRef = useRef<HTMLFormElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

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
    <div className={styles.autocomplete}>
      <form
        ref={autocompleteRef}
        onSubmit={e => {
          e.preventDefault()
          onSearchSubmit(input)
        }}
      >
        <SearchBar
          value={input}
          placeholder="Search"
          onSearchInput={target => setInput(target.value)}
          onFocus={() => setShowAutocomplete(true)}
          searchInputRef={searchInputRef}
        />
        <button type="submit" className={styles.submitButton}>
          Search
        </button>
      </form>
      {showAutocomplete && (
        <div className={styles.results}>
          <Results onSubmit={onSearchSubmit} />
        </div>
      )}
    </div>
  )
}
