import { h } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { mockConfig, mockInitialState } from "./utils/mocks"
import { createStore } from "@nosto/search-js/preact/common"
import { Meta, StoryObj } from "@storybook/preact-vite"

export function wrapStory<T>(story: StoryObj<T>, meta: Meta<T>) {
  return h(SearchPageProvider, {
    config: mockConfig,
    store: createStore(mockInitialState),
    children: story.render
      ? // @ts-expect-error expected
        story.render(null, { ...story })
      : meta.component && h(meta.component, { ...story.args })
  })
}
