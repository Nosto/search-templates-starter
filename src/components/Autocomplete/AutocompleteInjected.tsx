import Results from "@/components/Autocomplete/Results/Results"
import { useDomEvents } from "@/hooks/useDomEvents"
import { selectors } from "@/config"
import { useAutocomplete } from "./useAutocomplete"

type Props = {
  onSubmit: (input: string) => void
}

export default function AutocompleteInjected({ onSubmit }: Props) {
  const dropdownElement = document.querySelector<HTMLElement>(selectors.dropdown)!
  const searchInput = document.querySelector<HTMLInputElement>(selectors.searchInput)!
  const searchForm = document.querySelector<HTMLFormElement>(selectors.searchForm)!

  const { input, showAutocomplete, onSearchSubmit, handleInputChange, handleFocus } = useAutocomplete({
    onSubmit,
    searchInputElement: searchInput,
    clickOutsideTarget: dropdownElement,
    isInjected: true
  })

  useDomEvents(searchInput, {
    onInput: () => handleInputChange(searchInput.value),
    onFocus: handleFocus
  })

  useDomEvents(searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  return showAutocomplete ? <Results onSubmit={onSearchSubmit} /> : null
}
