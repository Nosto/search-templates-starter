import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import { AutocompleteContextProvider, useAutocompleteContext } from "@/components/Autocomplete/AutocompleteContext"

describe("AutocompleteContext", () => {
  it("provides onSubmit handler to children", () => {
    const mockOnSubmit = () => {}
    let contextValue: ReturnType<typeof useAutocompleteContext> | undefined

    function TestComponent() {
      contextValue = useAutocompleteContext()
      return null
    }

    render(
      <AutocompleteContextProvider onSubmit={mockOnSubmit}>
        <TestComponent />
      </AutocompleteContextProvider>
    )

    expect(contextValue).toBeDefined()
    expect(contextValue?.onSubmit).toBe(mockOnSubmit)
  })

  it("throws error when used outside of provider", () => {
    function TestComponent() {
      useAutocompleteContext()
      return null
    }

    expect(() => {
      render(<TestComponent />)
    }).toThrow("useAutocompleteContext must be used within an AutocompleteContextProvider")
  })
})
