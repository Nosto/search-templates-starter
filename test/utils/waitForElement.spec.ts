import { describe, it, expect, beforeEach, vi } from "vitest"
import { waitForElement, waitForElements } from "@/utils/waitForElement"

describe("waitForElement utilities", () => {
  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = ""
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  describe("waitForElement", () => {
    it("resolves immediately when element exists", async () => {
      const element = document.createElement("div")
      element.id = "test-element"
      document.body.appendChild(element)

      const result = await waitForElement("#test-element")
      expect(result).toBe(element)
    })

    it("waits for element to appear and resolves", async () => {
      const promise = waitForElement("#delayed-element")

      // Element doesn't exist yet
      expect(document.querySelector("#delayed-element")).toBeNull()

      // Add element after a delay
      setTimeout(() => {
        const element = document.createElement("div")
        element.id = "delayed-element"
        document.body.appendChild(element)
      }, 200)

      // Advance timers to simulate the delay
      vi.advanceTimersByTime(200)

      const result = await promise
      expect(result.id).toBe("delayed-element")
    })

    it("rejects when timeout is reached", async () => {
      const promise = waitForElement("#non-existent", 500)

      // Advance timers to exceed timeout
      vi.advanceTimersByTime(600)

      await expect(promise).rejects.toThrow('Element with selector "#non-existent" not found within 500ms')
    })

    it("uses custom timeout and interval", async () => {
      const promise = waitForElement("#test", 1000, 50)

      // Add element after custom interval periods
      setTimeout(() => {
        const element = document.createElement("div")
        element.id = "test"
        document.body.appendChild(element)
      }, 150)

      vi.advanceTimersByTime(150)

      const result = await promise
      expect(result.id).toBe("test")
    })

    it("returns correctly typed element", async () => {
      const input = document.createElement("input")
      input.id = "test-input"
      document.body.appendChild(input)

      const result = await waitForElement<HTMLInputElement>("#test-input")
      expect(result).toBeInstanceOf(HTMLInputElement)
      expect(result.id).toBe("test-input")
    })
  })

  describe("waitForElements", () => {
    it("resolves immediately when all elements exist", async () => {
      const div = document.createElement("div")
      div.id = "div-element"
      const span = document.createElement("span")
      span.id = "span-element"
      document.body.appendChild(div)
      document.body.appendChild(span)

      const results = await waitForElements(["#div-element", "#span-element"])
      expect(results).toHaveLength(2)
      expect(results[0]).toBe(div)
      expect(results[1]).toBe(span)
    })

    it("waits for all elements to appear", async () => {
      const promise = waitForElements(["#first", "#second"])

      // Add first element
      setTimeout(() => {
        const first = document.createElement("div")
        first.id = "first"
        document.body.appendChild(first)
      }, 100)

      // Add second element later
      setTimeout(() => {
        const second = document.createElement("div")
        second.id = "second"
        document.body.appendChild(second)
      }, 200)

      vi.advanceTimersByTime(200)

      const results = await promise
      expect(results).toHaveLength(2)
      expect(results[0].id).toBe("first")
      expect(results[1].id).toBe("second")
    })

    it("rejects if any element times out", async () => {
      // Add only one of the required elements
      const div = document.createElement("div")
      div.id = "existing"
      document.body.appendChild(div)

      const promise = waitForElements(["#existing", "#non-existent"], 500)

      vi.advanceTimersByTime(600)

      await expect(promise).rejects.toThrow('Element with selector "#non-existent" not found within 500ms')
    })

    it("handles empty array", async () => {
      const results = await waitForElements([])
      expect(results).toHaveLength(0)
    })
  })
})
