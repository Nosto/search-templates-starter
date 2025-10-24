import Results from "@/components/Autocomplete/Results/Results"
import { useDomEvents } from "@/hooks/useDomEvents"
import { selectors } from "@/config"
import { useAutocomplete } from "./useAutocomplete"
import { useAutocompleteNavigation } from "@/hooks/useAutocompleteNavigation"
import { useRef } from "preact/hooks"

type Props = {
  onSubmit: (input: string) => void
}

export default function AutocompleteInjected({ onSubmit }: Props) {
  const dropdownElement = document.querySelector<HTMLElement>(selectors.dropdown)!
  const searchInput = document.querySelector<HTMLInputElement>(selectors.searchInput)!
  const searchForm = document.querySelector<HTMLFormElement>(selectors.searchForm)!
  const searchFormRef = useRef(searchForm)

  const { input, showAutocomplete, setInput, setShowAutocomplete, onSearchSubmit } = useAutocomplete({
    onSubmit,
    searchInputElement: searchInput,
    clickOutsideTarget: dropdownElement,
    isInjected: true
  })

  useDomEvents(searchInput, {
    onInput: () => setInput(searchInput.value),
    onFocus: () => setShowAutocomplete(true)
  })

  useDomEvents(searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  useAutocompleteNavigation({
    formRef: searchFormRef,
    isOpen: showAutocomplete,
    setShowAutocomplete,
    onSubmit: onSearchSubmit
  })

  return showAutocomplete ? <Results onSubmit={onSearchSubmit} /> : null
}
