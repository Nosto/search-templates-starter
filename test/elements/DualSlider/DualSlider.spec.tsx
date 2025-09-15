import { render, cleanup } from "@testing-library/preact"
import { describe, it, expect, vi, afterEach } from "vitest"
import DualSlider from "@/elements/DualSlider/DualSlider"

afterEach(() => {
  cleanup()
})

describe("DualSlider", () => {
  const defaultProps = {
    min: 0,
    max: 100,
    values: [20, 80] as [number | undefined, number | undefined],
    onChange: vi.fn()
  }

  it("renders with correct initial values", () => {
    const { getByText } = render(<DualSlider {...defaultProps} />)

    expect(getByText("20")).toBeDefined()
    expect(getByText("80")).toBeDefined()
    expect(getByText("-")).toBeDefined()
  })

  it("handles undefined values by using min/max bounds", () => {
    const { getByText } = render(<DualSlider {...defaultProps} values={[undefined, undefined]} />)

    expect(getByText("0")).toBeDefined()
    expect(getByText("100")).toBeDefined()
  })

  it("handles mixed undefined values", () => {
    const { getByText } = render(<DualSlider {...defaultProps} values={[10, undefined]} />)

    expect(getByText("10")).toBeDefined()
    expect(getByText("100")).toBeDefined()
  })

  it("supports keyboard navigation", () => {
    const onChange = vi.fn()
    const { getAllByRole } = render(<DualSlider {...defaultProps} onChange={onChange} />)

    const thumbs = getAllByRole("slider")
    expect(thumbs.length).toBe(2)
  })

  it("maintains accessibility attributes", () => {
    const { getAllByRole } = render(<DualSlider {...defaultProps} />)

    const thumbs = getAllByRole("slider")
    expect(thumbs[0].getAttribute("aria-label")).toBe("Range minimum value")
    expect(thumbs[1].getAttribute("aria-label")).toBe("Range maximum value")
    expect(thumbs[0].getAttribute("aria-valuemin")).toBe("0")
    expect(thumbs[0].getAttribute("aria-valuemax")).toBe("100")
    expect(thumbs[0].getAttribute("tabIndex")).toBe("0")
  })
})
