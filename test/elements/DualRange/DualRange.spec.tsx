import { render, screen, fireEvent } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import DualRange from "@/elements/DualRange/DualRange"

describe("DualRange", () => {
  it("renders with correct range attributes", () => {
    const onChange = vi.fn()
    render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} id="test-range" />)

    const minSlider = screen.getByLabelText("Minimum value")
    const maxSlider = screen.getByLabelText("Maximum value")

    expect(minSlider.getAttribute("min")).toBe("0")
    expect(minSlider.getAttribute("max")).toBe("100")
    expect(minSlider.getAttribute("type")).toBe("range")

    expect(maxSlider.getAttribute("min")).toBe("0")
    expect(maxSlider.getAttribute("max")).toBe("100")
    expect(maxSlider.getAttribute("type")).toBe("range")
  })

  it("displays current values correctly", () => {
    const onChange = vi.fn()
    render(<DualRange min={10} max={500} value={[50, 200]} onChange={onChange} id="price-range" />)

    expect(screen.getByText("50")).toBeTruthy()
    expect(screen.getByText("200")).toBeTruthy()
    expect(screen.getByText("-")).toBeTruthy()
  })

  it("uses min/max values when range values are undefined", () => {
    const onChange = vi.fn()
    render(<DualRange min={1} max={5} value={[]} onChange={onChange} id="rating-range" />)

    expect(screen.getByText("1")).toBeTruthy()
    expect(screen.getByText("5")).toBeTruthy()
  })

  it("applies custom className when provided", () => {
    const onChange = vi.fn()
    const { container } = render(
      <DualRange min={0} max={100} value={[0, 100]} onChange={onChange} className="custom-class" />
    )

    expect((container.firstChild as HTMLElement)?.className).toMatch(/custom-class/)
  })

  it("differentiates between dragging and submitting changes", () => {
    const onChange = vi.fn()
    render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} id="test-range" />)

    const minSlider = screen.getByLabelText("Minimum value")

    // Start dragging
    fireEvent.mouseDown(minSlider)

    // Simulate input change during drag
    Object.defineProperty(minSlider, "value", { value: "30", writable: true })
    fireEvent.input(minSlider)

    // onChange should NOT be called during drag
    expect(onChange).not.toHaveBeenCalled()

    // End dragging
    fireEvent.mouseUp(minSlider)

    // onChange should be called after drag ends
    expect(onChange).toHaveBeenCalledWith([30, 75])
  })

  it("calls onChange immediately for non-drag interactions", () => {
    const onChange = vi.fn()
    render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} id="test-range" />)

    const minSlider = screen.getByLabelText("Minimum value")

    // Simulate input change without drag (e.g., keyboard input)
    Object.defineProperty(minSlider, "value", { value: "30", writable: true })
    fireEvent.input(minSlider)

    // onChange should be called immediately when not dragging
    expect(onChange).toHaveBeenCalledWith([30, 75])
  })

  it("updates visual display during drag without calling onChange", () => {
    const onChange = vi.fn()
    render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} id="test-range" />)

    const minSlider = screen.getByLabelText("Minimum value")

    // Start dragging
    fireEvent.mouseDown(minSlider)

    // Simulate input change during drag
    Object.defineProperty(minSlider, "value", { value: "35", writable: true })
    fireEvent.input(minSlider)

    // Visual display should update to show the new value
    expect(screen.getByText("35")).toBeTruthy()
    expect(screen.getByText("75")).toBeTruthy()

    // But onChange should not be called yet
    expect(onChange).not.toHaveBeenCalled()
  })
})
