import { describe, it, expect, beforeEach, vi } from "vitest"
import type { Mock } from "vitest"

let mockGetEarlyUrlState: Mock
let mockShouldExecuteEarlySearch: Mock

// Mock getEarlyUrlState and shouldExecuteEarlySearch
vi.mock("@/mapping/url/getEarlyUrlState", () => {
  mockGetEarlyUrlState = vi.fn(() => ({}))
  mockShouldExecuteEarlySearch = vi.fn(() => false)
  return {
    getEarlyUrlState: mockGetEarlyUrlState,
    shouldExecuteEarlySearch: mockShouldExecuteEarlySearch
  }
})

// Mock nostojs and related dependencies
vi.mock("@nosto/nosto-js", () => ({
  nostojs: vi.fn(callback => {
    // Simulate nostojs ready callback
    callback({
      search: vi.fn().mockResolvedValue({ results: [] })
    })
  })
}))

vi.mock("@/mapping/tagging", () => ({
  tagging: {
    pageType: vi.fn(() => "search"),
    categoryId: vi.fn(() => undefined),
    categoryPath: vi.fn(() => undefined)
  }
}))

describe("earlySearch", () => {
  let initEarlySearch: typeof import("@/search/earlySearch").initEarlySearch
  let isEarlySearchExecuted: typeof import("@/search/earlySearch").isEarlySearchExecuted
  let resetEarlySearchState: typeof import("@/search/earlySearch").resetEarlySearchState

  beforeEach(async () => {
    // Reset early search state before each test
    const earlySearchModule = await import("@/search/earlySearch")
    initEarlySearch = earlySearchModule.initEarlySearch
    isEarlySearchExecuted = earlySearchModule.isEarlySearchExecuted
    resetEarlySearchState = earlySearchModule.resetEarlySearchState

    resetEarlySearchState()

    // Reset mocks
    mockGetEarlyUrlState.mockReturnValue({})
    mockShouldExecuteEarlySearch.mockReturnValue(false)

    Object.defineProperty(window, "location", {
      value: {
        search: ""
      },
      writable: true
    })
  })

  it("returns null when no search parameters exist", () => {
    const result = initEarlySearch()
    expect(result).toBeNull()
  })

  it("tracks early search execution state", () => {
    expect(isEarlySearchExecuted()).toBe(false)

    // Mock URL with search params and configure mocks
    mockGetEarlyUrlState.mockReturnValue({ query: "test" })
    mockShouldExecuteEarlySearch.mockReturnValue(true)

    initEarlySearch()

    // After execution, it should be marked as executed
    expect(isEarlySearchExecuted()).toBe(true)
  })

  it("prevents duplicate early search execution", () => {
    // Configure mocks for search execution
    mockGetEarlyUrlState.mockReturnValue({ query: "test" })
    mockShouldExecuteEarlySearch.mockReturnValue(true)

    const result1 = initEarlySearch()
    const result2 = initEarlySearch()

    // First call should return a promise, second should return null
    expect(result1).not.toBeNull()
    expect(result2).toBeNull()
  })

  it("resets state correctly for testing", () => {
    // Configure mocks for search execution
    mockGetEarlyUrlState.mockReturnValue({ query: "test" })
    mockShouldExecuteEarlySearch.mockReturnValue(true)

    initEarlySearch()

    expect(isEarlySearchExecuted()).toBe(true)

    resetEarlySearchState()

    expect(isEarlySearchExecuted()).toBe(false)
  })
})
