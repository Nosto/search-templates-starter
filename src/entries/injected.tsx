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
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import Category from "@/components/Category/Category"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import { tagging } from "@/mapping/tagging"
import { nostojs } from "@nosto/nosto-js"

type Props = {
  onSubmit: (input: string) => void
}

function Autocomplete({ onSubmit }: Props) {
  // Get the current query from the app state
  const query = useNostoAppState(state => state.query?.query || "")

  // Initialize input from URL parameters or app state
  const [input, setInput] = useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('q') || query || ""
  })
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)

  // TODO: wait for elements is missing
  const dropdownElement = document.querySelector<HTMLElement>("#dropdown")
  const searchInput = document.querySelector<HTMLInputElement>("#search")
  const searchForm = document.querySelector<HTMLFormElement>("#search-form")

  if (!dropdownElement || !searchInput || !searchForm) {
    console.error('Required DOM elements not found!')
    return null
  }

  useEffect(() => {
    disableNativeAutocomplete(searchInput)
    searchInput.value = input
  }, [searchInput, input])

  // Show autocomplete when input has sufficient length
  useEffect(() => {
    if (input.length >= 3) {
      setShowAutocomplete(true)
    } else {
      setShowAutocomplete(false)
    }
  }, [input])

  // Sync input state with query from app state when it changes
  useEffect(() => {
    if (query && query !== input) {
      setInput(query)
    }
  }, [query, input])

  // Monitor DOM input changes and sync with React state
  useEffect(() => {
    const handleInput = () => {
      const newValue = searchInput.value
      if (newValue !== input) {
        setInput(newValue)
      }
    }
    
    const handleFocus = () => {
      if (searchInput.value.length >= 3) {
        setShowAutocomplete(true)
      }
    }
    
    searchInput.addEventListener('input', handleInput)
    searchInput.addEventListener('focus', handleFocus)
    
    return () => {
      searchInput.removeEventListener('input', handleInput)
      searchInput.removeEventListener('focus', handleFocus)
    }
  }, [searchInput, input])

  useDebouncedSearch({ input })

  // TODO convert to custom hook
  const onClickOutside = useCallback(
    (event: Event) => {
      if (event.target !== searchInput && !dropdownElement.contains(event.target as Node)) {
        setShowAutocomplete(false)
      }
    },
    [searchInput, dropdownElement]
  )

  useDomEvents(showAutocomplete ? document.body : null, {
    onClick: onClickOutside
  })

  const onSearchSubmit = (query: string) => {
    if (query.trim()) {
      searchInput.value = query
      searchInput.blur()
      onSubmit(query)
      setShowAutocomplete(false)
    }
  }

  useDomEvents(searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  return createPortal(
    <>{showAutocomplete && <Results onSubmit={onSearchSubmit} />}</>, 
    dropdownElement
  )
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
    <>
      <SearchQueryHandler />
      <SidebarProvider>
        <AutocompletePageProvider config={autocompleteConfig}>
          <Autocomplete onSubmit={onSubmit} />
        </AutocompletePageProvider>
        <Serp />
      </SidebarProvider>
    </>
  )
}

function CategoryApp() {
  return (
    <CategoryPageProvider config={categoryConfig}>
      <SearchQueryHandler />
      <SidebarProvider>
        <Category />
      </SidebarProvider>
    </CategoryPageProvider>
  )
}

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
