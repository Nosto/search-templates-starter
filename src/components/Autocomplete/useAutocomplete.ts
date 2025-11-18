import { useState, useCallback, useEffect } from "preact/hooks"
import type { RefObject } from "preact"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useHistory } from "@nosto/search-js/preact/hooks"
import { disableNativeAutocomplete } from "@nosto/search-js/utils"
import { getInitialQuery } from "@/mapping/url/getInitialQuery"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"

type UseAutocompleteOptions = {
  onSubmit: (input: string, options?: SearchAnalyticsOptions) => void
  searchInputRef?: RefObject<HTMLInputElement>
  clickOutsideTargetRef?: RefObject<HTMLElement | Node>
  isInjected?: boolean
}

export function useAutocomplete({
  onSubmit,
  searchInputRef,
  clickOutsideTargetRef,
  isInjected = false
}: UseAutocompleteOptions) {
  const [input, setInput] = useState<string>(getInitialQuery())
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)

  useDebouncedSearch({ input })

  const { addQuery } = useHistory()

  // Disable native autocomplete when search input element is available
  useEffect(() => {
    const element = searchInputRef?.current
    if (element) {
      if (isInjected) {
        const initialQuery = getInitialQuery()
        // eslint-disable-next-line react-hooks/immutability -- Intentional DOM manipulation for injected mode
        element.value = initialQuery
      }
      disableNativeAutocomplete(element)
    }
  }, [searchInputRef, isInjected])

  const onClickOutside = useCallback(
    (event: Event) => {
      const searchInputElement = searchInputRef?.current
      const clickOutsideTarget = clickOutsideTargetRef?.current
      if (isInjected && searchInputElement && event.target === searchInputElement) {
        return
      }
      if (clickOutsideTarget && !clickOutsideTarget.contains(event.target as Node)) {
        setShowAutocomplete(false)
      }
    },
    [clickOutsideTargetRef, searchInputRef, isInjected]
  )

  useDomEvents(showAutocomplete ? document.body : null, {
    onClick: onClickOutside
  })

  const onSearchSubmit = useCallback(
    (query: string, options?: SearchAnalyticsOptions) => {
      const element = searchInputRef?.current
      const trimmedQuery = query.trim()
      if (trimmedQuery) {
        addQuery(query)
        if (isInjected && element) {
          // eslint-disable-next-line react-hooks/immutability -- Intentional DOM manipulation for injected mode
          element.value = trimmedQuery
        } else {
          setInput(trimmedQuery)
        }
        onSubmit(query, options)
      }
      element?.blur()
      setShowAutocomplete(false)
    },
    [addQuery, onSubmit, searchInputRef, isInjected]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        searchInputRef?.current?.blur()
        setShowAutocomplete(false)
      }
    },
    [searchInputRef]
  )

  return {
    input,
    showAutocomplete,
    setInput,
    setShowAutocomplete,
    onSearchSubmit,
    onKeyDown
  }
}
