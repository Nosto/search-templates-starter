import { useActions } from "@nosto/search-js/preact/hooks"
import { useAutocompleteConfig } from "@nosto/search-js/preact/common"
import { useCallback, useEffect } from "preact/hooks"

type Props = {
  input: string
}

export function useDebouncedSearch({ input }: Props) {
  // autocomplete level search action
  const { newSearch } = useActions()
  const { minQueryLength, debounceDelay } = useAutocompleteConfig()

  const debounceSearch = useCallback(() => {
    const handler = setTimeout(() => {
      if (input.length >= minQueryLength) {
        newSearch({ query: input })
      }
    }, debounceDelay)
    return () => clearTimeout(handler)
  }, [input, newSearch, minQueryLength, debounceDelay])

  useEffect(debounceSearch, [input, debounceSearch])
}
