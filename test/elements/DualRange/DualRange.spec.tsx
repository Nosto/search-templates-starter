import { render } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import DualRange from "@/elements/DualRange/DualRange"

describe("DualRange", () => {
  it("renders with slider elements", () => {
    const onChange = vi.fn()
    const { container } = render(<DualRange min={0} max={100} value={[undefined, undefined]} onChange={onChange} />)

    const sliders = container.querySelectorAll('[role="slider"]')
    expect(sliders.length).toBe(2)
  })

  it("displays correct values in labels", () => {
    const onChange = vi.fn()
    const { container } = render(<DualRange min={10} max={100} value={[25, 75]} onChange={onChange} />)

    expect(container.textContent).toContain("25")
    expect(container.textContent).toContain("75")
  })

  it("uses min/max values when value is undefined", () => {
    const onChange = vi.fn()
    const { container } = render(<DualRange min={5} max={95} value={[undefined, undefined]} onChange={onChange} />)

    expect(container.textContent).toContain("5")
    expect(container.textContent).toContain("95")
  })
})
