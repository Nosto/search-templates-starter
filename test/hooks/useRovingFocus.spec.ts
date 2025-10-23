import { renderHook, act } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useRovingFocus, RovingFocusConfig } from "@/hooks/useRovingFocus"

// Mock DOM methods
const mockQuerySelectorAll = vi.fn()

beforeEach(() => {
  mockQuerySelectorAll.mockClear()
  // Mock document.activeElement
  Object.defineProperty(document, "activeElement", {
    writable: true,
    value: null
  })
})

describe("useRovingFocus", () => {
  it("should initialize with focusedIndex 0", () => {
    const { result } = renderHook(() => useRovingFocus())

    expect(result.current.focusedIndex).toBe(0)
  })

  it("should set config correctly", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockParent = {
      querySelectorAll: mockQuerySelectorAll
    } as unknown as HTMLElement

    const config: RovingFocusConfig = {
      parentElement: mockParent,
      focusableSelector: "[data-roving-focus-item]"
    }

    act(() => {
      result.current.setConfig(config)
    })

    // Should not throw and should accept the config
    expect(() => result.current.setConfig(config)).not.toThrow()
  })

  it("should handle keyboard navigation when elements are found", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockElement1 = { focus: vi.fn() } as unknown as HTMLElement
    const mockElement2 = { focus: vi.fn() } as unknown as HTMLElement

    mockQuerySelectorAll.mockReturnValue([mockElement1, mockElement2])

    const mockParent = {
      querySelectorAll: mockQuerySelectorAll
    } as unknown as HTMLElement

    const config: RovingFocusConfig = {
      parentElement: mockParent,
      focusableSelector: "[data-roving-focus-item]"
    }

    act(() => {
      result.current.setConfig(config)
    })

    const mockEvent = {
      key: "ArrowDown",
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent

    act(() => {
      result.current.handleKeyDown(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockElement2.focus).toHaveBeenCalled()
  })

  it("should handle Enter key by clicking the focused element", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockElement = {
      focus: vi.fn(),
      click: vi.fn()
    } as unknown as HTMLElement

    mockQuerySelectorAll.mockReturnValue([mockElement])

    const mockParent = {
      querySelectorAll: mockQuerySelectorAll
    } as unknown as HTMLElement

    const config: RovingFocusConfig = {
      parentElement: mockParent,
      focusableSelector: "[data-roving-focus-item]"
    }

    act(() => {
      result.current.setConfig(config)
    })

    const mockEvent = {
      key: "Enter",
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent

    act(() => {
      result.current.handleKeyDown(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockElement.click).toHaveBeenCalled()
  })

  it("should provide correct tabIndex based on focused element", () => {
    const { result } = renderHook(() => useRovingFocus())

    const mockElement1 = {} as HTMLElement
    const mockElement2 = {} as HTMLElement

    mockQuerySelectorAll.mockReturnValue([mockElement1, mockElement2])

    const mockParent = {
      querySelectorAll: mockQuerySelectorAll
    } as unknown as HTMLElement

    const config: RovingFocusConfig = {
      parentElement: mockParent,
      focusableSelector: "[data-roving-focus-item]"
    }

    act(() => {
      result.current.setConfig(config)
    })

    const tabIndex1 = result.current.getTabIndex(mockElement1)
    const tabIndex2 = result.current.getTabIndex(mockElement2)

    expect(tabIndex1).toBe(0) // First element should be focusable
    expect(tabIndex2).toBe(-1) // Second element should not be focusable
  })

  it("should handle no elements gracefully", () => {
    const { result } = renderHook(() => useRovingFocus())

    mockQuerySelectorAll.mockReturnValue([])

    const mockParent = {
      querySelectorAll: mockQuerySelectorAll
    } as unknown as HTMLElement

    const config: RovingFocusConfig = {
      parentElement: mockParent,
      focusableSelector: "[data-roving-focus-item]"
    }

    act(() => {
      result.current.setConfig(config)
    })

    const mockEvent = {
      key: "ArrowDown",
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent

    // Should not throw when no elements exist
    expect(() => {
      act(() => {
        result.current.handleKeyDown(mockEvent)
      })
    }).not.toThrow()

    expect(mockEvent.preventDefault).not.toHaveBeenCalled()
  })
})
