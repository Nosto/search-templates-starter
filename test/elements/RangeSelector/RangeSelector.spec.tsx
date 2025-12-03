import { render, fireEvent } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import RangeSelector from "@/elements/RangeSelector/RangeSelector"
import * as hooks from "@nosto/search-js/preact/hooks"

vi.mock("@nosto/search-js/preact/hooks", () => ({
  useRangeSelector: vi.fn()
}))

describe("RangeSelector", () => {
  const mockFacet = {
    id: "price",
    name: "Price",
    field: "price",
    type: "stats" as const,
    min: 0,
    max: 500
  }

  const mockUpdateRange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(hooks.useRangeSelector).mockReturnValue({
      min: 0,
      max: 500,
      range: [0, 500],
      updateRange: mockUpdateRange,
      ranges: [
        { min: 0, max: 83, selected: false },
        { min: 83, max: 166, selected: false },
        { min: 166, max: 249, selected: false },
        { min: 249, max: 332, selected: false },
        { min: 332, max: 415, selected: false },
        { min: 415, max: 500, selected: false }
      ],
      handleMinChange: vi.fn(),
      handleMaxChange: vi.fn(),
      isSelected: false
    })
  })

  it("renders with facet name", () => {
    const { getByText } = render(<RangeSelector facet={mockFacet} />)
    expect(getByText("Price")).toBeTruthy()
  })

  it("generates default buckets when none provided", () => {
    const { container } = render(<RangeSelector facet={mockFacet} />)
    const checkboxes = container.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBe(6)
  })

  it("uses custom buckets when provided", () => {
    const customBuckets = [
      { min: 0, max: 100, label: "£0 - £100" },
      { min: 100, max: 200, label: "£100 - £200" }
    ]

    const { getByText } = render(<RangeSelector facet={mockFacet} buckets={customBuckets} />)
    expect(getByText("£0 - £100")).toBeTruthy()
    expect(getByText("£100 - £200")).toBeTruthy()
  })

  it("expands when anchor button is clicked", () => {
    const { getByRole, container } = render(<RangeSelector facet={mockFacet} />)
    const button = getByRole("button", { name: /expand price range selector/i })

    fireEvent.click(button)

    const menu = container.querySelector('[id="price-range-menu"]')
    expect(menu).toBeTruthy()
    expect(button.getAttribute("aria-expanded")).toBe("true")
  })

  it("calls updateRange when a bucket is selected", () => {
    const customBuckets = [{ min: 0, max: 100, label: "£0 - £100" }]

    const { getByText } = render(<RangeSelector facet={mockFacet} buckets={customBuckets} />)

    const checkbox = getByText("£0 - £100")
    fireEvent.click(checkbox)

    expect(mockUpdateRange).toHaveBeenCalledWith([0, 100])
  })

  it("shows selected count when a bucket is selected", () => {
    vi.mocked(hooks.useRangeSelector).mockReturnValue({
      min: 0,
      max: 500,
      range: [0, 100],
      updateRange: mockUpdateRange,
      ranges: [{ min: 0, max: 100, selected: true }],
      handleMinChange: vi.fn(),
      handleMaxChange: vi.fn(),
      isSelected: true
    })

    const customBuckets = [{ min: 0, max: 100, label: "£0 - £100" }]

    const { getByText } = render(<RangeSelector facet={mockFacet} buckets={customBuckets} />)
    expect(getByText("1")).toBeTruthy()
  })

  it("deselects bucket when clicking a selected bucket", () => {
    vi.mocked(hooks.useRangeSelector).mockReturnValue({
      min: 0,
      max: 500,
      range: [0, 100],
      updateRange: mockUpdateRange,
      ranges: [{ min: 0, max: 100, selected: true }],
      handleMinChange: vi.fn(),
      handleMaxChange: vi.fn(),
      isSelected: true
    })

    const customBuckets = [{ min: 0, max: 100, label: "£0 - £100" }]

    const { getByText } = render(<RangeSelector facet={mockFacet} buckets={customBuckets} />)

    const checkbox = getByText("£0 - £100")
    fireEvent.click(checkbox)

    expect(mockUpdateRange).toHaveBeenCalledWith([undefined, undefined])
  })
})
