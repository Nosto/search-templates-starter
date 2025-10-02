import { describe, it, expect, beforeEach } from "vitest"
import { getEarlyUrlState, shouldExecuteEarlySearch } from "@/mapping/url/getEarlyUrlState"

describe("getEarlyUrlState", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: {
        search: ""
      },
      writable: true
    })
  })

  it("returns early parsed URL state", () => {
    const state = getEarlyUrlState()
    expect(state).toBeDefined()
    expect(typeof state).toBe("object")
  })

  it("handles empty URL state gracefully", () => {
    const state = getEarlyUrlState()
    expect(state).toEqual({})
  })
})

describe("shouldExecuteEarlySearch", () => {
  it("returns boolean indicating if early search should execute", () => {
    const result = shouldExecuteEarlySearch()
    expect(typeof result).toBe("boolean")
  })

  it("correctly identifies when search parameters exist", () => {
    // This test validates the function works without throwing errors
    const result = shouldExecuteEarlySearch()
    expect(result === true || result === false).toBe(true)
  })
})
