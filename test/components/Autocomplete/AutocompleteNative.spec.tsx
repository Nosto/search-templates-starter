import { render } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import AutocompleteNative from "@/components/Autocomplete/AutocompleteNative"

// Mock the search hooks and components that depend on Nosto context
vi.mock("@nosto/search-js/preact/autocomplete", () => ({
  SearchInput: ({
    onSearchInput,
    componentProps
  }: {
    onSearchInput: (input: HTMLInputElement) => void
    componentProps: object
  }) => (
    <input {...componentProps} onInput={e => onSearchInput(e.target as HTMLInputElement)} data-testid="search-input" />
  )
}))

vi.mock("@/components/Autocomplete/SpeechToText/SpeechToText", () => ({
  default: () => <button data-testid="speech-button">🎤</button>
}))

vi.mock("@/components/Autocomplete/Results/Results", () => ({
  default: () => <div data-testid="results">Autocomplete Results</div>
}))

vi.mock("@/components/Autocomplete/useAutocomplete", () => ({
  useAutocomplete: () => ({
    input: "",
    showAutocomplete: true,
    setInput: vi.fn(),
    setShowAutocomplete: vi.fn(),
    onSearchSubmit: vi.fn(),
    onKeyDown: vi.fn()
  })
}))

describe("AutocompleteNative with Backdrop", () => {
  it("renders backdrop when autocomplete is shown", () => {
    const onSubmit = vi.fn()
    const { container } = render(<AutocompleteNative onSubmit={onSubmit} />)

    // Should have backdrop element with appropriate class
    const backdrop = container.querySelector("[aria-hidden='true']")
    expect(backdrop).toBeDefined()
    expect(backdrop?.className).toMatch(/backdrop/)
  })

  it("renders both form and backdrop elements", () => {
    const onSubmit = vi.fn()
    const { container, getByTestId } = render(<AutocompleteNative onSubmit={onSubmit} />)

    // Should have form elements
    expect(getByTestId("search-input")).toBeDefined()
    expect(getByTestId("speech-button")).toBeDefined()
    expect(getByTestId("results")).toBeDefined()

    // Should have backdrop
    const backdrop = container.querySelector("[aria-hidden='true']")
    expect(backdrop).toBeDefined()
  })
})
