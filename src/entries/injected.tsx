import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { render, useState, useEffect, useCallback } from "preact/compat"
import Serp from "@/components/Serp/Serp"
import "@/variable.css"
import Results from "@/components/Autocomplete/Results/Results"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { autocompleteConfig, categoryConfig, serpConfig } from "@/config"
import { disableNativeAutocomplete } from "@nosto/search-js/utils"
import { useDomEvents } from "@/hooks/useDomEvents"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { useActions, useHistory } from "@nosto/search-js/preact/hooks"
import Category from "@/components/Category/Category"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"
import { tagging } from "@/mapping/tagging"
import { nostojs } from "@nosto/nosto-js"
import { ErrorBoundary } from "@nosto/search-js/preact/common"
import { getInitialQuery } from "@/mapping/url/getInitialQuery"
import Portal from "@/elements/Portal/Portal"

type Props = {
  onSubmit: (input: string) => void
}

function Autocomplete({ onSubmit }: Props) {
  const [input, setInput] = useState<string>(getInitialQuery())
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)

  // TODO: wait for elements is missing
  const dropdownElement = document.querySelector<HTMLElement>("#dropdown")!
  const searchInput = document.querySelector<HTMLInputElement>("#search")!
  const searchForm = document.querySelector<HTMLFormElement>("#search-form")!

  useEffect(() => {
    searchInput.value = getInitialQuery()
    disableNativeAutocomplete(searchInput)
  }, [searchInput])

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

  useDomEvents(searchInput, {
    onInput: () => setInput(searchInput.value),
    onFocus: () => setShowAutocomplete(true)
  })

  const { addQuery } = useHistory()

  const onSearchSubmit = (query: string) => {
    if (!query.trim()) {
      return
    }

    addQuery(query)
    searchInput.value = query
    searchInput.blur()
    onSubmit(query)
    setShowAutocomplete(false)
  }

  useDomEvents(searchForm, {
    onSubmit: e => {
      e.preventDefault()
      onSearchSubmit(input)
    }
  })

  return showAutocomplete ? <Results onSubmit={onSearchSubmit} /> : null
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
          <Portal target="#dropdown">
            <Autocomplete onSubmit={onSubmit} />
          </Portal>
        </AutocompletePageProvider>
        <Portal target="#serp">
          <Serp />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

function CategoryApp() {
  return (
    <ErrorBoundary>
      <SearchQueryHandler />
      <SidebarProvider>
        <Portal target="#serp">
          <Category />
        </Portal>
      </SidebarProvider>
    </ErrorBoundary>
  )
}

async function init() {
  await new Promise(nostojs)
  const dummy = document.createElement("div")
  switch (tagging.pageType()) {
    case "category":
      render(
        <CategoryPageProvider config={categoryConfig}>
          <CategoryApp />
        </CategoryPageProvider>,
        dummy
      )
      break
    case "search":
    default:
      render(
        <SearchPageProvider config={serpConfig}>
          <SerpApp />
        </SearchPageProvider>,
        dummy
      )
  }
}
init()
