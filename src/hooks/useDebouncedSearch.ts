import { useActions } from "@nosto/search-js/preact/hooks"
import { useAutocompleteConfig } from "@nosto/search-js/preact/common"
import { useEffect } from "preact/hooks"

type Props = {
  input: string
}

export function useDebouncedSearch({ input }: Props) {
  const { newSearch } = useActions()
  const { minQueryLength, debounceDelay } = useAutocompleteConfig()

  useEffect(() => {
    if (input.length < minQueryLength) return
    const handler = setTimeout(() => newSearch({ query: input }), debounceDelay)
    return () => clearTimeout(handler)
  }, [input, newSearch, minQueryLength, debounceDelay])
}
