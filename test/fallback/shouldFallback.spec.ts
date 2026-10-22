import { describe, it, expect } from "vitest"
import { shouldFallback } from "@/fallback/shouldFallback"

function withStatus(status: number) {
  return Object.assign(new Error(`status ${status}`), { status })
}

describe("shouldFallback", () => {
  it("ignores missing errors", () => {
    expect(shouldFallback(undefined)).toBe(false)
  })

  it("ignores aborted requests", () => {
    expect(shouldFallback(new Error("Request aborted"))).toBe(false)
    expect(shouldFallback(new DOMException("The operation was aborted", "AbortError"))).toBe(false)
  })

  it("ignores bad requests and successful responses", () => {
    expect(shouldFallback(withStatus(400))).toBe(false)
    expect(shouldFallback(withStatus(200))).toBe(false)
  })

  it("falls back on unavailable service statuses", () => {
    expect(shouldFallback(withStatus(403))).toBe(true)
    expect(shouldFallback(withStatus(408))).toBe(true)
    expect(shouldFallback(withStatus(500))).toBe(true)
    expect(shouldFallback(withStatus(503))).toBe(true)
  })

  it("falls back on network errors and timeouts", () => {
    expect(shouldFallback(new TypeError("Failed to fetch"))).toBe(true)
    expect(shouldFallback(new Error("timeout exceeded"))).toBe(true)
  })
})
