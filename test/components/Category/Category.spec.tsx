import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import { CategoryBody } from "@/components/Category/Category"

// Mock the components that CategoryBody uses
vi.mock("@/components/Products/Products", () => ({
  default: () => <div data-testid="products">Products Component</div>
}))

vi.mock("@/components/Toolbar/Toolbar", () => ({
  default: () => <div data-testid="toolbar">Toolbar Component</div>
}))

vi.mock("@/components/SelectedFilters/SelectedFilters", () => ({
  default: () => <div data-testid="selected-filters">SelectedFilters Component</div>
}))

vi.mock("@/components/BottomToolbar/BottomToolbar", () => ({
  default: () => <div data-testid="bottom-toolbar">BottomToolbar Component</div>
}))

vi.mock("@/components/NoResults/NoResults", () => ({
  default: () => <div data-testid="no-results">NoResults Component</div>
}))

vi.mock("@/elements/Loader/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>
}))

describe("Category CategoryBody Component", () => {
  it("renders loader when loading", () => {
    const { container } = renderWithSearchProvider(<CategoryBody loading={true} foundProducts={false} />)

    expect(container.textContent).toContain("Loading...")
  })

  it("renders products content when not loading and products found", () => {
    const { container } = renderWithSearchProvider(<CategoryBody loading={false} foundProducts={true} />)

    expect(container.textContent).toContain("Products Component")
    expect(container.textContent).toContain("Toolbar Component")
    expect(container.textContent).toContain("SelectedFilters Component")
    expect(container.textContent).toContain("BottomToolbar Component")
  })

  it("renders no results when not loading and no products found", () => {
    const { container } = renderWithSearchProvider(<CategoryBody loading={false} foundProducts={false} />)

    expect(container.textContent).toContain("NoResults Component")
  })
})
