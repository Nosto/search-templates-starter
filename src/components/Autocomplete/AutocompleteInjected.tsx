import Results from "@/components/Autocomplete/Results/Results"
import { useDomEvents } from "@/hooks/useDomEvents"
import { selectors } from "@/config"
import { useAutocomplete } from "./useAutocomplete"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import { OnSubmitProvider } from "./OnSubmitContext"
import { useRef, useEffect } from "preact/hooks"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import { QUERY_PARAM } from "@/mapping/url/constants"

type Props = {
  onSubmit: (input: string, options?: SearchAnalyticsOptions) => void
}

export default function AutocompleteInjected({ onSubmit }: Props) {
  const dropdownRef = useRef<HTMLElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const searchFormRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    dropdownRef.current = document.querySelector<HTMLElement>(selectors.dropdown)
    searchInputRef.current = document.querySelector<HTMLInputElement>(selectors.searchInput)
    searchFormRef.current = document.querySelector<HTMLFormElement>(selectors.searchForm)
  }, [])

  const redirect = useNostoAppState(state => state.response?.redirect)

  const { input, showAutocomplete, setInput, setShowAutocomplete, onSearchSubmit, onKeyDown } = useAutocomplete({
    onSubmit,
    searchInputRef,
    clickOutsideTargetRef: dropdownRef,
    isInjected: true
  })

  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search)
      const query = searchParams.get(QUERY_PARAM) || ""
      if (searchInputRef.current) {
        searchInputRef.current.value = query
        setInput(query)
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
    // setInput is stable but included to satisfy exhaustive-deps
  }, [setInput])

  useDomEvents(searchInputRef, {
    onInput: () => setInput(searchInputRef.current?.value || ""),
    onFocus: () => setShowAutocomplete(true),
    onKeyDown
  })

  useDomEvents(searchFormRef, {
    onSubmit: e => {
      e.preventDefault()
      if (redirect) {
        // Direct navigation is intentional for redirect rules (can be external URLs)
        window.location.href = redirect
      } else {
        onSearchSubmit(input)
      }
    }
  })

  return showAutocomplete ? (
    <OnSubmitProvider onSubmit={onSearchSubmit}>
      <Results onKeyDown={onKeyDown} />
    </OnSubmitProvider>
  ) : null
}
