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

    it("has proper tabIndex for keyboard navigation", () => {
      const onChange = vi.fn()
      const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

      const minHandle = container.querySelector('[aria-label="Minimum value"]') as HTMLElement
      const maxHandle = container.querySelector('[aria-label="Maximum value"]') as HTMLElement

      expect(minHandle?.tabIndex).toBe(0)
      expect(maxHandle?.tabIndex).toBe(0)
    })

    describe("keyboard interaction", () => {
      it("handles arrow keys for min handle", () => {
        const onChange = vi.fn()
        const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const minHandle = container.querySelector('[aria-label="Minimum value"]') as HTMLElement

        // Arrow right should increase min value
        fireEvent.keyDown(minHandle, { key: "ArrowRight" })
        expect(onChange).toHaveBeenCalledWith([26, 75])

        // Arrow left should decrease min value
        onChange.mockClear()
        fireEvent.keyDown(minHandle, { key: "ArrowLeft" })
        expect(onChange).toHaveBeenCalledWith([24, 75])

        // Arrow up should increase min value
        onChange.mockClear()
        fireEvent.keyDown(minHandle, { key: "ArrowUp" })
        expect(onChange).toHaveBeenCalledWith([26, 75])

        // Arrow down should decrease min value
        onChange.mockClear()
        fireEvent.keyDown(minHandle, { key: "ArrowDown" })
        expect(onChange).toHaveBeenCalledWith([24, 75])
      })

      it("handles arrow keys for max handle", () => {
        const onChange = vi.fn()
        const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const maxHandle = container.querySelector('[aria-label="Maximum value"]') as HTMLElement

        // Arrow right should increase max value
        fireEvent.keyDown(maxHandle, { key: "ArrowRight" })
        expect(onChange).toHaveBeenCalledWith([25, 76])

        // Arrow left should decrease max value
        onChange.mockClear()
        fireEvent.keyDown(maxHandle, { key: "ArrowLeft" })
        expect(onChange).toHaveBeenCalledWith([25, 74])

        // Arrow up should increase max value
        onChange.mockClear()
        fireEvent.keyDown(maxHandle, { key: "ArrowUp" })
        expect(onChange).toHaveBeenCalledWith([25, 76])

        // Arrow down should decrease max value
        onChange.mockClear()
        fireEvent.keyDown(maxHandle, { key: "ArrowDown" })
        expect(onChange).toHaveBeenCalledWith([25, 74])
      })

      it("handles Home and End keys for min handle", () => {
        const onChange = vi.fn()
        const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const minHandle = container.querySelector('[aria-label="Minimum value"]') as HTMLElement

        // Home should set min value to minimum
        fireEvent.keyDown(minHandle, { key: "Home" })
        expect(onChange).toHaveBeenCalledWith([undefined, 75])

        // End should set min value to max value
        onChange.mockClear()
        fireEvent.keyDown(minHandle, { key: "End" })
        expect(onChange).toHaveBeenCalledWith([75, 75])
      })

      it("handles Home and End keys for max handle", () => {
        const onChange = vi.fn()
        const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const maxHandle = container.querySelector('[aria-label="Maximum value"]') as HTMLElement

        // Home should set max value to min value
        fireEvent.keyDown(maxHandle, { key: "Home" })
        expect(onChange).toHaveBeenCalledWith([25, 25])

        // End should set max value to maximum
        onChange.mockClear()
        fireEvent.keyDown(maxHandle, { key: "End" })
        expect(onChange).toHaveBeenCalledWith([25, undefined])
      })

      it("respects constraints when using keyboard", () => {
        const onChange = vi.fn()
        const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const minHandle = container.querySelector('[aria-label="Minimum value"]') as HTMLElement
        const maxHandle = container.querySelector('[aria-label="Maximum value"]') as HTMLElement

        // Min handle should not exceed max value
        fireEvent.keyDown(minHandle, { key: "End" }) // Sets to max value (75)
        expect(onChange).toHaveBeenCalledWith([75, 75])

        // Max handle should not go below min value
        onChange.mockClear()
        fireEvent.keyDown(maxHandle, { key: "Home" }) // Sets to min value (25)
        expect(onChange).toHaveBeenCalledWith([25, 25])
      })

      it("prevents default behavior for handled keys", () => {
        const onChange = vi.fn()
        const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const minHandle = container.querySelector('[aria-label="Minimum value"]') as HTMLElement

        // Create a more realistic KeyboardEvent mock
        const keyEvent = new KeyboardEvent("keydown", { key: "ArrowRight" })
        const preventDefaultSpy = vi.spyOn(keyEvent, "preventDefault")

        minHandle.dispatchEvent(keyEvent)
        expect(preventDefaultSpy).toHaveBeenCalled()
      })

      it("does not handle non-navigation keys", () => {
        const onChange = vi.fn()
        const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const minHandle = container.querySelector('[aria-label="Minimum value"]') as HTMLElement

        // Random key should not trigger onChange
        fireEvent.keyDown(minHandle, { key: "a" })
        expect(onChange).not.toHaveBeenCalled()

        fireEvent.keyDown(minHandle, { key: "Enter" })
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    describe("focus management", () => {
      it("handles tab navigation correctly", () => {
        const onChange = vi.fn()
        const { container } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const minHandle = container.querySelector('[aria-label="Minimum value"]') as HTMLElement
        const maxHandle = container.querySelector('[aria-label="Maximum value"]') as HTMLElement

        // Both handles should be focusable
        minHandle.focus()
        expect(document.activeElement).toBe(minHandle)

        maxHandle.focus()
        expect(document.activeElement).toBe(maxHandle)
      })

      it("maintains focus during value updates", () => {
        const onChange = vi.fn()
        const { container, rerender } = render(<DualRange min={0} max={100} value={[25, 75]} onChange={onChange} />)

        const minHandle = container.querySelector('[aria-label="Minimum value"]') as HTMLElement
        minHandle.focus()
        expect(document.activeElement).toBe(minHandle)

        // Re-render with new values - focus should be maintained
        rerender(<DualRange min={0} max={100} value={[30, 80]} onChange={onChange} />)
        expect(document.activeElement).toBe(minHandle)
      })
    })
  })
})
