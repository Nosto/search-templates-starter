import { useActions } from "@nosto/search-js/preact/hooks"
import { useAutocompleteConfig } from "@nosto/search-js/preact/common"
import { useCallback, useEffect } from "preact/hooks"

type Props = {
  input: string
}

export function useDebouncedSearch({ input }: Props) {
  // autocomplete level search action
  const { newSearch } = useActions()
  const config = useAutocompleteConfig()

  const debounceSearch = useCallback(() => {
    const handler = setTimeout(() => {
      if (input.length >= config.minQueryLength) {
        newSearch({ query: input })
      }
    }, config.debounceDelay)
    return () => clearTimeout(handler)
  }, [input, newSearch, config.minQueryLength, config.debounceDelay])

  useEffect(debounceSearch, [input, debounceSearch])
}
