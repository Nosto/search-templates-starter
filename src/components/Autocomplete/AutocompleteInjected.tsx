import Results from "@/components/Autocomplete/Results/Results"
import { selectors } from "@/config"
import { useAutocomplete } from "./useAutocomplete"
import { SearchAnalyticsOptions } from "@nosto/nosto-js/client"
import { OnSubmitProvider } from "./OnSubmitContext"
import { useRef, useEffect } from "preact/hooks"

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

  const { input, showAutocomplete, setInput, setShowAutocomplete, onSearchSubmit, onKeyDown } = useAutocomplete({
    onSubmit,
    searchInputRef,
    clickOutsideTargetRef: dropdownRef,
    isInjected: true
  })

  useEffect(() => {
    const handleInput = () => setInput(searchInputRef.current?.value || "")
    const handleFocus = () => setShowAutocomplete(true)
    const searchInput = searchInputRef.current

    if (searchInput) {
      searchInput.addEventListener("input", handleInput)
      searchInput.addEventListener("focus", handleFocus)
      searchInput.addEventListener("keydown", onKeyDown)
    }

    return () => {
      if (searchInput) {
        searchInput.removeEventListener("input", handleInput)
        searchInput.removeEventListener("focus", handleFocus)
        searchInput.removeEventListener("keydown", onKeyDown)
      }
    }
  }, [setInput, setShowAutocomplete, onKeyDown])

  useEffect(() => {
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      onSearchSubmit(input)
    }
    const searchForm = searchFormRef.current

    if (searchForm) {
      searchForm.addEventListener("submit", handleSubmit)
    }

    return () => {
      if (searchForm) {
        searchForm.removeEventListener("submit", handleSubmit)
      }
    }
  }, [input, onSearchSubmit])

  return showAutocomplete ? (
    <OnSubmitProvider onSubmit={onSearchSubmit}>
      <Results onKeyDown={onKeyDown} />
    </OnSubmitProvider>
  ) : null
}
