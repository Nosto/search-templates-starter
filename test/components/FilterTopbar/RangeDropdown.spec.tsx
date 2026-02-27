import { render, fireEvent } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import RangeDropdown from "@/components/FilterTopbar/RangeDropdown/RangeDropdown"
import * as hooks from "@nosto/search-js/preact/hooks"
import { SearchStatsFacet } from "@nosto/nosto-js/client"

vi.mock("@nosto/search-js/preact/hooks", () => ({
  useRange: vi.fn()
}))

describe("RangeDropdown", () => {
  const mockFacet: SearchStatsFacet = {
    id: "price",
    name: "Price",
    field: "price",
    type: "stats",
    min: 10,
    max: 500
  }

  let mockUpdateRange: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockUpdateRange = vi.fn()
    vi.mocked(hooks.useRange).mockReturnValue({
      min: 10,
      max: 500,
      range: [10, 500],
      updateRange: mockUpdateRange,
      active: false,
      toggleActive: vi.fn()
    })
  })

  describe("constraint validation when applying filter", () => {
    it("applies values within bounds without modification", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "50" } })
      fireEvent.change(maxInput, { target: { value: "300" } })

      fireEvent.click(getByText("Apply"))

      expect(mockUpdateRange).toHaveBeenCalledWith([50, 300])
    })

    it("clamps localMin to min boundary when below", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "5" } })
      fireEvent.change(maxInput, { target: { value: "300" } })

      fireEvent.click(getByText("Apply"))

      expect(mockUpdateRange).toHaveBeenCalledWith([10, 300])
    })

    it("clamps localMax to max boundary when above", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "50" } })
      fireEvent.change(maxInput, { target: { value: "600" } })

      fireEvent.click(getByText("Apply"))

      expect(mockUpdateRange).toHaveBeenCalledWith([50, 500])
    })

    it("clamps both values when outside bounds", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "0" } })
      fireEvent.change(maxInput, { target: { value: "1000" } })

      fireEvent.click(getByText("Apply"))

      expect(mockUpdateRange).toHaveBeenCalledWith([10, 500])
    })

    it("handles inverted range where localMin > localMax", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "400" } })
      fireEvent.change(maxInput, { target: { value: "100" } })

      fireEvent.click(getByText("Apply"))

      expect(mockUpdateRange).toHaveBeenCalledWith([100, 400])
    })

    it("handles inverted range with values outside bounds", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "600" } })
      fireEvent.change(maxInput, { target: { value: "5" } })

      fireEvent.click(getByText("Apply"))

      expect(mockUpdateRange).toHaveBeenCalledWith([10, 500])
    })

    it("handles edge case where both values equal min", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "10" } })
      fireEvent.change(maxInput, { target: { value: "10" } })

      fireEvent.click(getByText("Apply"))

      expect(mockUpdateRange).toHaveBeenCalledWith([10, 10])
    })

    it("handles edge case where both values equal max", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "500" } })
      fireEvent.change(maxInput, { target: { value: "500" } })

      fireEvent.click(getByText("Apply"))

      expect(mockUpdateRange).toHaveBeenCalledWith([500, 500])
    })
  })

  describe("dropdown behavior", () => {
    it("opens dropdown when trigger is clicked", () => {
      const { getByText, container } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const menu = container.querySelector('[role="menu"]')
      expect(menu).toBeTruthy()
    })

    it("closes dropdown after applying filter", () => {
      const { getByText, container } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      let menu = container.querySelector('[role="menu"]')
      expect(menu).toBeTruthy()

      fireEvent.click(getByText("Apply"))

      menu = container.querySelector('[role="menu"]')
      expect(menu).toBeFalsy()
    })

    it("updates local state when inputs change", () => {
      const { getByText, getByPlaceholderText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByPlaceholderText("From") as HTMLInputElement
      const maxInput = getByPlaceholderText("To") as HTMLInputElement

      fireEvent.change(minInput, { target: { value: "100" } })
      fireEvent.change(maxInput, { target: { value: "200" } })

      expect(minInput.value).toBe("100")
      expect(maxInput.value).toBe("200")
    })
  })

  describe("accessibility", () => {
    it("has proper aria-label for inputs", () => {
      const { getByText, getByLabelText } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const minInput = getByLabelText("Minimum Price")
      const maxInput = getByLabelText("Maximum Price")

      expect(minInput).toBeTruthy()
      expect(maxInput).toBeTruthy()
    })

    it("has role=menu for dropdown menu", () => {
      const { getByText, container } = render(<RangeDropdown facet={mockFacet} />)

      fireEvent.click(getByText("Price"))

      const menu = container.querySelector('[role="menu"]')
      expect(menu).toBeTruthy()
    })
  })
})
