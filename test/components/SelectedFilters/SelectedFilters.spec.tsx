import { describe, it, expect } from "vitest"
import { render } from "preact"
import { h } from "preact"
import * as SelectedFiltersStories from "../../../src/components/SelectedFilters/SelectedFilters.stories"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { createStore } from "@nosto/search-js/preact/common"
import { mockConfig, mockInitialState } from "../../utils/mocks"

describe("SelectedFilters Stories", () => {
  it("renders Default story without errors", () => {
    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(SearchPageProvider, {
      config: mockConfig,
      store: createStore(mockInitialState),
      children: SelectedFiltersStories.Default.render()
    })
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })
})
