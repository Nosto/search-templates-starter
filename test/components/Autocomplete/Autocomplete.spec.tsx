import { cleanup, render, fireEvent } from "@testing-library/preact"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import Autocomplete from "@/components/Autocomplete/Autocomplete"

// Mock the Nosto hooks
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useActions: () => ({
    newSearch: vi.fn()
  })
}))

// Mock the SearchInput component
vi.mock("@nosto/search-js/preact/autocomplete", () => ({
  SearchInput: ({
    onSearchInput,
    componentProps
  }: {
    onSearchInput?: (target: { value: string }) => void
    componentProps?: { onFocus?: () => void; onBlur?: () => void }
  }) => (
    <input
      data-testid="search-input"
      onChange={e => onSearchInput?.(e.target as HTMLInputElement)}
      onFocus={componentProps?.onFocus}
      onBlur={componentProps?.onBlur}
    />
  )
}))

// Mock the Products component
vi.mock("@/components/Autocomplete/Products/Products", () => ({
  default: () => <div data-testid="autocomplete-products">Products</div>
}))

afterEach(() => {
  cleanup()
})

describe("Autocomplete", () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it("shows autocomplete on focus", () => {
    const { getByTestId, queryByTestId } = render(<Autocomplete onSubmit={mockOnSubmit} />)

    // Initially autocomplete should not be visible
    expect(queryByTestId("autocomplete-products")).toBeNull()

    // Focus the input
    const input = getByTestId("search-input")
    fireEvent.focus(input)

    // Autocomplete should now be visible
    expect(queryByTestId("autocomplete-products")).toBeTruthy()
  })

  it("closes autocomplete when clicking outside", () => {
    const { getByTestId, queryByTestId } = render(<Autocomplete onSubmit={mockOnSubmit} />)

    // Focus the input to show autocomplete
    const input = getByTestId("search-input")
    fireEvent.focus(input)
    expect(queryByTestId("autocomplete-products")).toBeTruthy()

    // Click outside the component (on document body)
    fireEvent.click(document.body)

    // Autocomplete should be hidden
    expect(queryByTestId("autocomplete-products")).toBeNull()
  })

  it("keeps autocomplete open when clicking inside component", () => {
    const { getByTestId, queryByTestId } = render(<Autocomplete onSubmit={mockOnSubmit} />)

    // Focus the input to show autocomplete
    const input = getByTestId("search-input")
    fireEvent.focus(input)
    expect(queryByTestId("autocomplete-products")).toBeTruthy()

    // Click on the input (inside component)
    fireEvent.click(input)

    // Autocomplete should still be visible
    expect(queryByTestId("autocomplete-products")).toBeTruthy()
  })

  it("keeps autocomplete open when clicking on products", () => {
    const { getByTestId, queryByTestId } = render(<Autocomplete onSubmit={mockOnSubmit} />)

    // Focus the input to show autocomplete
    const input = getByTestId("search-input")
    fireEvent.focus(input)
    expect(queryByTestId("autocomplete-products")).toBeTruthy()

    // Click on the products component
    const products = getByTestId("autocomplete-products")
    fireEvent.click(products)

    // Autocomplete should still be visible
    expect(queryByTestId("autocomplete-products")).toBeTruthy()
  })

  it("submits search when form is submitted", () => {
    const { getByTestId, container } = render(<Autocomplete onSubmit={mockOnSubmit} />)

    // Type in the input
    const input = getByTestId("search-input")
    fireEvent.change(input, { target: { value: "test query" } })

    // Submit the form
    const form = container.querySelector("form")!
    fireEvent.submit(form)

    // Verify onSubmit was called with the input value
    expect(mockOnSubmit).toHaveBeenCalledWith("test query")
  })
})
