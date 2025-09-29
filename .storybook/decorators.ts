import { h } from "preact"
import { mockAutocompleteState, mockConfig, mockInitialState } from "@mocks/mocks"
import { createStore } from "@nosto/search-js/preact/common"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { StoryFn } from "@storybook/preact-vite"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { SidebarProvider } from "@/contexts/SidebarContext"

/**
 * A decorator that wraps a story in a SearchPageProvider with mock data.
 */
export function withSearchContext(story: StoryFn) {
  return h(SearchPageProvider, {
    config: mockConfig,
    store: createStore(mockInitialState),
    children: h(story, {})
  })
}

/**
 * A decorator that wraps a story in an AutocompletePageProvider with mock data.
 */
export function withAutocompleteContext(story: StoryFn) {
  return h(AutocompletePageProvider, {
    config: mockConfig,
    store: createStore(mockAutocompleteState),
    children: h(story, {})
  })
}

/**
 * A decorator that wraps a story in a SidebarProvider.
 */
export function withSidebarContext(story: StoryFn) {
  return h(SidebarProvider, {
    children: h(story, {})
  })
}

/**
 * A decorator that wraps a story in a container div with a fixed width.
 */
export function withContainer(story: StoryFn) {
  return h("div", { style: "width: 600px", children: h(story, {}) })
}
