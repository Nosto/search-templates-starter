import { useState, useCallback, useEffect } from "preact/hooks"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useHistory } from "@nosto/search-js/preact/hooks"
import { disableNativeAutocomplete } from "@nosto/search-js/utils"
import { getInitialQuery } from "@/mapping/url/getInitialQuery"

type UseAutocompleteOptions = {
  onSubmit: (input: string) => void
  searchInputElement?: HTMLInputElement | null
  clickOutsideTarget?: HTMLElement | Node | null
  isInjected?: boolean
}

export function useAutocomplete({
  onSubmit,
  searchInputElement,
  clickOutsideTarget,
  isInjected = false
}: UseAutocompleteOptions) {
  const [input, setInput] = useState<string>(getInitialQuery())
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)

  useDebouncedSearch({ input })

  const { addQuery } = useHistory()

  // Disable native autocomplete when search input element is available
  useEffect(() => {
    if (searchInputElement) {
      if (isInjected) {
        searchInputElement.value = getInitialQuery()
      }
      disableNativeAutocomplete(searchInputElement)
    }
  }, [searchInputElement, isInjected])

  const onClickOutside = useCallback(
    (event: Event) => {
      if (isInjected && searchInputElement && event.target === searchInputElement) {
        return
      }
      if (clickOutsideTarget && !clickOutsideTarget.contains(event.target as Node)) {
        setShowAutocomplete(false)
      }
    },
    [clickOutsideTarget, searchInputElement, isInjected]
  )

  const onKeyDown = useCallback((event: Event) => {
    const keyboardEvent = event as KeyboardEvent
    if (keyboardEvent.key === "Escape") {
      setShowAutocomplete(false)
    }
  }, [])

  useDomEvents(showAutocomplete ? document.body : null, {
    onClick: onClickOutside
  })

  useDomEvents(searchInputElement ?? null, {
    onKeyDown
  })

  useDomEvents(clickOutsideTarget !== searchInputElement ? (clickOutsideTarget as HTMLElement | null) : null, {
    onKeyDown
  })

  const onSearchSubmit = useCallback(
    (query: string) => {
      if (query.trim()) {
        addQuery(query)
        if (isInjected && searchInputElement) {
          searchInputElement.value = query.trim()
        } else {
          setInput(query.trim())
        }
        onSubmit(query)
      }
      if (searchInputElement) {
        searchInputElement.blur()
      }
      setShowAutocomplete(false)
    },
    [addQuery, onSubmit, searchInputElement, isInjected]
  )

  return {
    input,
    showAutocomplete,
    setInput,
    setShowAutocomplete,
    onSearchSubmit
  }
}
