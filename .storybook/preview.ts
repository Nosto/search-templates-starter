import type { Preview } from "@storybook/preact-vite"
import { h } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"

// Mock config for Storybook that provides search context
const mockConfig = {
  defaultCurrency: "EUR",
  search: {
    hitDecorators: []
  }
}

const mockInitialState = {
  search: {
    query: "",
    filters: [],
    sort: { field: "_score", order: "desc" }
  },
  products: {
    from: 1,
    size: 24,
    total: 142,
    hits: []
  }
}

const preview: Preview = {
  decorators: [Story => h(SearchPageProvider, { config: mockConfig, initialState: mockInitialState }, h(Story))],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
