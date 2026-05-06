import { render, fireEvent } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import RangeSelector from "@/components/FilterSidebar/RangeSelector/RangeSelector"
import * as hooks from "@nosto/search-js/preact/hooks"
import { SearchStatsFacet } from "@nosto/nosto-js/client"

vi.mock("@nosto/search-js/preact/hooks", () => ({
  useActions: vi.fn(),
  useRangeSelector: vi.fn()
}))

describe("RangeSelector", () => {
  const mockFacet: SearchStatsFacet = {
    id: "price",
    name: "Price",
    field: "price",
    type: "stats",
    min: 0,
    max: 200
  }

  const mockUpdateRange = vi.fn()
  const mockReplaceFilter = vi.fn()

  beforeEach(() => {
    mockUpdateRange.mockClear()
    mockReplaceFilter.mockClear()

    vi.mocked(hooks.useActions).mockReturnValue({
      newSearch: vi.fn(),
      updateSearch: vi.fn(),
      toggleProductFilter: vi.fn(),
      replaceFilter: mockReplaceFilter
    })

    vi.mocked(hooks.useRangeSelector).mockReturnValue({
      min: 0,
      max: 200,
      range: [0, 100],
      ranges: [
        { min: 0, max: 100, selected: true },
        { min: 100, max: 200, selected: false }
      ],
      updateRange: mockUpdateRange,
      handleMinChange: vi.fn(),
      handleMaxChange: vi.fn(),
      isSelected: true
    })
  })

  it("removes the range filter when the selected range changes", () => {
    const { getByLabelText } = render(<RangeSelector facet={mockFacet} defaultActive />)

    fireEvent.click(getByLabelText("0 - 100"))

    expect(mockReplaceFilter).toHaveBeenCalledWith("price", undefined)
    expect(mockUpdateRange).not.toHaveBeenCalled()
  })

  it("updates the range when an unselected range changes", () => {
    const { getByLabelText } = render(<RangeSelector facet={mockFacet} defaultActive />)

    fireEvent.click(getByLabelText("100 - 200"))

    expect(mockUpdateRange).toHaveBeenCalledWith([100, 200])
    expect(mockReplaceFilter).not.toHaveBeenCalled()
  })
})
