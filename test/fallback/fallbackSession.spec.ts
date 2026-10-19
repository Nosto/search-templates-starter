import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { clearFallbackSession, isFallbackActive, setFallbackSession } from "@/fallback/fallbackSession"

describe("fallbackSession", () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("is inactive by default", () => {
    expect(isFallbackActive()).toBe(false)
  })

  it("is active for the given duration", () => {
    setFallbackSession(1000)
    expect(isFallbackActive()).toBe(true)

    vi.advanceTimersByTime(1000)
    expect(isFallbackActive()).toBe(false)
  })

  it("can be cleared", () => {
    setFallbackSession(1000)
    clearFallbackSession()
    expect(isFallbackActive()).toBe(false)
  })
})
