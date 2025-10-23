import { renderHook, act } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import { useRovingFocus, RovingFocusItem } from "@/hooks/useRovingFocus"

describe("useRovingFocus", () => {
  it("should initialize with focusedIndex 0", () => {
    const { result } = renderHook(() => useRovingFocus())

    expect(result.current.focusedIndex).toBe(0)
  })

  it("should register and unregister items correctly", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockElement1 = { focus: vi.fn() } as unknown as HTMLElement
    const mockElement2 = { focus: vi.fn() } as unknown as HTMLElement

    const item1: RovingFocusItem = {
      id: "item1",
      element: mockElement1,
      onSelect: vi.fn()
    }

    const item2: RovingFocusItem = {
      id: "item2",
      element: mockElement2,
      onSelect: vi.fn()
    }

    act(() => {
      result.current.registerItem(item1)
      result.current.registerItem(item2)
    })

    act(() => {
      result.current.unregisterItem("item1")
    })

    // Should adjust focused index when items are removed
    expect(result.current.focusedIndex).toBe(0)
  })

  it("should handle arrow down navigation", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockElement1 = { focus: vi.fn() } as unknown as HTMLElement
    const mockElement2 = { focus: vi.fn() } as unknown as HTMLElement

    act(() => {
      result.current.registerItem({
        id: "item1",
        element: mockElement1,
        onSelect: vi.fn()
      })
      result.current.registerItem({
        id: "item2",
        element: mockElement2,
        onSelect: vi.fn()
      })
    })

    const mockEvent = {
      key: "ArrowDown",
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent

    act(() => {
      result.current.handleKeyDown(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(result.current.focusedIndex).toBe(1)
    expect(mockElement2.focus).toHaveBeenCalled()
  })

  it("should handle arrow up navigation", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockElement1 = { focus: vi.fn() } as unknown as HTMLElement
    const mockElement2 = { focus: vi.fn() } as unknown as HTMLElement

    act(() => {
      result.current.registerItem({
        id: "item1",
        element: mockElement1,
        onSelect: vi.fn()
      })
      result.current.registerItem({
        id: "item2",
        element: mockElement2,
        onSelect: vi.fn()
      })
      result.current.setFocusedIndex(1)
    })

    const mockEvent = {
      key: "ArrowUp",
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent

    act(() => {
      result.current.handleKeyDown(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(result.current.focusedIndex).toBe(0)
    expect(mockElement1.focus).toHaveBeenCalled()
  })

  it("should wrap around when navigating beyond bounds", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockElement1 = { focus: vi.fn() } as unknown as HTMLElement
    const mockElement2 = { focus: vi.fn() } as unknown as HTMLElement

    act(() => {
      result.current.registerItem({
        id: "item1",
        element: mockElement1,
        onSelect: vi.fn()
      })
      result.current.registerItem({
        id: "item2",
        element: mockElement2,
        onSelect: vi.fn()
      })
      result.current.setFocusedIndex(1)
    })

    // Navigate down from last item should wrap to first
    const mockEventDown = {
      key: "ArrowDown",
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent

    act(() => {
      result.current.handleKeyDown(mockEventDown)
    })

    expect(result.current.focusedIndex).toBe(0)
    expect(mockElement1.focus).toHaveBeenCalled()
  })

  it("should handle Enter key to select focused item", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockOnSelect = vi.fn()
    const mockElement = { focus: vi.fn() } as unknown as HTMLElement

    act(() => {
      result.current.registerItem({
        id: "item1",
        element: mockElement,
        onSelect: mockOnSelect
      })
    })

    const mockEvent = {
      key: "Enter",
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent

    act(() => {
      result.current.handleKeyDown(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockOnSelect).toHaveBeenCalled()
  })

  it("should provide correct focus props", () => {
    const { result } = renderHook(() => useRovingFocus())

    const focusProps1 = result.current.getFocusProps("item1", 0)
    const focusProps2 = result.current.getFocusProps("item2", 1)

    expect(focusProps1.tabIndex).toBe(0) // First item should be focusable
    expect(focusProps2.tabIndex).toBe(-1) // Second item should not be focusable
    expect(typeof focusProps1.ref).toBe("function")
    expect(typeof focusProps1.onKeyDown).toBe("function")
  })
})
