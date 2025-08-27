import type { Preview } from "@storybook/preact-vite"
import { h } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { createStore } from "@nosto/search-js/preact/common"
import { mockConfig, mockInitialState } from "../test/utils/mocks"
import "../src/variable.css"

export default {
  decorators: [
    Story =>
      h(SearchPageProvider, {
        config: mockConfig,
        store: createStore(mockInitialState),
        children: h(Story, {})
      })
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
} as Preview
