import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, createPortal, useState, useEffect, useCallback } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { autocompleteConfig, categoryConfig, serpConfig } from "@/config"
import { disableNativeAutocomplete } from "@nosto/search-js/utils"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { useActions } from "@nosto/search-js/preact/hooks"
import { useAutocompleteDOMElements } from "@/hooks/useDOMElements"
import Category from "@/components/Category/Category"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import { tagging } from "@/mapping/tagging"
import { nostojs } from "@nosto/nosto-js"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import { getInitialQuery } from "@/mapping/url/getInitialQuery"
import { initializeEarlySearch } from "@/utils/earlySearchManager"

type Props = {
  onSubmit: (input: string) => void
}

function Autocomplete({ onSubmit }: Props) {
  const [input, setInput] = useState<string>(getInitialQuery())
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const { getElements } = useAutocompleteDOMElements()

  useEffect(() => {
    const elements = getElements()
    if (elements?.searchInput) {
      elements.searchInput.value = getInitialQuery()
      disableNativeAutocomplete(elements.searchInput)
    }
  }, [getElements])

  useDebouncedSearch({ input })

  // TODO convert to custom hook
  const onClickOutside = useCallback(
    (event: Event) => {
      const elements = getElements()
      if (!elements?.searchInput || !elements?.dropdownElement) return

      if (event.target !== elements.searchInput && !elements.dropdownElement.contains(event.target as Node)) {
        setShowAutocomplete(false)
      }
    },
    [getElements]
  )

  useDomEvents(showAutocomplete ? document.body : null, {
    onClick: onClickOutside
  })

  const onSearchSubmit = useCallback(
    (query: string) => {
      if (query.trim()) {
        const elements = getElements()
        if (elements?.searchInput) {
          elements.searchInput.value = query
          elements.searchInput.blur()
        }
        onSubmit(query)
        setShowAutocomplete(false)
      }
    },
    [getElements, onSubmit]
  )

  // Use effect to set up DOM event listeners after elements are available
  useEffect(() => {
    const elements = getElements()
    if (!elements?.searchInput || !elements?.searchForm) return

    const handleInput = () => setInput(elements.searchInput!.value)
    const handleFocus = () => setShowAutocomplete(true)
    const handleFormSubmit = (e: Event) => {
      e.preventDefault()
      onSearchSubmit(input)
    }

    elements.searchInput.addEventListener("input", handleInput)
    elements.searchInput.addEventListener("focus", handleFocus)
    elements.searchForm.addEventListener("submit", handleFormSubmit)

    return () => {
      elements.searchInput!.removeEventListener("input", handleInput)
      elements.searchInput!.removeEventListener("focus", handleFocus)
      elements.searchForm!.removeEventListener("submit", handleFormSubmit)
    }
  }, [getElements, input, onSearchSubmit])

  // Only render portal if dropdown element is available
  const elements = getElements()
  if (!elements?.dropdownElement) return null

  return createPortal(<>{showAutocomplete && <Results onSubmit={onSearchSubmit} />}</>, elements.dropdownElement)
}

function SerpApp() {
  const { newSearch } = useActions()

  const onSubmit = useCallback(
    (query: string) => {
      nostojs(api => api.recordSearchSubmit(query))
      newSearch({ query })
    },
    [newSearch]
  )

  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <AutocompletePageProvider config={autocompleteConfig}>
          <Autocomplete onSubmit={onSubmit} />
        </AutocompletePageProvider>
        <Serp />
      </SidebarProvider>
    </ErrorBoundary>
  )
}

function CategoryApp() {
  return (
    <ErrorBoundary>
      <CategoryPageProvider config={categoryConfig}>
        <SearchQueryHandler />
        <SidebarProvider>
          <Category />
        </SidebarProvider>
      </CategoryPageProvider>
    </ErrorBoundary>
  )
}

async function init() {
  await new Promise(nostojs)

  // Initialize early search system after Nosto SDK is ready
  initializeEarlySearch()

  const serpElement = document.querySelector<HTMLElement>("#serp")
  if (serpElement) {
    switch (tagging.pageType()) {
      case "category":
        render(<CategoryApp />, serpElement)
        break
      case "search":
      default:
        render(
          <SearchPageProvider config={serpConfig}>
            <SerpApp />
          </SearchPageProvider>,
          serpElement
        )
    }
  }
}
init()
