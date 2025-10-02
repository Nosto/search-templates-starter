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
import Category from "@/components/Category/Category"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import { tagging } from "@/mapping/tagging"
import { nostojs } from "@nosto/nosto-js"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import { getInitialQuery } from "@/mapping/url/getInitialQuery"
import { waitForElement, waitForElements } from "@/utils/waitForElement"

type Props = {
  onSubmit: (input: string) => void
}

function Autocomplete({ onSubmit }: Props) {
  const [input, setInput] = useState<string>(getInitialQuery())
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const [elements, setElements] = useState<{
    dropdownElement: HTMLElement | null
    searchInput: HTMLInputElement | null
    searchForm: HTMLFormElement | null
  }>({
    dropdownElement: null,
    searchInput: null,
    searchForm: null
  })

  useEffect(() => {
    const loadElements = async () => {
      try {
        const [dropdownElement, searchInput, searchForm] = await waitForElements<HTMLElement>([
          "#dropdown",
          "#search",
          "#search-form"
        ])
        setElements({
          dropdownElement,
          searchInput: searchInput as HTMLInputElement,
          searchForm: searchForm as HTMLFormElement
        })
      } catch (error) {
        console.error("Failed to load required elements:", error)
      }
    }
    loadElements()
  }, [])

  useEffect(() => {
    if (elements.searchInput) {
      elements.searchInput.value = getInitialQuery()
      disableNativeAutocomplete(elements.searchInput)
    }
  }, [elements.searchInput])

  useDebouncedSearch({ input })

  // TODO convert to custom hook
  const onClickOutside = useCallback(
    (event: Event) => {
      if (
        elements.searchInput &&
        elements.dropdownElement &&
        event.target !== elements.searchInput &&
        !elements.dropdownElement.contains(event.target as Node)
      ) {
        setShowAutocomplete(false)
      }
    },
    [elements.searchInput, elements.dropdownElement]
  )

  useDomEvents(showAutocomplete ? document.body : null, {
    onClick: onClickOutside
  })

  useDomEvents(elements.searchInput, {
    onInput: () => elements.searchInput && setInput(elements.searchInput.value),
    onFocus: () => setShowAutocomplete(true)
  })

  const onSearchSubmit = (query: string) => {
    if (query.trim() && elements.searchInput) {
      elements.searchInput.value = query
      elements.searchInput.blur()
      onSubmit(query)
      setShowAutocomplete(false)
    }
  }

  useDomEvents(elements.searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  return elements.dropdownElement
    ? createPortal(<>{showAutocomplete && <Results onSubmit={onSearchSubmit} />}</>, elements.dropdownElement)
    : null
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
  try {
    const serpElement = await waitForElement<HTMLElement>("#serp")
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
  } catch (error) {
    console.error("Failed to find #serp element:", error)
  }
}
init()
