import type { ComponentChildren } from "preact"
import type { SearchQuery } from "@nosto/nosto-js/client"
import { vi } from "vitest"
import { mockNostojs } from "@nosto/nosto-js/testing"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { createStore } from "@nosto/search-js/preact/common"
import { mockAutocompleteState, mockConfig } from "@mocks/mocks"

export function setupAutocompleteSearch() {
  const search = vi.fn((query: SearchQuery) =>
    Promise.resolve({
      query: query.query,
      products: { from: 0, size: 0, total: 0, hits: [] }
    })
  )
  mockNostojs({ search })

  const store = createStore(mockAutocompleteState)
  const wrapper = ({ children }: { children: ComponentChildren }) => (
    <AutocompletePageProvider config={mockConfig} store={store}>
      {children}
    </AutocompletePageProvider>
  )

  return { search, wrapper }
}
