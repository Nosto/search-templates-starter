import { render, fireEvent } from "@testing-library/preact"
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

  describe("drag interactions", () => {
    it("handles drag operations with proper onChange timing and constraint validation", () => {
      const onChange = vi.fn()
      const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

      const minHandle = container.querySelector('[aria-label="Minimum value"]')
      const maxHandle = container.querySelector('[aria-label="Maximum value"]')
      const track = container.querySelector('[class*="track"]')

      expect(minHandle).toBeTruthy()
      expect(maxHandle).toBeTruthy()
      expect(track).toBeTruthy()

      // Mock getBoundingClientRect for the track
      Object.defineProperty(track!, "getBoundingClientRect", {
        value: () => ({ left: 0, width: 100 }),
        configurable: true
      })

      // Test onChange timing - should not call during mouse move, only on mouse up
      fireEvent.mouseDown(minHandle!)
      expect(onChange).not.toHaveBeenCalled()

      // Simulate mouse move - should not call onChange yet
      fireEvent.mouseMove(document, { clientX: 50 })
      expect(onChange).not.toHaveBeenCalled()

      // Mouse up should call onChange
      fireEvent.mouseUp(document)
      expect(onChange).toHaveBeenCalledTimes(1)
      onChange.mockClear()

      // Test min handle constraint - cannot exceed max value
      fireEvent.mouseDown(minHandle!)
      // Try to drag beyond max value (clientX = 80 should be around value 80, which is > 75)
      fireEvent.mouseMove(document, { clientX: 80 })
      expect(onChange).not.toHaveBeenCalled() // Still should not call during move
      fireEvent.mouseUp(document)
      expect(onChange).toHaveBeenCalledTimes(1)
      // The min value should not exceed the max value (75)
      const [minVal] = onChange.mock.calls[0][0]
      expect(minVal).toBeLessThanOrEqual(75)
      onChange.mockClear()

      // Test max handle constraint - cannot go below min value
      fireEvent.mouseDown(maxHandle!)
      // Try to drag below min value (clientX = 20 should be around value 20, which is < 25)
      fireEvent.mouseMove(document, { clientX: 20 })
      expect(onChange).not.toHaveBeenCalled() // Still should not call during move
      fireEvent.mouseUp(document)
      expect(onChange).toHaveBeenCalledTimes(1)
      // The max value should not go below the min value (25)
      const [, maxVal] = onChange.mock.calls[0][0]
      expect(maxVal).toBeGreaterThanOrEqual(25)
    })

    it("sets user-select none during drag to prevent text selection", () => {
      const onChange = vi.fn()
      const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

      const minHandle = container.querySelector('[aria-label="Minimum value"]')
      expect(minHandle).toBeTruthy()

      // Start dragging
      fireEvent.mouseDown(minHandle!)

      // Should set user-select to none during drag
      expect(document.body.style.userSelect).toBe("none")

      // End dragging
      fireEvent.mouseUp(document)

      // Should reset user-select after drag
      expect(document.body.style.userSelect).toBe("")
    })
  })

  describe("accessibility", () => {
    it("has proper ARIA attributes", () => {
      const onChange = vi.fn()
      const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

      const minHandle = container.querySelector('[aria-label="Minimum value"]')
      const maxHandle = container.querySelector('[aria-label="Maximum value"]')

      expect(minHandle?.getAttribute("role")).toBe("slider")
      expect(minHandle?.getAttribute("aria-valuemin")).toBe("0")
      expect(minHandle?.getAttribute("aria-valuemax")).toBe("100")
      expect(minHandle?.getAttribute("aria-valuenow")).toBe("25")

      expect(maxHandle?.getAttribute("role")).toBe("slider")
      expect(maxHandle?.getAttribute("aria-valuemin")).toBe("0")
      expect(maxHandle?.getAttribute("aria-valuemax")).toBe("100")
      expect(maxHandle?.getAttribute("aria-valuenow")).toBe("75")
    })

    it("updates aria-valuenow when values change", () => {
      const onChange = vi.fn()
      const { container, rerender } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

      // Re-render with new values
      rerender(<DualRange min={0} max={100} value={[30, 80]} onChange={onChange} />)

      const minHandle = container.querySelector('[aria-label="Minimum value"]')
      const maxHandle = container.querySelector('[aria-label="Maximum value"]')

      expect(minHandle?.getAttribute("aria-valuenow")).toBe("30")
      expect(maxHandle?.getAttribute("aria-valuenow")).toBe("80")
    })
  })
})
