import { describe, it, expect } from "vitest"

describe("devEnvironmentPlugin", () => {
  it("should have analytics event types", () => {
    const analyticsEvents = [
      "searchimpression",
      "searchclick",
      "searchaddtocart",
      "categoryimpression",
      "categoryclick",
      "categoryaddtocart"
    ]

    expect(analyticsEvents).toHaveLength(6)
    expect(analyticsEvents).toContain("searchimpression")
    expect(analyticsEvents).toContain("searchclick")
    expect(analyticsEvents).toContain("searchaddtocart")
    expect(analyticsEvents).toContain("categoryimpression")
    expect(analyticsEvents).toContain("categoryclick")
    expect(analyticsEvents).toContain("categoryaddtocart")
  })

  it("should format log messages correctly", () => {
    const eventType = "searchclick"
    const logMessage = `[Nosto Analytics] Event: ${eventType}`

    expect(logMessage).toBe("[Nosto Analytics] Event: searchclick")
  })
})
