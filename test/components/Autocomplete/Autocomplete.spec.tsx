import { describe, it, expect, vi } from "vitest"
import { renderWithAutocompleteProvider } from "../../utils/test-utils"
import AutocompleteWrapper from "@/components/Autocomplete/Autocomplete"

// Mock the autocomplete hooks
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    useAutocomplete: () => ({
      query: "test",
      setQuery: vi.fn(),
      submit: vi.fn(),
      results: {
        products: {
          hits: [
            {
              productId: "1",
              name: "Test Product",
              imageUrl: "https://example.com/image.jpg",
              price: 29.99,
              priceText: "$29.99"
            }
          ]
        },
        suggestions: [
          { suggestion: "test product", matched: "test" },
          { suggestion: "test item", matched: "test" }
        ]
      }
    })
  }
})

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
