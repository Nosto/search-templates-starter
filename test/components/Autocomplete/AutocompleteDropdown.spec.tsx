import { describe, it, expect, vi, beforeEach } from "vitest"
import { render } from "@testing-library/preact"
import AutocompleteDropdown from "@/components/Autocomplete/AutocompleteDropdown"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { autocompleteConfig, selectors } from "@/config"

describe("AutocompleteDropdown", () => {
  beforeEach(() => {
    // Setup DOM elements that AutocompleteDropdown expects
    document.body.innerHTML = `
      <div id="dropdown"></div>
      <form id="search-form">
        <input id="search" type="text" />
      </form>
    `
  })

  it("renders without crashing when onSubmit is provided", () => {
    const mockOnSubmit = vi.fn()

    expect(() => {
      render(
        <AutocompletePageProvider config={autocompleteConfig}>
          <AutocompleteDropdown onSubmit={mockOnSubmit} />
        </AutocompletePageProvider>
      )
    }).not.toThrow()
  })

  it("initially does not show autocomplete dropdown", () => {
    const mockOnSubmit = vi.fn()

    const { container } = render(
      <AutocompletePageProvider config={autocompleteConfig}>
        <AutocompleteDropdown onSubmit={mockOnSubmit} />
      </AutocompletePageProvider>
    )

    // AutocompleteDropdown should return null when showAutocomplete is false
    expect(container.querySelector("[data-testid]")).toBeNull()
  })

  it("sets up event listeners on DOM elements", () => {
    const mockOnSubmit = vi.fn()

    render(
      <AutocompletePageProvider config={autocompleteConfig}>
        <AutocompleteDropdown onSubmit={mockOnSubmit} />
      </AutocompletePageProvider>
    )

    const searchInput = document.querySelector<HTMLInputElement>(selectors.searchInput)
    expect(searchInput).not.toBeNull()
    expect(searchInput?.getAttribute("autocomplete")).toBe("off")
  })
})
