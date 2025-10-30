import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/preact"
import { OnSubmitProvider, useOnSubmit } from "@/components/Autocomplete/OnSubmitContext"

function TestConsumer() {
  const onSubmit = useOnSubmit()
  return (
    <button onClick={() => onSubmit("test query")} type="button">
      Submit
    </button>
  )
}

describe("OnSubmitContext", () => {
  it("provides onSubmit function to child components", () => {
    const mockOnSubmit = vi.fn()

    render(
      <OnSubmitProvider onSubmit={mockOnSubmit}>
        <TestConsumer />
      </OnSubmitProvider>
    )

    const button = screen.getByRole("button", { name: "Submit" })
    button.click()

    expect(mockOnSubmit).toHaveBeenCalledWith("test query")
  })

  it("throws error when useOnSubmit is used outside provider", () => {
    expect(() => {
      render(<TestConsumer />)
    }).toThrow("useOnSubmit must be used within an OnSubmitProvider")
  })

  it("passes analytics options to onSubmit", () => {
    const mockOnSubmit = vi.fn()

    function TestConsumerWithOptions() {
      const onSubmit = useOnSubmit()
      return (
        <button onClick={() => onSubmit("test query", { isKeyword: true })} type="button">
          Submit
        </button>
      )
    }

    render(
      <OnSubmitProvider onSubmit={mockOnSubmit}>
        <TestConsumerWithOptions />
      </OnSubmitProvider>
    )

    const button = screen.getByRole("button", { name: "Submit" })
    button.click()

    expect(mockOnSubmit).toHaveBeenCalledWith("test query", { isKeyword: true })
  })
})
