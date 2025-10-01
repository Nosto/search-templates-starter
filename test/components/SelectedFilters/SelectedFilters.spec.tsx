import { render } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"

// Mock the useProductFilters hook
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useProductFilters: vi.fn()
}))

import { useProductFilters } from "@nosto/search-js/preact/hooks"

const mockUseProductFilters = vi.mocked(useProductFilters)

describe("SelectedFilters", () => {
  it("renders nothing when no filters are selected", () => {
    mockUseProductFilters.mockReturnValue({
      filters: [],
      removeAll: vi.fn()
    })

    const { container } = render(<SelectedFilters />)
    expect(container.firstChild).toBeNull()
  })

  it("displays filter name and value grouped together", () => {
    const mockRemove = vi.fn()
    mockUseProductFilters.mockReturnValue({
      filters: [
        {
          name: "Color",
          value: "red",
          field: "color",
          filter: {
            range: undefined
          },
          remove: mockRemove
        }
      ],
      removeAll: vi.fn()
    })

    const { getByRole } = render(<SelectedFilters />)

    const button = getByRole("button")
    expect(button.textContent).toBe("Color: red")
  })

  it("displays multiple filters with their names and values", () => {
    const mockRemove1 = vi.fn()
    const mockRemove2 = vi.fn()
    mockUseProductFilters.mockReturnValue({
      filters: [
        {
          name: "Color",
          value: "red",
          field: "color",
          filter: {
            range: undefined
          },
          remove: mockRemove1
        },
        {
          name: "Price Range",
          value: "50 - 150",
          field: "price",
          filter: {
            range: [
              {
                gt: undefined,
                gte: "50",
                lt: undefined,
                lte: "150"
              }
            ]
          },
          remove: mockRemove2
        }
      ],
      removeAll: vi.fn()
    })

    const { getAllByRole } = render(<SelectedFilters />)

    const buttons = getAllByRole("button")
    expect(buttons).toHaveLength(2)
    expect(buttons[0].textContent).toBe("Color: red")
    expect(buttons[1].textContent).toBe("Price Range: 50 - 150")
  })

  it("calls remove function when filter pill is clicked", () => {
    const mockRemove = vi.fn()
    mockUseProductFilters.mockReturnValue({
      filters: [
        {
          name: "Brand",
          value: "Nike",
          field: "brand",
          filter: {
            range: undefined
          },
          remove: mockRemove
        }
      ],
      removeAll: vi.fn()
    })

    const { getByRole } = render(<SelectedFilters />)

    const button = getByRole("button")
    button.click()

    expect(mockRemove).toHaveBeenCalledOnce()
  })

  it("handles undefined filter values gracefully", () => {
    mockUseProductFilters.mockReturnValue({
      filters: [
        undefined,
        {
          name: "Size",
          value: "Large",
          field: "size",
          filter: {
            range: undefined
          },
          remove: vi.fn()
        }
      ],
      removeAll: vi.fn()
    })

    const { getAllByRole, container } = render(<SelectedFilters />)

    const buttons = getAllByRole("button")
    expect(buttons).toHaveLength(1)
    expect(buttons[0].textContent).toBe("Size: Large")
    expect(container.textContent).not.toContain("undefined")
  })
})
