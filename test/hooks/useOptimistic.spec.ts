import { describe, it, expect, vi } from "vitest"
import { renderHook, act } from "@testing-library/preact"
import { useOptimistic } from "@/hooks/useOptimistic"

describe("useOptimistic", () => {
  describe("basic functionality", () => {
    it("returns the initial state", () => {
      const { result } = renderHook(() => useOptimistic(5, (state, value) => state + (value as number)))

      expect(result.current[0]).toBe(5)
    })

    it("returns a stable update function", () => {
      const { result, rerender } = renderHook(() => useOptimistic(5, (state, value) => state + (value as number)))

      const firstUpdate = result.current[1]
      rerender()
      const secondUpdate = result.current[1]

      expect(firstUpdate).toBe(secondUpdate)
    })

    it("applies optimistic update immediately", () => {
      const { result } = renderHook(() => useOptimistic(5, (state, value) => state + (value as number)))

      act(() => {
        result.current[1](3)
      })

      expect(result.current[0]).toBe(8)
    })

    it("replaces optimistic update on subsequent calls", () => {
      const { result } = renderHook(() => useOptimistic(10, (state, value) => state + (value as number)))

      act(() => {
        result.current[1](5)
      })

      expect(result.current[0]).toBe(15)

      act(() => {
        result.current[1](3)
      })

      expect(result.current[0]).toBe(13)
    })
  })

  describe("rollback behavior", () => {
    it("applies optimistic update on new state", () => {
      const { result, rerender } = renderHook(
        ({ state }) => useOptimistic(state, (s, value) => s + (value as number)),
        { initialProps: { state: 5 } }
      )

      act(() => {
        result.current[1](10)
      })

      expect(result.current[0]).toBe(15)

      act(() => {
        rerender({ state: 5 })
      })

      expect(result.current[0]).toBe(15)
    })

    it("maintains optimistic state until state prop updates", () => {
      const { result, rerender } = renderHook(
        ({ state }) => useOptimistic(state, (s, value) => s + (value as number)),
        { initialProps: { state: 10 } }
      )

      act(() => {
        result.current[1](5)
      })

      expect(result.current[0]).toBe(15)

      rerender({ state: 10 })

      expect(result.current[0]).toBe(15)
    })

    it("applies optimistic update on top of new parent state", () => {
      const { result, rerender } = renderHook(
        ({ state }) => useOptimistic(state, (s, value) => s + (value as number)),
        { initialProps: { state: 5 } }
      )

      act(() => {
        result.current[1](3)
      })

      expect(result.current[0]).toBe(8)

      act(() => {
        rerender({ state: 20 })
      })

      expect(result.current[0]).toBe(23)
    })
  })

  describe("update function behavior", () => {
    it("calls update function with current state and optimistic value", () => {
      const updateFn = vi.fn((state, value) => state + (value as number))
      const { result } = renderHook(() => useOptimistic(10, updateFn))

      act(() => {
        result.current[1](5)
      })

      expect(updateFn).toHaveBeenCalledWith(10, 5)
    })

    it("handles different update function implementations", () => {
      const { result } = renderHook(() =>
        useOptimistic({ count: 0 }, (state, action) => {
          const typedAction = action as { type: string; value: number }
          if (typedAction.type === "increment") {
            return { count: state.count + typedAction.value }
          }
          return state
        })
      )

      act(() => {
        result.current[1]({ type: "increment", value: 5 })
      })

      expect(result.current[0]).toEqual({ count: 5 })
    })

    it("supports complex state updates", () => {
      type Todo = { id: number; text: string; completed: boolean }
      type State = Todo[]

      const { result } = renderHook(() =>
        useOptimistic<State>(
          [
            { id: 1, text: "Task 1", completed: false },
            { id: 2, text: "Task 2", completed: false }
          ],
          (state, action) => {
            const typedAction = action as { type: string; id: number }
            if (typedAction.type === "toggle") {
              return state.map(todo => (todo.id === typedAction.id ? { ...todo, completed: !todo.completed } : todo))
            }
            return state
          }
        )
      )

      act(() => {
        result.current[1]({ type: "toggle", id: 1 })
      })

      expect(result.current[0][0].completed).toBe(true)
      expect(result.current[0][1].completed).toBe(false)
    })
  })

  describe("edge cases", () => {
    it("handles null state", () => {
      const { result } = renderHook(() => useOptimistic(null, () => "updated"))

      expect(result.current[0]).toBe(null)

      act(() => {
        result.current[1]("value")
      })

      expect(result.current[0]).toBe("updated")
    })

    it("handles undefined state", () => {
      const { result } = renderHook(() => useOptimistic(undefined, () => "defined"))

      expect(result.current[0]).toBe(undefined)

      act(() => {
        result.current[1]("value")
      })

      expect(result.current[0]).toBe("defined")
    })

    it("handles empty string state", () => {
      const { result } = renderHook(() => useOptimistic("", (state, value) => state + value))

      expect(result.current[0]).toBe("")

      act(() => {
        result.current[1]("hello")
      })

      expect(result.current[0]).toBe("hello")
    })

    it("handles zero as initial state", () => {
      const { result } = renderHook(() => useOptimistic(0, (state, value) => state + (value as number)))

      expect(result.current[0]).toBe(0)

      act(() => {
        result.current[1](5)
      })

      expect(result.current[0]).toBe(5)
    })

    it("handles boolean state", () => {
      const { result } = renderHook(() => useOptimistic(false, () => true))

      expect(result.current[0]).toBe(false)

      act(() => {
        result.current[1]("toggle")
      })

      expect(result.current[0]).toBe(true)
    })

    it("handles array state", () => {
      const { result } = renderHook(() => useOptimistic([1, 2, 3], (state, value) => [...state, value as number]))

      expect(result.current[0]).toEqual([1, 2, 3])

      act(() => {
        result.current[1](4)
      })

      expect(result.current[0]).toEqual([1, 2, 3, 4])
    })

    it("handles object state", () => {
      const { result } = renderHook(() =>
        useOptimistic({ name: "John", age: 30 }, (state, update) => ({
          ...state,
          ...(update as Partial<{ name: string; age: number }>)
        }))
      )

      expect(result.current[0]).toEqual({ name: "John", age: 30 })

      act(() => {
        result.current[1]({ age: 31 })
      })

      expect(result.current[0]).toEqual({ name: "John", age: 31 })
    })
  })

  describe("type safety", () => {
    it("maintains type safety with generics", () => {
      type State = { count: number }
      const { result } = renderHook(() =>
        useOptimistic<State>({ count: 0 }, (state, value) => ({ count: state.count + (value as number) }))
      )

      expect(result.current[0]).toEqual({ count: 0 })

      act(() => {
        result.current[1](5)
      })

      expect(result.current[0]).toEqual({ count: 5 })
    })

    it("works with primitive types", () => {
      const { result } = renderHook(() => useOptimistic<number>(0, (state, value) => state + (value as number)))

      expect(typeof result.current[0]).toBe("number")

      act(() => {
        result.current[1](10)
      })

      expect(result.current[0]).toBe(10)
    })

    it("works with string types", () => {
      const { result } = renderHook(() => useOptimistic<string>("hello", (state, value) => state + value))

      expect(result.current[0]).toBe("hello")

      act(() => {
        result.current[1](" world")
      })

      expect(result.current[0]).toBe("hello world")
    })
  })

  describe("concurrent updates", () => {
    it("uses last update when called multiple times", () => {
      const { result } = renderHook(() => useOptimistic(0, (state, value) => state + (value as number)))

      act(() => {
        result.current[1](1)
        result.current[1](2)
        result.current[1](3)
      })

      expect(result.current[0]).toBe(3)
    })

    it("replaces previous update", () => {
      const { result } = renderHook(() => useOptimistic<string>("", (state, value) => state + value))

      act(() => {
        result.current[1]("a")
        result.current[1]("b")
        result.current[1]("c")
      })

      expect(result.current[0]).toBe("c")
    })
  })
})
