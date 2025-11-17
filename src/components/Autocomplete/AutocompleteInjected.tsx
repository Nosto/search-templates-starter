import Results from "@/components/Autocomplete/Results/Results"
import { useDomEvents } from "@/hooks/useDomEvents"
import { selectors } from "@/config"
import { useAutocomplete } from "./useAutocomplete"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import { OnSubmitProvider } from "./OnSubmitContext"
import { useRef, useEffect } from "preact/hooks"

type Props = {
  onSubmit: (input: string, options?: SearchAnalyticsOptions) => void
}

export default function AutocompleteInjected({ onSubmit }: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLElement>(null)
  const searchInput = document.querySelector<HTMLInputElement>(selectors.searchInput)!
  const searchForm = document.querySelector<HTMLFormElement>(selectors.searchForm)!

  useEffect(() => {
    searchInputRef.current = searchInput
    dropdownRef.current = document.querySelector<HTMLElement>(selectors.dropdown)!
  }, [searchInput])

  const { input, showAutocomplete, setInput, setShowAutocomplete, onSearchSubmit, onKeyDown } = useAutocomplete({
    onSubmit,
    searchInputRef,
    clickOutsideTargetRef: dropdownRef,
    isInjected: true
  })

  useDomEvents(searchInput, {
    onInput: () => setInput(searchInput.value),
    onFocus: () => setShowAutocomplete(true),
    onKeyDown
  })

  useDomEvents(searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  return showAutocomplete ? (
    <OnSubmitProvider onSubmit={onSearchSubmit}>
      <Results onKeyDown={onKeyDown} />
    </OnSubmitProvider>
  ) : null
}
