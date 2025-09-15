import { render } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import Autocomplete from "@/components/Autocomplete/Autocomplete"

// Mock the Nosto search hooks and components
vi.mock("@nosto/search-js/preact/autocomplete", () => ({
  SearchInput: ({
    componentProps,
    onSearchInput
  }: {
    componentProps?: Record<string, unknown>
    onSearchInput?: (target: HTMLInputElement) => void
  }) => <input type="text" {...componentProps} onChange={e => onSearchInput?.(e.target as HTMLInputElement)} />
}))

vi.mock("@/hooks/useDomEvents", () => ({
  useDomEvents: vi.fn()
}))

vi.mock("@/hooks/useDebouncedSearch", () => ({
  useDebouncedSearch: vi.fn()
}))

vi.mock("@/components/Autocomplete/Results/Results", () => ({
  default: () => <div data-testid="results">Results</div>
}))

describe("Autocomplete", () => {
  it("should disable native autocomplete on the search input", () => {
    const mockOnSubmit = vi.fn()

    const { container } = render(<Autocomplete onSubmit={mockOnSubmit} />)

    const input = container.querySelector("input")
    expect(input).toBeTruthy()
    expect(input?.getAttribute("autocomplete")).toBe("off")
  })

  it("should render search button", () => {
    const mockOnSubmit = vi.fn()

    const { getByRole } = render(<Autocomplete onSubmit={mockOnSubmit} />)

    const button = getByRole("button", { name: /search/i })
    expect(button).toBeTruthy()
  })
})
