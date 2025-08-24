import { describe, it, expect, vi } from "vitest"
import { renderWithAutocompleteProvider } from "../../utils/test-utils"
import AutocompleteWrapper from "@/components/Autocomplete/Autocomplete"

describe("Autocomplete Component", () => {
  const mockOnSubmit = vi.fn()

  it("renders autocomplete container", () => {
    const { container } = renderWithAutocompleteProvider(<AutocompleteWrapper onSubmit={mockOnSubmit} />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders search input", () => {
    const { container } = renderWithAutocompleteProvider(<AutocompleteWrapper onSubmit={mockOnSubmit} />)

    const input = container.querySelector("input")
    expect(input).toBeTruthy()
  })

  it("renders search button", () => {
    const { container } = renderWithAutocompleteProvider(<AutocompleteWrapper onSubmit={mockOnSubmit} />)

    const button = container.querySelector("button")
    expect(button).toBeTruthy()
    expect(button?.textContent).toContain("Search")
  })
})
