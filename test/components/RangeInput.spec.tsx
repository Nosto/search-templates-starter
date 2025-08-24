import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import RangeInput from "../../src/elements/RangeInput/RangeInput"

describe("RangeInput component", () => {
  it("renders as range input by default", () => {
    const { container } = render(<RangeInput />)
    const input = container.querySelector("input")
    expect(input?.type).toBe("range")
  })

  it("renders as range input when type is specified", () => {
    const { container } = render(<RangeInput type="range" />)
    const input = container.querySelector("input")
    expect(input?.type).toBe("range")
  })

  it("applies correct CSS classes", () => {
    const { container } = render(<RangeInput className="custom-class" />)
    const input = container.querySelector("input")
    expect(input?.className).toContain("custom-class")
  })

  it("passes through all input props", () => {
    const { container } = render(<RangeInput type="range" min={0} max={100} value={50} id="test-range" />)
    const input = container.querySelector("input")
    expect(input?.min).toBe("0")
    expect(input?.max).toBe("100")
    expect(input?.value).toBe("50")
    expect(input?.id).toBe("test-range")
  })
})
