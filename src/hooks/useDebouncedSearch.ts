import { useActions } from "@nosto/search-js/preact/hooks"
import { useCallback, useEffect } from "preact/hooks"

type Props = {
  input: string
}

export function useDebouncedSearch({ input }: Props) {
  // autocomplete level search action
  const { newSearch } = useActions()

  const debounceSearch = useCallback(() => {
    const handler = setTimeout(() => {
      // TODO take from config
      if (input.length >= 3) {
        newSearch({ query: input })
      }
    }, 300) // TODO take from config
    return () => clearTimeout(handler)
  }, [input, newSearch])

  useEffect(debounceSearch, [input, debounceSearch])
}
